import { Router } from "express";
import propertyRoutes from "@/routes/property/property.controllers";
import authRoutes from '@/routes/auth/auth.controllers'
import userRoutes from '@/routes/user/user.controllers'
import vendorRoutes from '@/routes/vendor/vendor.controllers'
import devRoutes from '@/routes/dev/dev.controllers'
import adminRoutes from '@/routes/admin/admin.controllers'

const api = Router();

api.use('/property', propertyRoutes)
api.use('/auth', authRoutes)
api.use('/user', userRoutes)
api.use('/vendor', vendorRoutes)
api.use('/admin', adminRoutes)
api.use('/dev', devRoutes)

export default api.use('/v1', api);