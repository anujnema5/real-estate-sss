import { db } from "@/db";
import { CustomError } from "@/utils/responses/ApiError";
import { ApiResponse } from "@/utils/responses/ApiResponse";
import { UserRequest } from "@/utils/types/types";
import { Request, Response } from "express";

export const getUser = async (req: UserRequest, res: Response)=> {
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

export const getUserAvatar = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const userAvatar = await db.account.findUnique({where: {id: userId},select: {avatar: true}})

    if(!userAvatar) {
        throw new CustomError(404, "User don't have any avatar")
    }

    return res.status(200).json(new ApiResponse(200, userAvatar));
}

export const updateUserAvatar = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    // TODO FOR CLOUDINARY AND MULTER
}

export const deleteUserAvatar = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const updatedUser = await db.account.update({ where: { userId }, data: { avatar: null } })

    if (!updatedUser) {
        throw new CustomError(400, 'Failed to remove avatar');
    }

    return res.status(200).json(new ApiResponse(200, updatedUser, 'Avatar Removed Successfully'))
}