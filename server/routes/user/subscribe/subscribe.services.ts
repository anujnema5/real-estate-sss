import { db } from "@/db";
import { UserRequest } from "@/utils/types/types";

export const subscribe = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;

    // const newSubscriber = await db.subscription.create({
        
    // })
}

export const getSubscriptionStatus = async (req: UserRequest, res: Response) => {

}