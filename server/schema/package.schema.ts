import { z } from "zod";

export const packageInputSchema = z.object({
    plan: z.enum(["starter", "pro", "business"]),
    price : z.number(),
})

export type TPackageInputSchema = z.infer<typeof packageInputSchema>