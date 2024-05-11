import { userType, verifySubscription } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { getPropertiesFromCity, getProperty, getRandomProperties, initiateCall } from "./property.services";

const router: Router = Router()
    .get('/', use(getRandomProperties))
    .get('/:city', use(getPropertiesFromCity))
    .get('/nearby-properties')
    .get('/:propertyId', use(userType), use(getProperty))
    .post('/:propertyId/call', use(verifySubscription), use(initiateCall))

export default router.use('/property', router)