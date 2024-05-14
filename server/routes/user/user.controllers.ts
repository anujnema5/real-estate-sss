import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { deleteUserAvatar, editAccount, editUser, getAccount, getUser, getUserAvatar, updateUserAvatar } from "./user.services";
import bookingRoutes from "./booking/booking.controllers";
import reviewRoutes from './review/review.controllers'

const router: Router = Router();

router.get('/', use(verifyUser), use(getUser))
router.patch('/', use(verifyUser), use(editUser, { reqBody: true }))
router.get('/account', use(verifyUser), use(getAccount))
router.patch('/account', use(verifyUser), use(editAccount, { reqBody: true })) // EDIT ACCOUNT
router.get('/avatar', use(verifyUser), use(getUserAvatar)) // TODO
router.patch('/avatar', use(verifyUser), use(updateUserAvatar, { reqBody: true })) // TODO FOR MULTER AND CLOUDINARY
router.delete('/avatar', use(verifyUser), use(deleteUserAvatar)) //
router.use('/booking', bookingRoutes)
router.use('/review', reviewRoutes)

export default router.use('/user', router);