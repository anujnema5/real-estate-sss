import { db } from "@/db";
import { redis } from "@/db/redis";
import { ADMIN_NOT_FOUND, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, REDIS_TIMEOUT, USER_NOT_FOUND } from "@/utils/constants/constants";
import { getUserById, getVendorByUserId } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { AdminRequest, UserRequest, UserSubRequest, VendorRequest, VerifySubscription } from "@/utils/types/types";
import { Admin, Subscription, User, Vendor } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";

const getToken = (req: Request, { admin }: { admin?: boolean } = { admin: false }) => {
    const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.accessToken;

    if (!token) {
        throw new CustomError(401, 'Unauthorized request, Token not found')
    }

    const decodedToken = verify(token, (admin ? (process.env.ADMIN_ACCESS_TOKEN_SECRET as string) : process.env.USER_ACCESS_TOKEN_SECRET as string)) as any;
    return decodedToken
}

export const verifyUser = async (req: UserRequest, res: Response, next: NextFunction) => {
    const userId = getToken(req).userId
    const cachedUser = await redis.get('verified-user');

    if (cachedUser) {
        req.user = JSON.parse(cachedUser)
        next();
        return;
    }

    const user = await getUserById(userId);
    await redis.setex('verified-user', REDIS_TIMEOUT, JSON.stringify(user));

    if (!user) {
        throw new CustomError(401, "User not found")
    }

    req.user = user;
    next();
}

export const verifyVendor = async (req: VendorRequest, res: Response, next: NextFunction) => {
    const userId = getToken(req).userId as string;

    const cachedVendor = await redis.get('verified-vendor') as string
    const data = JSON.parse(cachedVendor);

    if (cachedVendor) {
        req.user = data.user
        req.vendor = data.vendor;
        next();
    };

    const user = await db.user.findUnique({ where: { id: userId }, include: { vendor: true } });
    await redis.setex('verified-vendor', REDIS_TIMEOUT, JSON.stringify(user?.vendor));

    const vendor = user?.vendor;

    if (!user) {
        throw new CustomError(401, "User Not Found");
    }

    if (!vendor) {
        throw new CustomError(401, "Vendor not found")
    }

    req.user = user;
    req.vendor = vendor;
    next();
}

export const verifySubscription = async (req: VerifySubscription, res: Response, next: NextFunction) => {
    const userId = getToken(req).userId

    const cachedSubscription = await redis.get('verified-subscription') as string;
    const data = JSON.parse(cachedSubscription);

    if (cachedSubscription) {
        req.user = data.user;
        req.subscription = data.subscription || null;
        req.vendor = data.vendor || null;
        next();
        return;
    }

    const user = await db.user.findUnique({
        where: { id: userId },
        omit: { password: true, refreshToken: true },
        include: { subscription: true, vendor: true }
    }) as any;

    const subscription = user?.subscription;
    const vendor = user?.vendor;

    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    if (!subscription) {
        throw new CustomError(401, 'Unauthorized request: Not a subscriber');
    }

    if (subscription.isExpired || subscription.status !== 'active') {
        throw new CustomError(403, 'Subscription expired or inactive. Please renew.');
    }

    req.user = user;
    req.subscription = subscription || null;
    req.vendor = vendor || null;

    next();
};

export const userType = async (req: UserSubRequest, res: Response, next: NextFunction) => {
    const userId = getToken(req).userId
    const cachedUser = await redis.get('user-type');

    // if (!cachedUser) {} TODO

    const user = await db.user.findUnique({
        where: { id: userId },
        omit: {password: true},
        include: { vendor: true, subscription: true },
    }) as any;

    const vendor = user?.vendor || null
    const subscription = user?.subscription || null;

    await redis.setex('user-type', REDIS_TIMEOUT, JSON.stringify(user))

    if (!user) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, USER_NOT_FOUND);
    }

    req.user = user;
    req.vendor = vendor

    req.subscriber = subscription?.isExpired && subscription.status === 'inactive' ? false : true;
    req.subscription = subscription;
    next();
};

export const verifyAdmin = async (req: AdminRequest, res: Response, next: NextFunction) => {
    
    const adminId = getToken(req, { admin: true })?.adminId;
    const cachedAdmin = await redis.get(`verified-admin`);

    if (cachedAdmin) {
        req.admin = JSON.parse(cachedAdmin);
        next();
        return;
    }

    const admin = await db.admin.findUnique({
        where: { id: adminId },
        omit: { password: true, refreshToken: true }
    }) as Admin;

    await redis.setex(`verified-admin`, REDIS_TIMEOUT, JSON.stringify(admin))

    if (!admin) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, ADMIN_NOT_FOUND);
    }

    req.admin = admin;
    next();
}