import { db } from "@/db";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { UserRequest } from "@/utils/types/types";
import { Request, Response } from "express";
import { OK_HTTP_CODE, RECORD_UPDATED_SUCCESSFULLY } from "@/utils/constants/constants";
import { getAccountByUserId } from "@/utils/database/getEntity";

export const getUser = async (req: UserRequest, res: Response) => {
    const user = req.user;
    return res.status(200).json(new ApiResponse(200, user));
}

export const editUser = async (req: UserRequest, res: Response) => {
    const userdId = req.user.id;
    const updatedField = req.body;

    const updatedUser = await db.user.update({ where: { id: userdId }, data: updatedField })

    if (!updatedUser) {
        throw new CustomError(409, 'Failed to update user or user not found');
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, 'User updated successfully'));
}
