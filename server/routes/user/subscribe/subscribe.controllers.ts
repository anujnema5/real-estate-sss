import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { getSubscriptionStatus, subscribe } from "./subscribe.services";

const router: Router = Router()

router.post('/', use(verifyUser), use(subscribe))
router.get('/', use(verifyUser), use(getSubscriptionStatus))


export default router;