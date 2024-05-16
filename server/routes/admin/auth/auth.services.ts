import { db } from "@/db";
import { adminInputSchema, adminLoginSchema } from "@/schema/admin.schema";
import { ADMIN_ALREADY_EXIST, BAD_REQUEST_HTTP_CODE, CONFLICT_HTTP_CODE, COULDNT_FOUND_YOU_ACCOUNT, INCORRECT_PASSWORD, INVALID_INPUT, UNAUTHORIZED_HTTP_CODE, USERNAME_OR_EMAIL_REQUIRED } from "@/utils/constants/constants";
import { getAdminByEmail, getAdminByUsername } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { generateAccessRefreshToken } from "@/utils/tokens/token.utils";
import { Admin } from "@prisma/client";
import { compare, hash } from "bcryptjs";
import { Response } from "express";

export const signIn = async (req: Request, res: Response) => {
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

    const isValidPassword = await compare(data.password, admin?.password)

    if (!isValidPassword) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, INCORRECT_PASSWORD)
    }

    const [accessToken, refreshToken]: string[] = await generateAccessRefreshToken('admin', admin.id);

    return res.status(200)
        .cookie("accessToken", accessToken)
        .cookie("refereshToken", refreshToken)
        .json(new ApiResponse(200, admin))
}

export const signUp = async (req: Request, res: Response) => {
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

    const [accessToken, refreshToken]: string[] = await generateAccessRefreshToken('admin', newAdmin.id);

    return res.status(200)
        .cookie("accessToken", accessToken)
        .cookie("refereshToken", refreshToken)
        .json(new ApiResponse(200, newAdmin))
}