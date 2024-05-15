import { db } from "@/db";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { VendorRequest } from "@/utils/types/types";
import { Request, Response } from "express";

const isBookingExist = async (req: VendorRequest) => {
    const bookingId = req.params.bookingId;
    const vendorId = req.vendor.id;

    // check if any booking exist with this ID
    const existingBooking = await db.booking.findUnique({ where: { id: bookingId } });

    if (!existingBooking) {
        throw new CustomError(404, `No booking found with this booking ID ${bookingId}`);
    }

    return { bookingId, vendorId }
}

export const confirmBooking = async (req: VendorRequest, res: Response) => {
    const { bookingId, vendorId } = await isBookingExist(req);

    const updatedBooking = await db.booking.update({
        where: { id: bookingId, vendorId },
        data: { status: 'confirmed', approved: true, paid: true }
    })

    return res.status(200).json(new ApiResponse(200, updatedBooking, 'Booking Confirmed Success'));
}

export const cancelBooking = async (req: VendorRequest, res: Response) => {
    const { bookingId, vendorId } = await isBookingExist(req);

    const updatedBooking = await db.booking.update({
        where: { id: bookingId, vendorId },
        data: { status: 'cancelled', approved: false, rejectedByVendor: true }
    })

    return res.status(200).json(new ApiResponse(200, updatedBooking, 'Booking Confirmed Success'));
}

export const getAllBookings = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const bookings = await db.booking.findMany({ where: { vendorId } });

    return res.status(200).json(new ApiResponse(200, bookings));
}

export const getBooking = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const bookingId = req.params.bookingId as string;

    // check if booking exist with this id 
    const existingBooking = await db.booking.findUnique({ where: { id: bookingId } });

    if (existingBooking?.id !== bookingId) {
        throw new CustomError(403, "You are not authorized to access this booking");
    }

    // check if this booking have vendorID with our vendor
    if (existingBooking?.vendorId === vendorId) {
        return res.status(200).json(new ApiResponse(200, existingBooking));
    }


    return res.status(404).json(new ApiResponse(404, null, 'No booking found'));
}

export const getAllConfirmedBookings = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;

    const getAllBookings = await db.booking.findMany({ where: { vendorId, approved: true, status: 'confirmed' } });
    return res.status(200).json(new ApiResponse(200, getAllBookings));
}

export const getAllPendingBookings = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const bookings = await db.booking.findMany({ where: { vendorId, status: 'pending', approved: false } });

    return res.status(200).json(new ApiResponse(200, bookings))
}

export const getAllCancelledBookings = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;

    const bookings = await db.booking.findMany({ where: { vendorId, status: 'cancelled', approved: false } });

    return res.status(200).json(new ApiResponse(200, bookings))
}

export const getRecentBooking = async (req: VendorRequest, res: Response) => {
    const vendorId = req.vendor.id;
    const booking = await db.booking.findFirst({ orderBy: { createdAt: 'desc' }, where: { vendorId } });

    if (!booking) {
        throw new CustomError(404, 'No booking found');
    }

    return res.status(200).json(new ApiResponse(200, booking));
}