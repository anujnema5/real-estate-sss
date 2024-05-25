import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { logout, refreshToken, signIn, signUp } from "./auth.services";
import { verifyAdmin } from "@/middlewares/verification.middleware";

const router: Router = Router()

router.post('/sign-in', use(signIn))
router.post('/sign-up', use(signUp))
router.post('/refresh',  use(refreshToken))
router.post('/logout', use(verifyAdmin), use(logout))

export default router;