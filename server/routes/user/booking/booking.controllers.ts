import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { createBooking, getBooking, getBookingStatus, getBookings, getCancelledBooking, getPendingBookings, getRecentUser, getSuccessBookings } from "./booking.services";

const router: Router = Router()
    .post('/', use(verifyUser), use(createBooking))
    .get('/', use(verifyUser), use(getBookings))
    .get(':/bookingId', use(verifyUser), use(getBooking))
    .get('/:bookingId/status', use(verifyUser), use(getBookingStatus))
    .get('/cofirmed', use(verifyUser), use(getSuccessBookings))
    .get('/pending', use(verifyUser), use(getPendingBookings))
    .get('/cancelled', use(verifyUser), use(getCancelledBooking))
    .get('/latest', use(verifyUser), use(getRecentUser))

export default router