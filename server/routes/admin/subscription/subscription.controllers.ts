import { verifyAdmin } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { blockSubscription, getAllSubscription, getSubscription } from "./subscription.services";

const router : Router = Router()

router.get('/', use(verifyAdmin), use(getAllSubscription))
router.get('/:subscriptionId', use(verifyAdmin), use(getSubscription))
router.patch('/:subscriptionId/block', use(verifyAdmin), use(blockSubscription))
// router.post('/')

export default router;