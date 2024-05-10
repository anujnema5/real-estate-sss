import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { deleteUserAvatar, editUser, getUserAvatar, updateUserAvatar } from "./user.services";
import bookingControllers from "./booking/booking.controllers";

const router: Router = Router()
    // BOOKING ROUTES FOR THIS USER
    .use('/booking', bookingControllers)

    // EDIT USER API
    .patch('/', use(verifyUser), use(editUser))

    // USER AVATAR APIs
    .get('/avatar', use(verifyUser), use(getUserAvatar))
    .patch('/update-avatar', use(verifyUser), use(updateUserAvatar)) // TODO FOR MULTER AND CLOUDINARY
    .delete('/user-avatar', use(verifyUser), use(deleteUserAvatar))

export default router.use('/user', router);