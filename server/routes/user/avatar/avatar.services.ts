import { db } from "@/db";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { UserRequest } from "@/utils/types/types";
import { Response } from "express";

export const getUserAvatar = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const userAvatar = await db.account.findUnique({ where: { id: userId }, select: { avatar: true } })

    if (!userAvatar) {
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