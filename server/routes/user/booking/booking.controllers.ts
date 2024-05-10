import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { createBooking, getBooking, getBookings } from "./booking.services";

const router: Router = Router()
    .post('/', use(verifyUser), use(createBooking))
    .get('/', use(verifyUser), use(getBookings))
    .get(':/bookingId', use(verifyUser), use(getBooking))
    .get('/:bookingId/status', use(verifyUser))

export default router