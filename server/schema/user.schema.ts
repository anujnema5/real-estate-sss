import { z } from "zod";

export const userSchema = z.object({
    firstName: z
        .string(),
    lastName: z
        .string(),
    username:
        z.string()
            .min(3, { message: 'Atleast 3 characters are required for username' })
            .optional(),
    email:
        z.string()
            .email({ message: 'Email is not valid' })
            .min(5, { message: 'Email should be greater than 5 character' }),
    password:
        z.string()
            .min(8, { message: 'Password must be 8 character long' }),
    phoneNumber:
        z.string()
            .max(12, { message: 'Phone number must be under 12-10 digits' })
            .min(10, { message: 'Phone number must be of 10 digits' })
            .optional(),
    avatar:
        z.string().optional()
})

export type UserSchema = z.infer<typeof userSchema>

export const loginSchema = z.object({
    phoneNumber: z.string().optional(),
    username: z.string().optional(),
    email: z.string().email({message:'Email is not valid'}).optional(),
    password: z.string()
})

export type LoginSchema = z.infer<typeof loginSchema>
