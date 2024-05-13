import { Router } from "express";
import { signInService, signUpService, refreshToken, googleCallback } from "./auth.services";
import { use } from "@/utils/responses/handleResponse";
import passport from "passport";

const router: Router = Router();

router.post('/sign-in', use(signInService))
router.post('/sign-up', use(signUpService))
router.post('/refresh', use(refreshToken))
router.get('/google', use(passport.authenticate('google', { scope: ['profile', 'email'] })))
router.get('/google/callback', use(passport.authenticate('google', { session: false })), use(googleCallback))


export default router;