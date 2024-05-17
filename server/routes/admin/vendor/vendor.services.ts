import { db } from "@/db";
import { NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, VENDOR_NOT_FOUND } from "@/utils/constants/constants";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { AdminRequest } from "@/utils/types/types";
import { Response } from "express";

export const getVendors = async (req: AdminRequest, res: Response) => {
    const vendors = await db.vendor.findMany({
        include: {
            user:
                { omit: { password: true, refreshToken: true } }
        }
    });

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, vendors));
}

export const getVendor = async (req: AdminRequest, res: Response) => {
    const vendorId = req.params.vendorId;

    const existingVendor = await db.vendor.findUnique({
        where: { id: vendorId },
        include: {
            user: {
                omit: {
                    password: true,
                    refreshToken: true
                }
            }
        }
    })

    if (!existingVendor) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, VENDOR_NOT_FOUND);
    }

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, existingVendor));
}

export const getSubscribedVendors = async (req: AdminRequest, res: Response) => {
    const subscribedVendors = await db.vendor.findMany({
        where: {
            user: {
                subscription: {
                    status: 'active',
                    isExpired: false,
                }
            }
        },

        include: {
            user: {
                omit: {
                    refreshToken: true,
                    password: true
                },

                include: {
                    subscription: {
                        include: {
                            package: true
                        }
                    }
                }
            }
        }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, subscribedVendors));
}

export const getUnsubscribedVendors = async (req: AdminRequest, res: Response) => {
    const unsubscribedVendors = await db.vendor.findMany({
        where: {
            user: {
                subscription: null
            }
        },

        include: {
            user: {
                omit: {
                    password: true,
                    refreshToken: true
                },

                include: {
                    subscription: {
                        include: { package: true }
                    }
                }
            }
        }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, unsubscribedVendors))
}