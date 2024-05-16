import { z } from "zod";

export const adminInputSchema = z.object({
    username : z.string(),
    email: z.string().email(),
    password : z.string()
})

export const adminLoginSchema = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string()
})

export type TAdminLoginSchema = z.infer<typeof adminLoginSchema>
export type TAdminInputSchema = z.infer<typeof adminInputSchema> 