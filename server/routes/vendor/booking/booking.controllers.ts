import { verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { cancelBooking, confirmBooking, getAllBookings, getAllCancelledBookings, getAllConfirmedBookings, getAllPendingBookings, getBooking, getRecentBooking } from "./booking.services";

const router: Router = Router()
    .get('/', use(verifyVendor), use(getAllBookings))
    .get('/:bookingId', use(verifyVendor), use(getBooking))
    .get('/confirmed', use(verifyVendor), use(getAllConfirmedBookings))
    .get('/pending', use(verifyVendor), use(getAllPendingBookings))
    .get('/cancelled', use(verifyVendor), use(getAllCancelledBookings))
    .get('/recent', use(verifyVendor), use(getRecentBooking))
    .patch('/:bookingId/confirm', use(verifyVendor), use(confirmBooking))
    .patch('/:bookingId/cancel', use(verifyVendor), use(cancelBooking))

export default router;