import { verifyUser } from "@/middlewares/verification.middleware"
import { use } from "@/utils/responses/api.use"
import { Router } from "express"
import { deleteUserAvatar, getUserAvatar, updateUserAvatar } from "./avatar.services"

const router : Router = Router()

router.get('/avatar', use(verifyUser), use(getUserAvatar)) // TODO
router.patch('/avatar', use(verifyUser), use(updateUserAvatar, { reqBody: true })) // TODO FOR MULTER AND CLOUDINARY
router.delete('/avatar', use(verifyUser), use(deleteUserAvatar)) //

export default router;