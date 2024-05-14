import { verifyVendor } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { cancelBooking, confirmBooking, getAllBookings, getAllCancelledBookings, getAllConfirmedBookings, getAllPendingBookings, getBooking, getRecentBooking } from "./booking.services";

const router: Router = Router()

router.get('/', use(verifyVendor), use(getAllBookings))
router.get('/:bookingId', use(verifyVendor), use(getBooking))
router.get('/confirmed', use(verifyVendor), use(getAllConfirmedBookings))
router.get('/pending', use(verifyVendor), use(getAllPendingBookings))
router.get('/cancelled', use(verifyVendor), use(getAllCancelledBookings))
router.get('/recent', use(verifyVendor), use(getRecentBooking))
router.patch('/:bookingId/confirm', use(verifyVendor), use(confirmBooking))
router.patch('/:bookingId/cancel', use(verifyVendor), use(cancelBooking))

export default router;