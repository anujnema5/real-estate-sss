import { verifySubscription } from "@/middlewares/verification.middleware";
import { initiateCall } from "@/routes/property/property.services";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";

const router: Router = Router()

router.post('/:propertyId/like')
router.post('/:propertyId/call', use(verifySubscription), use(initiateCall))

export default router;