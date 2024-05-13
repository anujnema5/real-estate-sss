import { z } from "zod";

export const locationSchema = z.object({
    latitude: z.number(),
    longitude: z.number()
})

export type LocationSchemaType = z.infer<typeof locationSchema>