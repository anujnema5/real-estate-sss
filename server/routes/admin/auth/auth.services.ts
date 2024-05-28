import { db } from "@/db";
import {redis} from "@/db/redis";
import { adminInputSchema, adminLoginSchema } from "@/schema/admin.schema";
import { ADMIN_ALREADY_EXIST, ADMIN_NOT_FOUND, BAD_REQUEST_HTTP_CODE, CONFLICT_HTTP_CODE, COULDNT_FOUND_YOU_ACCOUNT, INCORRECT_PASSWORD, INVALID_INPUT, NON_VALID_REFERESH_TOKEN, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, REFERESH_TOKEN_NOT_FOUND, TOKEN_EXPIRE_OR_USED, TOKEN_REFERESHED, UNAUTHORIZED_HTTP_CODE, USERNAME_OR_EMAIL_REQUIRED } from "@/utils/constants/constants";
import { getAdminByEmail, getAdminById, getAdminByUsername } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { options } from "@/utils/static/cookie.utils";
import { generateAccessRefreshToken } from "@/utils/tokens/token.utils";
import { AdminRequest } from "@/utils/types/types";
import { Admin } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const signIn =
    async (req: Request, res: Response) => {
        const adminReqBody = req.body;
        const { success, data, error } = adminLoginSchema.safeParse(adminReqBody)

        if (!success) {
            throw new CustomError(BAD_REQUEST_HTTP_CODE,
                `${INVALID_INPUT} ${error.errors.map((err) => err.message).join(", ")}`);
        }

        if (!data.email && !data.username) {
            throw new CustomError(BAD_REQUEST_HTTP_CODE, USERNAME_OR_EMAIL_REQUIRED)
        }

        let admin: Admin | null = null;

        if (data.email) {
            admin = await getAdminByEmail(data.email)
        } else if (data.username) {
            admin = await getAdminByUsername(data.username)
        }

        if (!admin) {
            throw new CustomError(BAD_REQUEST_HTTP_CODE, COULDNT_FOUND_YOU_ACCOUNT)
        }

        const isValidPassword: boolean = await compare(data.password, admin?.password)

        if (!isValidPassword) {
            throw new CustomError(UNAUTHORIZED_HTTP_CODE, INCORRECT_PASSWORD)
        }

        (admin as any).password = null;
        (admin as any).refreshToken = null;

        const [accessToken, refreshToken]: string[] = await generateAccessRefreshToken('admin', admin.id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { admin, accessToken }))
    }

export const signUp =
    async (req: Request, res: Response) => {
        const admin = req.body as any;
        const { success, error, data } = adminInputSchema.safeParse(admin)

        if (!success) {
            throw new CustomError(BAD_REQUEST_HTTP_CODE, `${INVALID_INPUT} ${error.errors.map((err) => err.message).join(", ")}`);
        }

        // check if any existing admin exist
        const existingAdmin = await db.admin.findFirst({
            where: {
                OR: [
                    { email: admin.email },
                    { username: admin.username },
                ]
            }
        });

        if (existingAdmin) {
            throw new CustomError(CONFLICT_HTTP_CODE, ADMIN_ALREADY_EXIST)
        }

        const hashedPassword = await hash(data.password, 10);

        const newAdmin = await db.admin.create({
            data: {
                email: data.email,
                password: hashedPassword,
                username: data.username
            }
        })

        newAdmin.password = null as any;
        newAdmin.refreshToken = null as any;

        const [accessToken, refreshToken]: string[] = await generateAccessRefreshToken('admin', newAdmin.id);

        return res.status(200)
            .cookie("accessToken", accessToken)
            .cookie("refreshToken", refreshToken)
            .json(new ApiResponse(200, { newAdmin, accessToken }))
    }

export const refreshToken = async (req: Request, res: Response) => {
    const incomingrefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingrefreshToken) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, REFERESH_TOKEN_NOT_FOUND)
    }

    const decodedToken = jwt.verify(incomingrefreshToken, (process.env.ADMIN_REFERESH_TOKEN_SECRET as string)) as any

    if (!decodedToken) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, NON_VALID_REFERESH_TOKEN)
    }


    const foundAdmin = await getAdminById(decodedToken.adminId) as any;

    if (foundAdmin?.refreshToken !== incomingrefreshToken) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, TOKEN_EXPIRE_OR_USED)
    }

    const [accessToken, refreshToken] = await generateAccessRefreshToken('admin', foundAdmin?.id) as any

    return res
        .status(OK_HTTP_CODE)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(OK_HTTP_CODE, { accessToken }, TOKEN_REFERESHED))
}

export const logout =
    async (req: AdminRequest, res: Response) => {
        const adminId = req.admin.id;

        const admin = await db.admin.update({
            where: { id: adminId },
            data: { refreshToken: null }
        })

        if (!admin) {
            throw new CustomError(NOT_FOUND_HTTP_CODE, ADMIN_NOT_FOUND)
        }

        await redis.flushall();

        return res.status(OK_HTTP_CODE)
            .clearCookie("refreshToken")
            .clearCookie("accessToken")
            .json(new ApiResponse(OK_HTTP_CODE, null, 'User Loggged out successfully'))
}