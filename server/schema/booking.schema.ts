import { z } from "zod";

const BookingSchema = z.object({
    id: z.string().optional(),
    userId: z.string(),
    propertyId: z.string(),
    checkInDate: z.date(),
    checkOutDate: z.date(),
    totalPrice: z.number().positive(),
    status: z.enum(["pending", "confirmed", "cancelled"]),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  });