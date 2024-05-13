import { verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { addImagesToProperty, createProperty, deleteProperty, editProperty, getAllProperties, getProperty } from "./property.services";

const router: Router = Router()
router.get('/', use(verifyVendor), use(getAllProperties))
router.post('/', use(verifyVendor), use(createProperty))
router.get('/:propertyId', use(verifyVendor), use(getProperty))
router.post('/:propertyId/image', use(verifyVendor), use(addImagesToProperty)) // TODO
router.patch('/:propertyId', use(verifyVendor), use(editProperty)) // TODO
router.delete('/:propertyId', use(verifyVendor), use(deleteProperty))

export default router;