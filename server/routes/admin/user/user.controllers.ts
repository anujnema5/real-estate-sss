import { verifyAdmin } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { blockUser, getAllUsers, getInvalidSubscription, getNonSubscribedUsers, getSubscribedUsers, getUser, getValidSubscription, unblockUser, usersWithVendor } from "./user.services";
import { getCachedData } from "@/middlewares/redis.middleware";

const router : Router = Router();

router.use(use(verifyAdmin))
router.use(use(getCachedData))

router.get('/', use(getAllUsers))
router.get('/vendor', use(usersWithVendor))
router.get('/subscribed', use(getSubscribedUsers))
router.get('/non-subscribed', use(getNonSubscribedUsers))
router.get('/subscription', use(getValidSubscription))
router.get('/invalid-subscription', use(getInvalidSubscription))
router.get('/:userId/', use(getUser))
router.patch('/:userId/block', use(blockUser))
router.patch('/:userId/unblock', use(unblockUser))

export default router;