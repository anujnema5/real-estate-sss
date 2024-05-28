import { db } from "@/db";
import {redis} from "@/db/redis";
import { NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, REDIS_TIMEOUT, USERID_NOT_FOUND, USER_NOT_FOUND } from "@/utils/constants/constants";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { AdminRequest } from "@/utils/types/types";
import { Response } from "express";

const isUserExist = async (req: AdminRequest) => {
    const userId = req.params.userId;

    const existingUser = await db.user.findUnique({
        where: { id: userId }
    })

    if (!existingUser) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, USER_NOT_FOUND)
    }
}

export const getAllUsers = async (req: AdminRequest, res: Response) => {
    const users = await db.user.findMany({
        omit: {
            refreshToken: true,
            password: true
        },

        include: {
            vendor: true
        }
    });

    // console.log(req.originalUrl)
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(users))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, users))
}

export const getUser = async (req: AdminRequest, res: Response) => {
    const userId = req.params.userId;
    const user = await db.user.findUnique(
        {
            where: {
                id:userId
            },
            omit: {
                password: true,
                refreshToken: true
            },
            include: {
                account: true,
                vendor: true,
                property: true,
                subscription: true,
            }
        });

    if (!user) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, USER_NOT_FOUND)
    }
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(user))
    return res.status(200).json(new ApiResponse(200, user));
}

export const getSubscribedUsers = async (req: AdminRequest, res: Response) => {
    const users = await db.user.findMany({
        omit: {
            password: true,
            refreshToken: true
        },

        where: {
            subscription: {
                status: 'active',
                isExpired: false
            }
        },

        include: {
            subscription: {
                include: {
                    package: true
                }
            }
        }
    })
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(users))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, users))
}

export const getNonSubscribedUsers = async (req: AdminRequest, res: Response) => {
    const users = await db.user.findMany({
        omit: {
            password: true,
            refreshToken: true
        },

        where: {
            subscription: null
        },

        include: {
            subscription: true
        }
    })
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(users))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, users))
}

export const getInvalidSubscription = async (req: AdminRequest, res: Response) => {
    const users = await db.user.findMany({
        where: {
            AND: {
                NOT: {
                    subscription: null
                },

                subscription: {
                    status: 'inactive'
                }
            }
        }
    })
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(users))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, users))
}

export const getValidSubscription = async (req: AdminRequest, res: Response) => {
    const users = await db.user.findMany({
        where: {
            AND: {
                NOT: {
                    subscription: null
                },

                subscription: {
                    status: 'active'
                }
            }
        }
    })
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(users))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, users))
}

export const usersWithVendor = async (req: AdminRequest, res: Response) => {
    const users = await db.user.findMany({
        where: {
            NOT: {
                vendor: null
            }
        },

        omit: {
            password: true,
            refreshToken: true
        },

        include: {
            account: true,
            vendor: true,
        }
    })
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(users))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, users));
}

export const blockUser = async (req: AdminRequest, res: Response) => {
    await isUserExist(req);
    const userId = req.params.userId;

    const blockedUser = await db.user.update({
        data: { blocked: true }, where: { id: userId }
    })
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(blockUser))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, blockedUser));
}

export const unblockUser = async (req: AdminRequest, res: Response) => {
    await isUserExist(req);

    const userId = req.params.userId;

    const unBlockedUser = await db.user.update({
        data: { blocked: false }, where: { id: userId }
    })
    await redis.setex(req.originalUrl, REDIS_TIMEOUT, JSON.stringify(unblockUser))
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, unBlockedUser));
}