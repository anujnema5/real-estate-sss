import { db } from "@/db";
import { LoginSchema, UserSchema, loginSchema, userSchema } from "@/schema/user.schema";
import { CustomError } from "@/utils/responses/ApiError";
import { getUserByEmail, getUserById, getUserByPhoneNumber } from "@/utils/database/getEntity";
import { Request, Response } from "express"
import { z } from "zod";
import { generateAccessRefreshToken } from "@/utils/tokens/token.utils";
import { ApiResponse } from "@/utils/responses/ApiResponse";
import bcrypt from 'bcryptjs';
import { options } from "@/utils/static/cookie.utils";
import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';

export const signInService = async (req: Request, res: Response) => {
    const { phoneNumber, email, password } = req.body as LoginSchema;
    const isReqBodyValid = loginSchema.safeParse({phoneNumber, email, password});

    if(!isReqBodyValid.success) {
        throw new CustomError(404, 'Fields are not valid');
    }

    if (!phoneNumber && !email) {
        throw new CustomError(400, 'Email or phoneNumber is required for login')
    }

    let user: User | null = null;

    if (phoneNumber) {
        user = await getUserByPhoneNumber(phoneNumber, { includePassword: true })
    } else {
        user = await getUserByEmail(email!, { includePassword: true })
    }

    if (!user) {
        throw new CustomError(401, 'Invalid email or phone number');
    }

    if (password) {
        const isValidPassword = await bcrypt.compare(password, (user.password as string));
        user.password = null;

        if (!isValidPassword) {
            throw new CustomError(401, 'Incorrect password');
        }

        const [accessToken, refreshToken] = await generateAccessRefreshToken('user', user.id);
        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json(new ApiResponse(200, { accessToken }));
    }

    // MORE CODE TO BE SETUP FOR OTP
    // OTP SETUP TODO
}

export const signUpService = async (req: Request, res: Response) => {
    const user = req.body as UserSchema;
    const isUserValid = userSchema.safeParse(user);

    // Check if user data is valid; if not, throw an error
    if (!isUserValid.success) {
        throw new CustomError(404, 'Fields are not valid');
    }

    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(user.email);
    if (existingUser) {
        throw new CustomError(409, 'User with this email already exists');
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
        throw new CustomError(401, "No refresh token found")
    }

    const decodedToken = jwt.verify(incomingrefreshToken, (process.env.USER_REFRESH_TOKEN_SECRET as string)) as any

    if (!decodedToken) {
        throw new CustomError(401, "non-valid refresh token")
    }

    const foundUser = await getUserById(decodedToken.userId) as any;

    if (foundUser?.refreshToken !== incomingrefreshToken) {
        throw new CustomError(401, "Token expired or already been used")
    }

    const [accessToken, refreshToken] = await generateAccessRefreshToken('user', foundUser) as any

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, accessToken, "Token refreshed"))
}

export const googleCallback = async (req: any, res: Response) => {
    const [accessToken, refreshToken] = await generateAccessRefreshToken('user', req.user.id);
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(200, accessToken))
}