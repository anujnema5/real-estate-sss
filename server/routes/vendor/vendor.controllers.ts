import { verifyUser, verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { createVendorService, deleteVendor, editVendor, getVendor } from "./vendor.services";
import propertyRoutes from './property/property.controllers'
import bookingRoutes from './booking/booking.controllers';

const router: Router = Router()
    .get('/', use(verifyVendor), use(getVendor))
    .post('/', use(verifyUser), use(createVendorService))
    .delete('/', use(verifyVendor), use(deleteVendor))
    .patch('/', use(verifyVendor), use(editVendor))
    .use('/booking', bookingRoutes)
    .use('/property', propertyRoutes)

export default router.use('/vendor', router)