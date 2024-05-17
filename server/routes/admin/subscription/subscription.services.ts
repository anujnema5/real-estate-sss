import { db } from "@/db";
import { BAD_REQUEST_HTTP_CODE, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, PACKAGE_NOT_FOUND, SUBSCRIPTION_NOT_FOUND } from "@/utils/constants/constants";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { AdminRequest } from "@/utils/types/types";
import { Response } from "express";

const isSubscriptionExist =
    async (req: AdminRequest) => {
        const id = req.params.subscriptionId;

        if (!id) {
            throw new CustomError(BAD_REQUEST_HTTP_CODE, SUBSCRIPTION_NOT_FOUND)
        }

        const subscription = await db.subscription.findUnique({ where: { id } })

        if (!subscription) {
            throw new CustomError(NOT_FOUND_HTTP_CODE, PACKAGE_NOT_FOUND);
        }

        return subscription;
    }

export const getAllSubscription =
    async (req: AdminRequest, res: Response) => {
        const subscriptions = await db.subscription.findMany({
            include: {
                package: true
            }
        })

        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, subscriptions));
    }

export const getSubscription =
    async (req: AdminRequest, res: Response) => {
        const subscription = await isSubscriptionExist(req);
        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, subscription));
    }

export const blockSubscription =
    async (req: AdminRequest, res: Response) => {
        await isSubscriptionExist(req);
        const id = req.params.subscriptionId;

        const endedSubscription = await db.subscription.update({
            where: { id },
            data: {
                status: 'inactive',
                isExpired: true,
            },

            include: {
                user: {
                    omit: {
                        refreshToken: true,
                        password: true
                    }
                },

                package: true
            }
        })

        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, endedSubscription));
    }