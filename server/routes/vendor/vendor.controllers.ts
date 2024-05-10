import { verifyUser, verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { createVendorService, deleteVendor, editVendor, getVendor } from "./vendor.services";
import propertyRoutes from './property/property.controllers'

const router: Router = Router()
    .get('/', use(verifyVendor), use(getVendor))
    .post('/', use(verifyUser), use(createVendorService))
    .delete('/', use(verifyVendor), use(deleteVendor))
    .patch('/', use(verifyVendor), use(editVendor))
    .use('/property', use(verifyVendor), propertyRoutes)
    .use('/booking')

export default router.use('/vendor', router)