import { db } from "@/db";
import { BAD_REQUEST_HTTP_CODE, BOOKING_ALREADY_REJECTED_BY_VENDOR, BOOKING_CANCALLED_SUCCESS, BOOKING_CREATED_SUCCESS, BOOKING_NOT_FOUND, CONFLICT_HTTP_CODE, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE } from "@/utils/constants/constants";
import { getBookingById } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { UserRequest } from "@/utils/types/types";
import { Request, Response } from "express";

export const createBooking = async (req: UserRequest, res: Response) => {
    const userID = req.user.id;
    const { vendorId } = req.body || req.query.vendorId;

    const bookingDetails = req.body;
    const newBooking = await db.booking.create({ data: { ...bookingDetails, vendorId, userID } })

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, newBooking, BOOKING_CREATED_SUCCESS))
}

export const cancelBooking = async (req: UserRequest, res: Response) => {
    const bookingId = req.params.bookingId;
    const existingBooking = await getBookingById(bookingId);

    if (!existingBooking) {
        throw new CustomError(NOT_FOUND_HTTP_CODE, BOOKING_NOT_FOUND);
    }

    if (existingBooking.rejectedByVendor) {
        throw new CustomError(CONFLICT_HTTP_CODE, BOOKING_ALREADY_REJECTED_BY_VENDOR)
    }

    const cancelledBooking = await db.booking.update({
        data: {
            rejectedByUser: true
        }, where: { id: bookingId }
    });

    return res.status(OK_HTTP_CODE).json(new ApiResponse(OK_HTTP_CODE, cancelledBooking, BOOKING_CANCALLED_SUCCESS))
}

export const getBooking = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;
    const booking = await db.booking.findUnique({ where: { userId, id: bookingId } });

    if (!booking) {
        throw new CustomError(404, `No Booking found`)
    }

    return res.status(200).json(new ApiResponse(200, booking))
}

export const getBookings = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const bookings = await db.booking.findMany({ where: { userId } })

    return res.status(200).json(new ApiResponse(200, bookings));
}

export const getBookingStatus = async (req: UserRequest, res: Response) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const booking = await db.booking.findUnique({
        where: { id: bookingId },
        select: {
            id: true,
            userId: true,
            status: true,
            approved: true,
            rejectedByUser: true,
            rejectedByVendor: true,
            vendorId: true,
            createdAt: true,
            totalPrice: true
        }
    });

    if (booking?.userId !== userId) {
        throw new CustomError(403, "You are not authorized to access this booking");
    }

    return res.status(200).json(new ApiResponse(200, booking));
}

export const getSuccessBookings = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const successBookings = await db.booking.findMany({ where: { status: 'confirmed', approved: true, userId } });

    return res.status(200).json(new ApiResponse(200, successBookings))
}

export const getPendingBookings = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const successBookings = await db.booking.findMany({ where: { status: 'pending', approved: false, userId } });

    return res.status(200).json(new ApiResponse(200, successBookings))
}

export const getCancelledBooking = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const caneclledBookings = await db.booking.findMany({ where: { status: 'cancelled', approved: false, userId } })

    return res.status(200).json(new ApiResponse(200, caneclledBookings));
}

export const getRecentUser = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;

    const recentBooking = await db.booking.findFirst({ orderBy: { createdAt: 'desc' }, where: { userId } });
    return res.status(200).json(new ApiResponse(200, recentBooking));
}