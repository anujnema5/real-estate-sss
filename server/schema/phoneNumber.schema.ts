import { z } from "zod";

export const phoneNumberSchema = z.string().regex(/^\d{10}$/, 'Invalid phone number');
