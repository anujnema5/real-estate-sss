import { getUserById, getVendorByUserId } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/ApiError";
import { VendorRequest } from "@/utils/types/types";
import { User, Vendor } from "@prisma/client";
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

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
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