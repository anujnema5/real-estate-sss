import { db } from "@/db";
import { LoginSchema, UserSchema, loginSchema, userSchema } from "@/schema/user.schema";
import { CustomError } from "@/utils/responses/api.error";
import { getUserByEmail, getUserById, getUserByPhoneNumber } from "@/utils/database/getEntity";
import { Request, Response } from "express"
import { z } from "zod";
import { generateAccessRefreshToken } from "@/utils/tokens/token.utils";
import { ApiResponse } from "@/utils/responses/api.response";
import bcrypt, { encodeBase64 } from 'bcryptjs';
import { options } from "@/utils/static/cookie.utils";
import { User } from "@prisma/client";
import jwt from 'jsonwebtoken';
import { BAD_REQUEST_HTTP_CODE, BLOCKED_ACCOUNT, CONFLICT_HTTP_CODE, EMAIL_ALREADY_EXISTS, EMAIL_PHONENUMBER_REQUIRED, INCORRECT_PASSWORD, INVALID_INPUT, INVALID_OTP, INVALLID_PHONE_NUMBER, NON_VALID_REFERESH_TOKEN, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, REDIS_TIMEOUT, REFERESH_TOKEN_NOT_FOUND, THIS_PHONE_NUMBER_DO_NOT_EXIST, THIS_PHONE_NUMBER_EXIST, TOKEN_EXPIRE_OR_USED, TOKEN_REFERESHED, UNAUTHORIZED_HTTP_CODE, USERID_NOT_FOUND, USER_NOT_FOUND } from "@/utils/constants/constants";
import axios from "axios";
import { phoneNumberSchema } from "@/schema/phoneNumber.schema";
import { redis } from "@/db/redis";
// import { auth } from "@/services/firebase.config";

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

    if (user.blocked) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, BLOCKED_ACCOUNT)
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
            .json(new ApiResponse(OK_HTTP_CODE, { accessToken, refreshToken }));
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
        const createdUser = await prisma.user.create({ data: { ...user, password: hashedPassword, provider: 'credentials' } });
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

    // const foundUser = await getUserById(decodedToken.userId, { includeReferesh: true }) as any;
    const foundUser = await db.user.findUnique({
        where: { id: decodedToken.userId },
        include: { subscription: true, account: true, vendor: true },
        omit: { password: true }
    }) as any;

    if (foundUser?.refreshToken !== incomingrefreshToken) {
        throw new CustomError(UNAUTHORIZED_HTTP_CODE, TOKEN_EXPIRE_OR_USED)
    }

    const [accessToken, refreshToken] = await generateAccessRefreshToken('user', foundUser.id) as any
    foundUser.password = null;
    foundUser.refreshToken = null;

    return res
        .status(OK_HTTP_CODE)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new ApiResponse(OK_HTTP_CODE, { user: foundUser, token: accessToken }, TOKEN_REFERESHED))
}

export const googleCallback = async (req: any, res: Response) => {
    console.log('Reaching here')
    const [accessToken, refreshToken] = await generateAccessRefreshToken('user', req.user.id);
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        // .json(new ApiResponse(200, accessToken))
        .redirect('http://localhost:3000/google/callback')
}

export const phoneNumberExist = async (req: Request, res: Response) => {
    const phoneNumber = req.body.phoneNumber.slice(3);
    console.log(phoneNumber)

    const userWithPhoneNumber = await db.user.findUnique({
        where: { phoneNumber },
        omit: { password: true, refreshToken: true }
    })

    if (!userWithPhoneNumber) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, THIS_PHONE_NUMBER_DO_NOT_EXIST)
    }

    console.log(new ApiResponse(OK_HTTP_CODE, userWithPhoneNumber, THIS_PHONE_NUMBER_EXIST))

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, userWithPhoneNumber, THIS_PHONE_NUMBER_EXIST))
}

export const loginWithOtp = async (req: Request, res: Response) => {
    const number = z.string()
        .min(10, { message: "Digits can't be less 10" })
        .max(12, { message: "Cannot be more than 10 characters" })

    const phoneNumber = req.body.phoneNumber;
    const appVerifier = req.body.appVerifier;
    const { success, data, error } = number.safeParse(phoneNumber);

    if (!success) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, INVALLID_PHONE_NUMBER)
    }

    const formatPh = "+" + data;
    // const result = await signInWithPhoneNumber(auth, formatPh, appVerifier)
}

export const sendOtp = async (req: Request, res: Response) => {
    const phoneNumber = req.body.phoneNumber as string;
    const isValidPhoneNumber = phoneNumberSchema.safeParse(phoneNumber);

    if (!isValidPhoneNumber.success) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, INVALID_INPUT)
    }

    let user;

    // INTEGRATE REDIS HERE
    user = await db.user.findUnique({
        where: { phoneNumber },
        omit: { password: true, refreshToken: true }
    })

    if (!user) {
        user = await db.user.create({
            data: { phoneNumber }
        })
    }

    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(user))
    const otp = String(Math.floor(Math.random() * 999999));

    const url = `http://sms.ssstechies.com/api/mt/SendSMS?user=skstar&password=skstar&senderid=SKSTAR&channel=Trans&DCS=0&flashsms=0&number=${phoneNumber}&text=Dear%20User,%20${otp}is%20the%20OTP%20for%20your%20login%20at%20SKSTAR&route=01&DLTTemplateId=1507166988200802245&PEID=1501812350000026891`

    const sendOtp = await axios.get(url);
    const resp = sendOtp.data

    // SAVE OTP IN THE USER'S DB
    await db.user.update({
        where: { phoneNumber },
        data: { otp }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, resp, `Your generated OTP is ${otp}`));
}

export const confirmOtp = async (req: Request, res: Response) => {
    const phoneNumber = req.body.phoneNumber;
    const otp = req.body.otp;

    // zod vaidation todo
    const user = await db.user.findUnique({
        where: { phoneNumber },
        omit: { refreshToken: true, password: true }
    })

    if (!user) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, USER_NOT_FOUND)
    }

    const isOTPValid = user?.otp === otp;
    if (!isOTPValid) {
        throw new CustomError(BAD_REQUEST_HTTP_CODE, INVALID_OTP)
    }

    const [accessToken, refreshToken] = await generateAccessRefreshToken('user', user?.id)

    const updatedUser = await db.user.update({
        where: { phoneNumber },
        include: { account: true, subscription: true },
        data: { otp: null },
        omit: { password: true, refreshToken: true }
    })

    return res.status(OK_HTTP_CODE)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(OK_HTTP_CODE, { user: updatedUser, token: accessToken }, 'OTP Confirmed successfully'));
}