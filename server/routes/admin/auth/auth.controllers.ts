import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { signIn, signUp } from "./auth.services";

const router: Router = Router()

router.post('/sign-in', use(signIn))
router.post('/sign-up', use(signUp))

export default router;