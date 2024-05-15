import { verifyUser } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/api.use";
import { Router } from "express";
import { editUser, getUser, } from "./user.services";
import bookingRoutes from "./booking/booking.controllers";
import reviewRoutes from './review/review.controllers'
import avatarRoutes from './avatar/avatar.controllers'
import accountRoutes from './account/account.controllers';
import propertyRoutes from './property/property.controllers';
import subscribeRoutes from './subscribe/subscribe.controllers';

const router: Router = Router();

router.get('/', use(verifyUser), use(getUser))
router.patch('/', use(verifyUser), use(editUser, { reqBody: true }))
router.use('/account', accountRoutes)
router.use('/avatar', avatarRoutes)
router.use('/booking', bookingRoutes)
router.use('/review', reviewRoutes)
router.use('/property', propertyRoutes)
router.use('/subscribe', subscribeRoutes)

export default router.use('/user', router);