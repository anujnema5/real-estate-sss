import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { cancelBooking, createBooking, getBooking, getBookingStatus, getBookings, getCancelledBooking, getPendingBookings, getRecentUser, getSuccessBookings } from "./booking.services";

const router: Router = Router()

router.get('/', use(verifyUser), use(getBookings))
router.post('/', use(verifyUser), use(createBooking, { reqBody: true }))
router.get('/cofirmed', use(verifyUser), use(getSuccessBookings))
router.get('/pending', use(verifyUser), use(getPendingBookings))
router.get('/cancelled', use(verifyUser), use(getCancelledBooking))
router.get('/latest', use(verifyUser), use(getRecentUser))

export default router