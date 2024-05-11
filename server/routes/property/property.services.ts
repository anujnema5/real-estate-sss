import { db } from "@/db";
import { CustomError } from "@/utils/responses/ApiError";
import { ApiResponse } from "@/utils/responses/ApiResponse";
import { UserSubRequest, VerifySubscription } from "@/utils/types/types";
import { Property, Vendor } from "@prisma/client";
import { Request, Response } from "express";

export const initiateCall = async (req: VerifySubscription, res: Response) => {
    const propertyId = req.params.propertyId;
    const userId = req.user.id

    const property: Property | null = await db.property.findUnique({ where: { id: propertyId } })

    if (!property) {
        throw new CustomError(404, "Something went wrong property not found")
    }

    const interactions = await db.interaction.create({
        data: { userId, vendorId: property?.vendorId }
    })

    return res.status(200).json(new ApiResponse(200, interactions, "Interaction added"));
}

export const getProperty = async (req: UserSubRequest, res: Response) => {
    const subscriber = req.subscriber;
    const subscriptionType = req.subscription;
    const propertyId = req.params.propertyId;

    const property = await db.property.findUnique({
        where: { id: propertyId },
        include: {
            user: subscriber ? {
                select: {
                    id: true,
                    password: false,
                    phoneNumber: true,
                    firstName: true,
                    lastName: true,
                }
            } : undefined,
        }
    });

    return res.status(200).json(new ApiResponse(200, property))
}