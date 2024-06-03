import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ApiError } from '@/utils/responses/api.error';
import passport from '@/services/passport-config'
import redisClient from '@/db/redis';
import { getCachedData, rateLimiter } from './redis.middleware';

export const primaryMiddlewares = (app: express.Application) => {
    app.use(express.json());
    app.use(cookieParser())

    // CORS MIDDLEWARE
    app.use(
        cors({
            origin: 'http://localhost:3000',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        })
    );

    // app.use(rateLimiter)
    app.use(passport.initialize())
    redisClient.initRedisClient()

    // FOR TESTING ONLY
    app.get('/', (req: Request, res: Response) => {
        return res.send('SERVER IS RUNNING!! HURRAY🔥🔥')
    })
}

// ERROR HANDLING MIDDLEWARE
export const secondayMiddlewares = (app: express.Application) => {
    app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
        return res.status(err.statusCode || 500).json(new ApiError(err.statusCode, err.message))
    })
}