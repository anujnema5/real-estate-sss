import { verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { addImagesToProperty, createProperty, deleteProperty, editProperty, getAllProperties, getProperty } from "./property.services";

const router: Router = Router()
    .get('/', use(verifyVendor), use(getAllProperties))
    .post('/', use(verifyVendor), use(createProperty))
    .get('/:propertyId', use(verifyVendor), use(getProperty))
    .post('/:propertyId/image', use(verifyVendor), use(addImagesToProperty)) // TODO
    .patch('/:propertyId', use(verifyVendor), use(editProperty)) // TODO
    .delete('/:propertyId', use(verifyVendor), use(deleteProperty))

export default router;