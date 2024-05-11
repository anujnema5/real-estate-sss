import { db } from "@/db";
import { PropertySchema } from "@/schema/property.schema";
import { CustomError } from "@/utils/responses/ApiError";
import { ApiResponse } from "@/utils/responses/ApiResponse";
import { VendorRequest } from "@/utils/types/types";
import { Request, Response } from "express";

export const getAllProperties = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const properties = await db.property.findMany({ where: { vendorId } });
    return res.status(200).json(new ApiResponse(200, properties));
}

export const getProperty = async (req: VendorRequest, res: Response) => {
    const propertyId = req.params.propertyId;
    const property = await db.property.findUnique({ where: { id: propertyId } })

    if (!property) {
        return res.status(404).json(new ApiResponse(404, null, "Property not found"));
    }

    return res.status(200).json(new ApiResponse(200, property));
}

export const createProperty = async (req: VendorRequest, res: Response) => {
    const propertyInfo = req.body;
    const vendorId = req.vendor.id;
    const userId = req.vendor.userId;

    const isInputValid = PropertySchema.safeParse(propertyInfo);

    if (!isInputValid.success) {
        throw new CustomError(404, 'Fields are not valid');
    }

    // PRISMA TRANSACTION TODO, WE'LL ADD THAT WHEN INTEGRATING MULTER AND CLODINARY
    const newRegisteredProperty = await db.property.create({ data: { vendorId, ...propertyInfo, userId } })
    return res.status(200).json(new ApiResponse(200, newRegisteredProperty, "Property registered successfully"));
}



export const addImagesToProperty = async (req: VendorRequest, res: Response) => {
    // TODO, WE'LL BUILD MAKE THIS API AFTER INTEGRATING MULTER AND CLOUDINARY 
}

export const editProperty = async (req: VendorRequest, res: Response) => {

}

export const deleteProperty = async (req: VendorRequest, res: Response) => {
    const propertyId = req.params.propertyId;
    const existingProperty = db.property.delete({ where: { id: propertyId } })

    if (!existingProperty) {
        throw new CustomError(401, 'Property does not exist');
    }

    return res.status(200).json(new ApiResponse(200, existingProperty, 'Property deleted successfully'))
}