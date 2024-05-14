import { db } from "@/db";
import { PropertyInputSchema, PropertySchema } from "@/schema/property.schema";
import { getVendorByUserId, getvendorById } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { UserRequest, VendorRequest } from "@/utils/types/types";
import { Response } from "express";
import { userInfo } from "os";
import { z } from "zod";

export const createVendorService = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;

    const existingVendor = await getVendorByUserId(userId);

    if (existingVendor) {
        throw new CustomError(409, 'You already have an vendor account')
    }

    const newVendor = await db.vendor.create({ data: { userId: req.user.id } });
    return res.status(200).json(new ApiResponse(200, `Vendor created successfully with the userId ${newVendor.userId}`))
}

export const getVendor = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const vendor = await getvendorById(vendorId);

    if (!vendor) {
        throw new CustomError(404, "Property not found")
    }

    return res.status(200).json(new ApiResponse(200, vendor))
}

export const deleteVendor = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id || req.query.id as string;
    const existingVendor = await db.vendor.delete({ where: { id: vendorId } })

    if (!existingVendor) {
        throw new CustomError(401, 'Vendor not found');
    }

    return res.status(200).json(new ApiResponse(200, existingVendor, 'Vendor account deleted successfully'))
}

export const editVendor = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const updatedField = req.body;

    if (!updatedField || Object.keys(updatedField).length === 0) {
        throw new CustomError(409, 'Bad Request - No valid fields provided')
    }

    const updatedVendor = await db.vendor.update({ where: { id: vendorId }, data: updatedField })
    return res.status(200).json(new ApiResponse(200, updatedVendor, 'Vendor updated successfully'))
}