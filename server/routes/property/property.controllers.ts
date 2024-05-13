import { userType, verifySubscription } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { getNearByProperty, getPropertiesFromCity, getProperty, getRandomProperties, initiateCall } from "./property.services";

const router: Router = Router();

router.get('/', use(getRandomProperties))
router.get('/:city', use(getPropertiesFromCity))
router.get('/nearby-properties', use(getNearByProperty))
router.get('/:propertyId', use(userType), use(getProperty))
router.post('/:propertyId/call', use(verifySubscription), use(initiateCall))

export default router