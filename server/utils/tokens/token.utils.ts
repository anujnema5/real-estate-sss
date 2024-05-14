import { db } from "@/db";
import { getUserByEmail, getUserById, getvendorById } from "../database/getEntity"
import { User, Vendor } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { CustomError, getStatusCodeFromError } from "../responses/api.error";

type EntityType = 'user' | 'vendor';
type Entity = User | Vendor;

const generateToken = (data: Object, secret: string, expiry: string) => {
    return jwt.sign(data, secret, { expiresIn: expiry });
}

const updateEntityWithRefreshToken = async (entityType: EntityType, entityId: string, refreshToken: string) => {
    const updateFn = entityType === 'user' ? (db.user.update as any) : (db.vendor.update as any);
    await updateFn({ where: { id: entityId }, data: { refreshToken } });
};

export const generateAccessRefreshToken = async (entityType: EntityType, id: string) => {
    try {
        const entity = entityType === 'user' ? (await getUserById(id)) : (await getvendorById(id))
        const accessToken = generateAccessToken(entityType, entity) as string;
        const refreshToken = generateRefreshToken(entityType, entity) as string;

        await updateEntityWithRefreshToken(entityType, entity.id, refreshToken)
        return [accessToken, refreshToken];
    }

    catch (error: unknown) {
        console.log(error);
        const statusCode = getStatusCodeFromError(error)
        throw new CustomError(statusCode, 'Something went wrong while generating the token');
    }
}

const generateAccessToken = (entityType: EntityType, entity: User | Vendor) => {

    if (entityType === 'user') {
        return generateToken(
            { userId: entity.id },
            process.env.USER_ACCESS_TOKEN_SECRET as string,
            process.env.USER_ACCESS_TOKEN_EXPIRY as string
        )
    }

    else if (entityType === 'vendor') {
        return generateToken(
            { vendorId: entity.id },
            process.env.VENDOR_ACCESS_TOKEN_SECRET as string,
            process.env.VENDOR_ACCESS_TOKEN_EXPIRY as string
        )
    }
}

const generateRefreshToken = (entityType: EntityType, entity: User | Vendor) => {

    if (entityType === 'user') {
        return generateToken(
            { userId: entity.id },
            process.env.USER_REFRESH_TOKEN_SECRET as string,
            process.env.USER_REFRESH_TOKEN_EXPIRY as string
        ) as string
    }

    else if (entityType === 'vendor') {
        return generateToken(
            { vendorId: entity.id },
            process.env.VENDOR_REFRESH_TOKEN_SECRET as string,
            process.env.VENDOR_REFRESH_TOKEN_EXPIRY as string
        ) as string
    }
}

