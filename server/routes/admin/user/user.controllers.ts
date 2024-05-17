import { verifyAdmin } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { blockUser, getAllUsers, getInvalidSubscription, getNonSubscribedUsers, getSubscribedUsers, getUser, getValidSubscription, unblockUser, usersWithVendor } from "./user.services";

const router : Router = Router()

router.get('/', use(verifyAdmin), use(getAllUsers))
router.get('/vendor', use(verifyAdmin), use(usersWithVendor))
router.get('/subscribed', use(verifyAdmin), use(getSubscribedUsers))
router.get('/non-subscribed', use(verifyAdmin), use(getNonSubscribedUsers))
router.get('/valid-subscription', use(verifyAdmin), use(getValidSubscription))
router.get('/invalid-subscription', use(verifyAdmin), use(getInvalidSubscription))
router.get('/:userId/', use(verifyAdmin), use(getUser))
router.patch('/:userId/block', use(verifyAdmin), use(blockUser))
router.patch('/:userId/unblock', use(verifyAdmin), use(unblockUser))

export default router;