import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { deleteUserAvatar, editUser, getUser, getUserAvatar, updateUserAvatar } from "./user.services";
import bookingControllers from "./booking/booking.controllers";

const router: Router = Router()
    // EDIT USER API
    .get('/', use(verifyUser), use(getUser))
    .patch('/', use(verifyUser), use(editUser))
    
    // BOOKING ROUTES FOR THIS USER
    .use('/booking', bookingControllers)

    // USER AVATAR APIs
    .get('/avatar', use(verifyUser), use(getUserAvatar))
    .patch('/avatar', use(verifyUser), use(updateUserAvatar)) // TODO FOR MULTER AND CLOUDINARY
    .delete('/avatar', use(verifyUser), use(deleteUserAvatar))

export default router.use('/user', router);