import { verifyAdmin } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { getSubscribedVendors, getVendor, getVendors } from "./vendor.services";

const router: Router = Router()

router.get('/', use(verifyAdmin), use(getVendors))
router.get('/subscribed', use(verifyAdmin), use(getSubscribedVendors))
router.get('/:vendorId', use(verifyAdmin), use(getVendor))

export default router;