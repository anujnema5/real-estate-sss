import { db } from "@/db";
import { getUserById, getVendorByUserId } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/ApiError";
import { UserRequest, UserSubRequest, VendorRequest, VerifySubscription } from "@/utils/types/types";
import { Subscription, User, Vendor } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken";

export const getToken = (req: Request) => {
    const token = req.header("Authorization")?.replace("Bearer ", "") || req.cookies.accessToken;

    if (!token) {
        throw new CustomError(401, 'Unauthorized request, Token not found')
    }

    const decodedToken = verify(token, (process.env.USER_ACCESS_TOKEN_EXPIRY as string)) as any;
    return decodedToken
}

export const verifyUser = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = getToken(req) as any;

    const user = await getUserById(token.userId);
    req.user = user;
    next();
}

export const verifyVendor = async (req: VendorRequest, res: Response, next: NextFunction) => {
    const token = getToken(req) as any;
    const user = await getUserById(token.userId) as User;
    const vendor = await getVendorByUserId(user.id) as Vendor

    req.user = user;
    req.vendor = vendor;
    next();
}

export const verifySubscription = async (req: VerifySubscription, res: Response, next: NextFunction) => {
    const userId = getToken(req).userId

    const user = await db.user.findUnique({
        where: { id: userId },
        include: { subscription: true, vendor: true },
    });

    (user as User).password = null

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

export const userType = async (req: UserSubRequest, res: Response, next:NextFunction) => {
    const userId = getToken(req).userId

    const user = await db.user.findUnique({
        where: { id: userId },
        include: { vendor: true, subscription: true },
    });

    (user as User).password = null

    const vendor = user?.vendor || null
    const subscription = user?.subscription || null;

    if (!user) {
        throw new CustomError(404, 'User not found');
    }

    req.user = user;
    req.vendor = vendor

    req.subscriber = subscription?.isExpired && subscription.status === 'inactive' ? false : true;
    req.subscription = subscription;
    next();
};
