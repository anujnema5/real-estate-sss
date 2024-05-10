import { Router } from "express";
import { signInService, signUpService, refreshToken, googleCallback } from "./auth.services";
import { use } from "@/utils/responses/handleResponse";
import passport from "passport";

const router: Router = Router()
    .post('/sign-in', use(signInService))
    .post('/sign-up', use(signUpService))
    .post('/refresh', use(refreshToken))
    .get('/google', use(passport.authenticate('google', { scope: ['profile', 'email'] })))
    .get('/google/callback', use(passport.authenticate('google', {session: false})), use(googleCallback))


export default router.use('/auth', router)