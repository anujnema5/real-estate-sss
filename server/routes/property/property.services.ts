import { db } from "@/db";
import { LocationSchemaType, locationSchema } from "@/schema/location.schema";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
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

export const getRandomProperties = async (req: Request, res: Response) => {
    const randomProperties = await db.property.findMany({
        take: 10,
        skip: Math.floor(Math.random() * 50),
    });

    return res.status(200).json(new ApiResponse(200, randomProperties))
}

export const getPropertiesFromCity = async (req: Request, res: Response) => {
    const city = req.params.city.toLowerCase();
    console.log(city)
    // ALSO ADD A CHECK SO IT CAN FETCH NEAREST FROM THE USER'S LOCATION
    const properties = await db.property.findMany({ where: { city } })
    return res.status(200).json(new ApiResponse(200, properties));
}

export const getNearByProperty = async (req: Request, res: Response) => {
    const latitude = Number(req.query.latitude);
    const longitude = Number(req.query.longitude);

    if(!latitude || !longitude) {
        throw new CustomError(400, "Please provide latitude and longitude");
    }

    const { data, error, success } = locationSchema.safeParse({ latitude, longitude });

    if (!success) {
        throw new CustomError(400, `Invalid request body ${error.errors.map((err) => err.message).join(', ')}`);
    }

    const searchRadius = 10; // DEFINIG THE SEARCH RADIUS WITHIN 10KM
    const filteredProperties = await db.property.findMany({
        where: {
            latitude: {
                gte: latitude - searchRadius / (111.132 * Math.cos(latitude * Math.PI / 180)),
                lte: latitude + searchRadius / (111.132 * Math.cos(latitude * Math.PI / 180)),
            },
            longitude: {
                gte: longitude - searchRadius / 111.132,
                lte: longitude + searchRadius / 111.132,
            },
        }
    })

    return res.status(200).json(new ApiResponse(200, filteredProperties));
}