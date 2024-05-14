import { db } from "@/db";
import { PropertySchema } from "@/schema/property.schema";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { VendorRequest } from "@/utils/types/types";
import { Property } from "@prisma/client";
import { Request, Response } from "express";
import { checkExistingProperty } from "./property.utils";

export const getAllProperties = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const properties = await db.property.findMany({ where: { vendorId } });
    return res.status(200).json(new ApiResponse(200, properties));
}

export const getProperty = async (req: VendorRequest, res: Response) => {
    const propertyId = req.params.propertyId;
    await checkExistingProperty(propertyId)

    const property = await db.property.findUnique({ where: { id: propertyId } })
    return res.status(200).json(new ApiResponse(200, property));
}

export const createProperty = async (req: VendorRequest, res: Response) => {
    const propertyInfo = req.body;
    const vendorId = req.vendor.id;
    const userId = req.vendor.userId;

    const { data, error, success } = PropertySchema.safeParse(propertyInfo);

    if (!success) {
        console.log(error.errors)
        throw new CustomError(404, `Fields are not valid ${error.errors.map((msg) => msg).join(', ')}`);
    }

    // CHECKING IF PROPERTY EXIST WITH THE SAME BUILDING AND HOUSE NUMBER
    const existingProperty = await db.property.findFirst({
        where: {
            vendorId,
            zipcode: propertyInfo?.zipcode,
            building: propertyInfo?.building,
            houseNumber: propertyInfo?.houseNumber
            // latitude: propertyInfo?.latitude,
            // longitude: propertyInfo?.longitude
        }
    })

    if (existingProperty) {
        throw new CustomError(400, "You already created this property with the same house number and building")
    }

    // PRISMA TRANSACTION TODO, WE'LL ADD THAT WHEN INTEGRATING MULTER AND CLODINARY
    const newRegisteredProperty = await db.property.create({ data: { vendorId, ...propertyInfo, userId } })

    return res.status(200).json(new ApiResponse(200, newRegisteredProperty, "Property registered successfully"));
}

export const addImagesToProperty = async (req: VendorRequest, res: Response) => {
    // TODO, WE'LL BUILD MAKE THIS API AFTER INTEGRATING MULTER AND CLOUDINARY 
}

export const editProperty = async (req: VendorRequest, res: Response) => {
    const updationFields = req.body;
    const vendorId = req.vendor.id;
    const propertyId = req.params.propertyId;

    await checkExistingProperty(propertyId);

    const updatedProperty = await db.property.update({
        data: { ...updationFields },
        where: {id: propertyId,vendorId}
    })

    return res.status(200).json(new ApiResponse(200, updatedProperty))
}

export const deleteProperty = async (req: VendorRequest, res: Response) => {
    const propertyId = req.params.propertyId;
    await checkExistingProperty(propertyId);
    
    const deletedProperty =  await db.property.delete({ where: { id: propertyId } })

    return res.status(200).json(new ApiResponse(200, deletedProperty, 'Property deleted successfully'))
}