import { verifyUser, verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { createVendorService, deleteVendor, editVendor, getVendor } from "./vendor.services";
import propertyRoutes from './property/property.controllers'
import bookingRoutes from './booking/booking.controllers';

const router: Router = Router()

router.get('/', use(verifyVendor), use(getVendor))
router.post('/', use(verifyUser), use(createVendorService))
router.delete('/', use(verifyVendor), use(deleteVendor))
router.patch('/', use(verifyVendor), use(editVendor))
router.use('/booking', bookingRoutes)
router.use('/property', propertyRoutes)

export default router;