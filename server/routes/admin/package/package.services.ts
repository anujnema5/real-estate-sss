import { db } from "@/db";
import { packageInputSchema } from "@/schema/package.schema";
import { BAD_REQUEST_HTTP_CODE, INVALID_INPUT, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE, PACKAGE_NOT_FOUND, RECORD_UPDATED_SUCCESSFULLY } from "@/utils/constants/constants";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { AdminRequest } from "@/utils/types/types";
import { Response } from "express";

const isPackageExist = async (req: AdminRequest) => {
    const packageId = req.params.packageId;

    const onePackage = await db.package.findUnique({
        where: {
            id: packageId
        }
    })

    if (!onePackage) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, PACKAGE_NOT_FOUND);
    }

    return true;
}

export const createPackage =
    async (req: AdminRequest, res: Response) => {
        const newPackageBody = req.body;

        const { success, data, error } =
            packageInputSchema.safeParse(newPackageBody)

        if (!success) {
            throw new CustomError(BAD_REQUEST_HTTP_CODE, INVALID_INPUT)
        }

        const newPackage = await db.package.create({ data })
        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, newPackage))
    }

export const getPackages =
    async (req: AdminRequest, res: Response) => {
        const packages = await db.package.findMany({include: {
            subscription: true,

        }});
        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, packages));
    }

export const getPackage =
    async (req: AdminRequest, res: Response) => {
        const packageId = req.params.packageId;

        const onePackage = await db.package.findUnique({
            where: {
                id: packageId
            }
        })

        if (!onePackage) {
            throw new CustomError(NOT_FOUND_HTTP_CODE, PACKAGE_NOT_FOUND);
        }
        
        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, onePackage))
    }

export const getMostPopularPackages =
    async (req: AdminRequest, res: Response) => {
        const packages = await db.package.findMany();
        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, packages))
    }

export const editPackage =
    async (req: AdminRequest, res: Response) => {
        const packageId = req.params.packageId;
        const fields = req.body;

        await isPackageExist(req);

        const editedPackage = await db.package.update({
            data: fields,
            where: {id: packageId}
        })

        return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, editPackage, RECORD_UPDATED_SUCCESSFULLY))
    }