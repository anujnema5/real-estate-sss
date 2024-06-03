import { db } from '@/db';
import { getUserByEmail } from '@/utils/database/getEntity';
import { User } from '@prisma/client';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/v1/auth/google/callback"
},

    async (accessToken, refreshToken, profile, cb) => {
        const { id, emails, provider } = profile;
        const avatar = profile._json.picture;
        const emailVerified = profile._json.email_verified;
        const { given_name: firstName, family_name: lastName } = profile._json;
        const email = emails?.[0].value as string;
        
        // checking existing user
        const existinUser = await db.user.findUnique({where: {email}})

        if (existinUser) {

            if (existinUser.blocked) {
                return cb(null, false);
            }

            if (!existinUser.emailVerified) {
                const verifiedUser = await db.user.update({
                    where: { email },
                    data: { emailVerified: true }
                })

                return cb(null, verifiedUser)
            }
            return cb(null, existinUser);
        }

        // else create one
        const [newUser, newAccount] = await db.$transaction(async (prisma) => {
            const createdUser = await prisma.user.create({
                data: {
                    googleId: id,
                    firstName,
                    lastName,
                    emailVerified,
                    email,
                    provider
                }, omit: { password: true }
            });

            const createdAccount = await prisma.account.create({ data: { userId: createdUser.id, avatar } });
            return [createdUser, createdAccount];
        });

        return cb(null, newUser)
    }))

export default passport