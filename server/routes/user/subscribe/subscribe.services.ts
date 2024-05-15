import { db } from "@/db";
import { UserRequest } from "@/utils/types/types";

export const subscribe = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;

    const newSubscriber = await db.
}

export const getSubscriptionStatus = async (req: UserRequest, res: Response) => {

}