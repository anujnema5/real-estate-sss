import { redis } from "@/db/redis";
import { OK_HTTP_CODE, TOO_MANY_REQUESTS } from "@/utils/constants/constants";
import { ApiResponse } from "@/utils/responses/api.response";
import { NextFunction, Request, Response } from "express";

type TRateLimiter = {
    rate_limit: {
        time: number,
        limit: number
    }
}

const RateLimiter: TRateLimiter = {
    rate_limit: {
        time: 60,
        limit: 10
    }
}

export const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
    const { rate_limit } = RateLimiter;
    const endpoint = req.originalUrl;
    const ipAddress = req.ip;
    const redisId = `${endpoint}:${ipAddress}`

    const requestCount = await redis.incr(redisId);
    const ttl = await redis.ttl(redisId)

    if (requestCount === 1) {
        await redis.expire(redisId, rate_limit.time)
    }

    if (requestCount >= rate_limit.limit) {
        return res.status(TOO_MANY_REQUESTS)
            .json(new ApiResponse(TOO_MANY_REQUESTS, null, `Too Many Requests, Try again after ${ttl}`))
    }

    next();
}

export const getCachedData = async (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl;
    const data = await redis.get(key);

    if (data) {
        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, JSON.parse(data)))
    }

    next();
}