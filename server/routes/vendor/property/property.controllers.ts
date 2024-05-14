import { verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { addImagesToProperty, createProperty, deleteProperty, editProperty, getAllProperties, getProperty } from "./property.services";

const router: Router = Router()

router.get('/', use(verifyVendor), use(getAllProperties))
router.post('/', use(verifyVendor), use(createProperty, { reqBody: true }))
router.get('/:propertyId', use(verifyVendor), use(getProperty))
router.post('/:propertyId/image', use(verifyVendor), use(addImagesToProperty)) // TODO
router.patch('/:propertyId', use(verifyVendor), use(editProperty, { reqBody: true })) // TODO
router.delete('/:propertyId', use(verifyVendor), use(deleteProperty))

export default router;