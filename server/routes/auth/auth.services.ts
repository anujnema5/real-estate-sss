import { db } from "@/db";
import { LoginSchema, UserSchema, loginSchema, userSchema } from "@/schema/user.schema";
import { CustomError } from "@/utils/responses/api.error";
import { getUserByEmail, getUserById, getUserByPhoneNumber } from "@/utils/database/getEntity";
import { Request, Response } from "express"
import { z } from "zod";
import { generateAccessRefreshToken } from "@/utils/tokens/token.utils";
import { ApiResponse } from "@/utils/responses/api.response";
import bcrypt from 'bcryptjs';
import { options } from "@/utils/static/cookie.utils";
import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { BAD_REQUEST_HTTP_CODE, CONFLICT_HTTP_CODE, EMAIL_ALREADY_EXISTS, EMAIL_PHONENUMBER_REQUIRED, INCORRECT_PASSWORD, INVALID_INPUT, NON_VALID_REFERESH_TOKEN, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, REFERESH_TOKEN_NOT_FOUND, TOKEN_EXPIRE_OR_USED, TOKEN_REFERESHED, UNAUTHORIZED_HTTP_CODE } from "@/utils/constants/constants";
import { tokenToString } from "typescript";

export const signInService = async (req: Request, res: Response) => {
    const { phoneNumber, email, password } = req.body as LoginSchema;
    const isReqBodyValid = loginSchema.safeParse({ phoneNumber, email, password });

    if (!isReqBodyValid.success) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, INVALID_INPUT);
    }

    if (!phoneNumber && !email) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, EMAIL_PHONENUMBER_REQUIRED);
    }

    let user: User | null = null;

    if (phoneNumber) {
        user = await getUserByPhoneNumber(phoneNumber, { includePassword: true })
    } else {
        user = await getUserByEmail(email!, { includePassword: true })
    }

    if (!user) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, EMAIL_PHONENUMBER_REQUIRED);
    }

    if (password) {
        const isValidPassword = await bcrypt.compare(password, (user.password as string));
        user.password = null;

        if (!isValidPassword) {
            throw new CustomError(UNAUTHORIZED_HTTP_CODE, INCORRECT_PASSWORD);
        }

        const [accessToken, refreshToken] = await generateAccessRefreshToken('user', user.id);
        return res.status(OK_HTTP_CODE)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(OK_HTTP_CODE, { accessToken }));
    }

    // MORE CODE TO BE SETUP FOR OTP
    // OTP SETUP TODO
}

export const signUpService = async (req: Request, res: Response) => {
    const user = req.body as UserSchema;
    const isUserValid = userSchema.safeParse(user);

    // Check if user data is valid; if not, throw an error
    if (!isUserValid.success) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, INVALID_INPUT);
    }

    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
        throw new CustomError(CONFLICT_HTTP_CODE, EMAIL_ALREADY_EXISTS);
    }

    // hashed user password
    const hashedPassword = await bcrypt.hash(user.password, 10)

    // create new user and with the userID new account
    const [newUser, newAccount] = await db.$transaction(async (prisma) => {
        const createdUser = await prisma.user.create({ data: { ...user, password: hashedPassword } });
        const createdAccount = await prisma.account.create({ data: { userId: createdUser.id } });

        createdUser.password = null;
        return [createdUser, createdAccount];
    });

    // generate access and refresh token
    const [accessToken, refreshToken]: string[] = await generateAccessRefreshToken('user', newUser.id);

    return res.status(200)
        .cookie('accessToken', accessToken)
        .cookie('refreshToken', refreshToken)
        .json(new ApiResponse(200, newUser));
}

export const refreshToken = async (req: Request, res: Response) => {
    const incomingrefreshToken = req.body.refreshToken || req.cookies.refreshToken

    if (!incomingrefreshToken) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, REFERESH_TOKEN_NOT_FOUND)
    }

    const decodedToken = jwt.verify(incomingrefreshToken, (process.env.USER_REFRESH_TOKEN_SECRET as string)) as any

    if (!decodedToken) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, NON_VALID_REFERESH_TOKEN)
    }

    const foundUser = await getUserById(decodedToken.userId, { includeReferesh: true }) as any;

    if (foundUser?.refreshToken !== incomingrefreshToken) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, TOKEN_EXPIRE_OR_USED)
    }

    const [accessToken, refreshToken] = await generateAccessRefreshToken('user', foundUser) as any

    return res
        .status(OK_HTTP_CODE)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(OK_HTTP_CODE, accessToken, TOKEN_REFERESHED))
}

export const googleCallback = async (req: any, res: Response) => {
    const [accessToken, refreshToken] = await generateAccessRefreshToken('user', req.user.id);
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, accessToken))
}