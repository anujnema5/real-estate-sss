import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { deleteUserAvatar, editUser, getUser, getUserAvatar, updateUserAvatar } from "./user.services";
import bookingControllers from "./booking/booking.controllers";

const router: Router = Router();

router.get('/', use(verifyUser), use(getUser))
router.patch('/', use(verifyUser), use(editUser))
router.get('/avatar', use(verifyUser), use(getUserAvatar))
router.patch('/avatar', use(verifyUser), use(updateUserAvatar)) // TODO FOR MULTER AND CLOUDINARY
router.delete('/avatar', use(verifyUser), use(deleteUserAvatar))
router.use('/booking', bookingControllers)

export default router.use('/user', router);