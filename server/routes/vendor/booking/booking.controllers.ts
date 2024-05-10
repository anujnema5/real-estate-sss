import { verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { cancelBooking, confirmBooking } from "./booking.services";

const router: Router = Router()
    .post('/:bookingId/confirm', use(verifyVendor), use(confirmBooking))
    .post('/:bookingId/cancel', use(verifyVendor), use(cancelBooking))

export default router;