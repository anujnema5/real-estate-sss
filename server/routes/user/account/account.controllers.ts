import { verifyUser } from "@/middlewares/verification.middleware"
import { use } from "@/utils/responses/api.use"
import { Router } from "express"
import { editAccount, getAccount } from "./account.services"

const router : Router = Router()

router.get('/account', use(verifyUser), use(getAccount))
router.patch('/account', use(verifyUser), use(editAccount, { reqBody: true })) // EDIT ACCOUNT

export default router;