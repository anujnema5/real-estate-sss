import { db } from "@/db";
import { OK_HTTP_CODE, RECORD_UPDATED_SUCCESSFULLY } from "@/utils/constants/constants";
import { getAccountByUserId } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { UserRequest } from "@/utils/types/types";
import { Response } from "express";

export const getAccount = async (req: UserRequest, res: Response)=> {
    const userId = req.user.id;
    const account = await getAccountByUserId(userId);

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, account))
}

export const editAccount = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const updationField = req.body;

    const updatedUser = await db.user.update({
        data: updationField,

        where: {
            id: userId
        }
    })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, updatedUser, RECORD_UPDATED_SUCCESSFULLY))
}

