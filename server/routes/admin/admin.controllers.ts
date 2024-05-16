import { Router } from "express";
import authRoutes from '@/routes/admin/auth/auth.controllers';
import userRoutes from '@/routes/admin/user/user.controllers'

const router : Router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)

export default router;