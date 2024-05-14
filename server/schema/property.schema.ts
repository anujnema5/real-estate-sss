import { z } from "zod";

export const PropertySchema = z.object({
    title: z.string(),
    description: z.string().min(5).max(255),
    type: z.enum(["apartment", "house", "condo", "pg", "single"]),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string().regex(/^\d{6}$/),
    price: z.number().positive(),
    bedrooms: z.number().positive(),
    bathrooms: z.number().positive(),
    areaSize: z.any(),
    available: z.boolean(),
    latitude: z.any().optional(),
    longitude : z.any().optional()
}).refine((property) => {
    const { bedrooms, bathrooms } = property;
    if (bedrooms < bathrooms) {
        return false;
    }
    return true;
});

export type PropertyInputSchema = z.infer<typeof PropertySchema>;