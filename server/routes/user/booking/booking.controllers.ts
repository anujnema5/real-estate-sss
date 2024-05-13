import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { createBooking, getBooking, getBookingStatus, getBookings, getCancelledBooking, getPendingBookings, getRecentUser, getSuccessBookings } from "./booking.services";

const router: Router = Router()

router.post('/', use(verifyUser), use(createBooking))
router.get('/', use(verifyUser), use(getBookings))
router.get(':/bookingId', use(verifyUser), use(getBooking))
router.get('/:bookingId/status', use(verifyUser), use(getBookingStatus))
router.get('/cofirmed', use(verifyUser), use(getSuccessBookings))
router.get('/pending', use(verifyUser), use(getPendingBookings))
router.get('/cancelled', use(verifyUser), use(getCancelledBooking))
router.get('/latest', use(verifyUser), use(getRecentUser))

export default router