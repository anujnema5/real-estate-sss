import { verifyAdmin } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { createPackage, editPackage, getPackage, getPackages } from "./package.services";

const router : Router = Router()

router.get('/', use(verifyAdmin), use(getPackages))
router.post('/', use(verifyAdmin), use(createPackage))
router.patch('/:packageId', use(verifyAdmin), use(editPackage))
router.get('/:packageId', use(verifyAdmin), use(getPackage))

export default router;