import { db } from "@/db";
import { getAdminById, getUserByEmail, getUserById, getvendorById } from "../database/getEntity"
import { Admin, User, Vendor } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { CustomError, getStatusCodeFromError } from "../responses/api.error";
import { SOMETHING_WENT_WRONG_GENERATING_TOKEN } from "../constants/constants";

type EntityType = 'user' | 'admin';
type Entity = User | Admin;

const generateToken = (data: Object, secret: string, expiry: string) => {
    return jwt.sign(data, secret, { expiresIn: expiry });
}

const updateEntityWithRefreshToken = async (entityType: EntityType, entityId: string, refreshToken: string) => {
    const updateFn = entityType === 'user' ? (db.user.update as any) : (db.admin.update as any);
    console.log(entityId)
    await updateFn({ where: { id: String(entityId) }, data: { refreshToken } });
};

export const generateAccessRefreshToken = async (entityType: EntityType, id: string) => {
    try {
        const entity = entityType === 'user' ? (await getUserById(id)) : (await getAdminById(id))
        const accessToken = generateAccessToken(entityType, entity) as string;
        const refreshToken = generateRefreshToken(entityType, entity) as string;

        await updateEntityWithRefreshToken(entityType, entity.id, refreshToken)
        return [accessToken, refreshToken];
    }

    catch (error: unknown) {
        console.log(error);
        const statusCode = getStatusCodeFromError(error)
        throw new CustomError(statusCode, SOMETHING_WENT_WRONG_GENERATING_TOKEN);
    }
}

const generateAccessToken = (entityType: EntityType, entity: User | Admin) => {

    if (entityType === 'user') {
        return generateToken(
            { userId: entity.id },
            process.env.USER_ACCESS_TOKEN_SECRET as string,
            process.env.USER_ACCESS_TOKEN_EXPIRY as string
        )
    }

    else if (entityType === 'admin') {
        return generateToken(
            { adminId: entity.id },
            process.env.ADMIN_ACCESS_TOKEN_SECRET as string,
            process.env.ADMIN_ACCESS_TOKEN_EXPIRY as string
        )
    }
}

const generateRefreshToken = (entityType: EntityType, entity: User | Admin) => {

    if (entityType === 'user') {
        return generateToken(
            { userId: entity.id },
            process.env.USER_REFRESH_TOKEN_SECRET as string,
            process.env.USER_REFRESH_TOKEN_EXPIRY as string
        ) as string
    }

    else if (entityType === 'admin') {
        return generateToken(
            { adminId: entity.id },
            process.env.ADMIN_REFERESH_TOKEN_SECRET as string,
            process.env.ADMIN_REFERESH_TOKEN_EXPIRY as string
        ) as string
    }
}

