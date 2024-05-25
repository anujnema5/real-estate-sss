import { db } from "@/db";
import { NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, PROPERTY_DONT_EXIST, RECORD_UPDATED_SUCCESSFULLY } from "@/utils/constants/constants";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { AdminRequest } from "@/utils/types/types";
import { Response } from "express";

enum PropertyType {
    "apartment",
    "house",
    "condo",
    "pg",
    "single",
    "library",
    "mess"
}

const isPropertyExist = async (req: AdminRequest) => {
    const propertyId = req.params.propertyId;
    const isPropertyExist = await db.property.findUnique({ where: { id: propertyId } });

    if (!isPropertyExist) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, PROPERTY_DONT_EXIST)
    }

    return isPropertyExist
}

export const getAllProperties = async (req: AdminRequest, res: Response) => {
    const properties = await db.property.findMany();
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, properties))
}

export const getAllAvailableProperties = async (req: AdminRequest, res: Response) => {
    const properties = await db.property.findMany({
        where: { available: true }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, properties));
}

export const getAllUnavailableProperties = async (req: AdminRequest, res: Response) => {
    const properties = await db.property.findMany({
        where: { available: false }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, properties));
}

export const markAvailabilityEnable = async (req: AdminRequest, res: Response) => {
    const propertyId = req.params.propertyId;
    const isPropertyExist = await db.property.findUnique({ where: { id: propertyId } });

    if (!isPropertyExist) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, PROPERTY_DONT_EXIST)
    }

    const updatedProperty = await db.property.update({
        where: { id: propertyId },
        data: {
            available: true
        }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, updatedProperty));
}

export const markAvailabilityDisable = async (req: AdminRequest, res: Response) => {
    const propertyId = req.params.propertyId;
    const isPropertyExist = await db.property.findUnique({ where: { id: propertyId } });

    if (!isPropertyExist) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, PROPERTY_DONT_EXIST)
    }

    const updatedProperty = await db.property.update({
        where: { id: propertyId },
        data: {
            available: false
        }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, updatedProperty, RECORD_UPDATED_SUCCESSFULLY));
}

export const deleteProperty = async (req: AdminRequest, res: Response) => {
    const propertyId = req.params.propertyId;
    const isPropertyExist = await db.property.findUnique({ where: { id: propertyId } });

    if (!isPropertyExist) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, PROPERTY_DONT_EXIST)
    }

    const updatedProperty = await db.property.delete({
        where: { id: propertyId }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, updatedProperty, RECORD_UPDATED_SUCCESSFULLY));
}

export const getPropertyWithType = async (req: AdminRequest, res: Response) => {
    const propertyType = req.params.propertyType as unknown as any;

    const properties = await db.property.findMany({
        where: {
            type: propertyType
        }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, properties));
}

export const getAvailablePropertyWithType = async (req: AdminRequest, res: Response) => {
    const propertyType = req.params.propertyType as unknown as any;

    const properties = await db.property.findMany({
        where: {
            type: propertyType
        }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, properties));
}

export const getProperty =
    async (req: AdminRequest, res: Response) => {
        await isPropertyExist(req);

        const id = req.params.propertyId;
        const property = await db.property.findUnique(
            {
                where: { id },
                include: {
                    user: {
                        omit: {
                            password: true,
                            refreshToken: true
                        }
                    },

                    vendor: true,
                    images: true,
                    like: true
                }
            })
        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, property));
    }