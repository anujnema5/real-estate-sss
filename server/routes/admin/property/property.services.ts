import { db } from "@/db";
import { OK_HTTP_CODE } from "@/utils/constants/constants";
import { ApiResponse } from "@/utils/responses/api.response";
import { AdminRequest } from "@/utils/types/types";
import { Response } from "express";

export const getAllProperties = async (req: AdminRequest, res: Response) => {
    const properties = await db.property.findMany();
    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, properties))
}

export const deleteProperties = async (req: AdminRequest, res: Response)=> {

}

export const getAllAvailableProperties = async (req: AdminRequest, res: Response)=> {

}

export const getAllUnavailableProperties = async (req: AdminRequest, res: Response)=> {

}

export const markAvailabilityEnable = async (req: AdminRequest, res: Response)=> {

}

export const markAvailabilityDisable = async (req: AdminRequest, res: Response)=> {
    
}