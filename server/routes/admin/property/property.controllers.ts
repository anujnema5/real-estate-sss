import { verifyAdmin } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { deleteProperty, getAllAvailableProperties, getAllProperties, getAllUnavailableProperties, getAvailablePropertyWithType, getProperty, getPropertyWithType, markAvailabilityDisable, markAvailabilityEnable } from "./property.services";

const router : Router = Router()

router.get('/', use(verifyAdmin), use(getAllProperties))
router.get('/available', use(verifyAdmin), use(getAllAvailableProperties))
router.get('/unavailable', use(verifyAdmin), use(getAllUnavailableProperties))

router.get('/type/:propertyType/', use(verifyAdmin), use(getPropertyWithType))
router.get('/type/:propertyType/available', use(verifyAdmin), use(getAvailablePropertyWithType))

router.patch('/:propertyId/unavailable', use(verifyAdmin), use(markAvailabilityEnable))
router.patch('/:propertyId/available', use(verifyAdmin), use(markAvailabilityDisable))

router.get('/:propertyId', use(verifyAdmin), use(getProperty))
router.delete('/:propertyId', use(verifyAdmin), use(deleteProperty))

export default router;