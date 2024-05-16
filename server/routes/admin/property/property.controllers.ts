import { verifyAdmin } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { deleteProperties, getAllAvailableProperties, getAllProperties, getAllUnavailableProperties } from "./property.services";

const router : Router = Router()

router.get('/', use(verifyAdmin), use(getAllProperties))
router.get('/available', use(verifyAdmin), use(getAllAvailableProperties))
router.get('/unavailable', use(verifyAdmin), use(getAllUnavailableProperties))

router.get('/:propertyType/available')

router.patch('/:propertyId/unavailable', use(verifyAdmin))
router.patch('/:propertyId/available', use(verifyAdmin))

router.patch('/:propertyId')
router.delete('/:propertyId', use(verifyAdmin), use(deleteProperties))

// DELETE A PROPERTY
// EDIT OR CHANGE PROPERTY
//  

export default router;