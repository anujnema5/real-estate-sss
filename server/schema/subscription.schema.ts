import { z } from "zod";

export const subscription = z.object({
    id: z.string().optional(),
    plan: z.enum(["starter", "pro", "business"]),
    price: z.number().int(),
    userId: z.string(),
    duration: z.number().int(),
    status: z.enum(["active", "inactive"]),
    createdAt: z.date().optional(),
    isExpired: z.boolean().default(false),
    updatedAt: z.date().optional()
});

export type SubscriptionInputType = z.infer<typeof subscription>