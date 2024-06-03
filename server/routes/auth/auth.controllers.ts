import { Router } from "express";
import { signInService, signUpService, refreshToken, googleCallback, loginWithOtp, phoneNumberExist, sendOtp, confirmOtp } from "./auth.services";
import { use } from "@/utils/responses/api.use";
import passport from "passport";

const router: Router = Router();

router.post('/sign-in', use(signInService))
router.post('/sign-up', use(signUpService, { reqBody: true }))
router.post('/refresh', use(refreshToken))
router.post('/sign-in-otp', use(loginWithOtp, {reqBody: true}))
router.post('/phone-number-exist', use(phoneNumberExist))
router.get('/google', use(passport.authenticate('google', { scope: ['profile', 'email'] })))
router.get('/google/callback', use(passport.authenticate('google', { session: false })), use(googleCallback))
router.post('/initiate-otp', use(sendOtp, {reqBody: true}))
router.post('/confirm-otp', use(confirmOtp))


export default router;