import { userType, verifySubscription } from "@/middlewares/verification.middleware";
import { use } from "@/utils/responses/handleResponse";
import { Router } from "express";
import { getProperty, initiateCall } from "./property.services";

const router: Router = Router()
    .get('/')
    .get('/:city')
    .get('/nearby-properties')
    .get('/:propertyId', use(userType), use(getProperty))
    .post('/:propertyId/call', use(verifySubscription), use(initiateCall))