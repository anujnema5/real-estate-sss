import { userType, verifySubscription } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { getNearByProperty, getPropertiesFromCity, getProperty, getRandomProperties, initiateCall } from "./property.services";

const router: Router = Router()
    .get('/', use(getRandomProperties))
    .get('/:city', use(getPropertiesFromCity))
    .get('/nearby-properties', use(getNearByProperty))
    .get('/:propertyId', use(userType), use(getProperty))
    .post('/:propertyId/interact', use(verifySubscription), use(initiateCall))

export default router.use('/property', router)