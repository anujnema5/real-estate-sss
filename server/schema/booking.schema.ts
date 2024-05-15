import { z } from "zod";


export const bookingInputSchema = z.object({
  checkInDate: z.string(),
  checkOutDate: z.string(),
  totalPrice: z.number(),
  paid: z.boolean(),
  vendorId: z.string(),
});

export type BookingInputSchema = z.infer<typeof bookingInputSchema>