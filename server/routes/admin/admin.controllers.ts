import { Router } from "express";
import authRoutes from '@/routes/admin/auth/auth.controllers';
import userRoutes from '@/routes/admin/user/user.controllers'
import packageRoutes from '@/routes/admin/package/package.controllers';
import propertyRoutes from '@/routes/admin/property/property.controllers';
import revenueRoutes from '@/routes/admin/revenue/revenue.controllers';
import subscriptionRoutes from '@/routes/admin/subscription/subscription.controllers';
import vendorRoutes from '@/routes/admin/vendor/vendor.controllers';

const router : Router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/vendor', vendorRoutes)
router.use('/property', propertyRoutes)
router.use('/package', packageRoutes)
router.use('/revenue', revenueRoutes)
router.use('/subscription', subscriptionRoutes)

export default router;