import { Router } from "express";
import authRoutes from '@/routes/auth/auth.controllers'
import userRoutes from '@/routes/user/user.controllers'
import vendorRoutes from '@/routes/vendor/vendor.controllers'
import devRoutes from '@/routes/dev/dev.controllers'
import propertyRoutes from "./property/property.controllers";

const api = Router()
    .use(authRoutes)
    .use(propertyRoutes)
    .use(vendorRoutes)
    .use(userRoutes)

export default api.use('/v1', api);