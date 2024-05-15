import { db } from "@/db";
import '@/utils/logic/unixTimestamp'
import { bookingInputSchema } from "@/schema/booking.schema";
import { BAD_REQUEST_HTTP_CODE, BOOKING_ALREADY_EXIST, BOOKING_ALREADY_REJECTED_BY_VENDOR, BOOKING_CANCALLED_SUCCESS, BOOKING_CREATED_SUCCESS, BOOKING_NOT_FOUND, CONFLICTING_THE_VENDOR_AND_PROPERTYID, CONFLICT_HTTP_CODE, INVALID_INPUT, NOT_FOUND_HTTP_CODE, OK_HTTP_CODE } from "@/utils/constants/constants";
import { getBookingById } from "@/utils/database/getEntity";
import { CustomError } from "@/utils/responses/api.error";
import { ApiResponse } from "@/utils/responses/api.response";
import { UserRequest } from "@/utils/types/types";
import { Request, Response } from "express";
import { Booking } from "@prisma/client";

export const createBooking = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;
    const propertyId = req.params.propertyId;
    const { vendorId } = req.body || req.query.vendorId;
    const bookingDetails = req.body;

    const { success, data, error } = bookingInputSchema.safeParse(bookingDetails)

    console.log(data)

    if (!success) {
        console.log(error)
        throw new CustomError(BAD_REQUEST_HTTP_CODE, `${INVALID_INPUT}`)
    }

    const propertyCheck = await db.property.findUnique({ where: { id: propertyId, vendorId } })

    if (!propertyCheck) {
        throw new CustomError(CONFLICT_HTTP_CODE, CONFLICTING_THE_VENDOR_AND_PROPERTYID)
    }

    const existingBooking = await db.booking.findFirst({
        where: { vendorId, userId, propertyId }
    }) as any;

    // IF USER BOOKING ALREADY IS NOT IN CONFIRMED STATE AND STILL HE/SHE
    // MAKING BOOKING THEN WE SHOULD NOT ACCEPT THAT BOOKING
    // if (existingBooking && existingBooking.status !== 'confirmed') {
    //     throw new CustomError(CONFLICT_HTTP_CODE, BOOKING_ALREADY_EXIST)
    // }

    if (existingBooking && existingBooking.checkInDate >= bookingDetails.checkInDate) {
        throw new CustomError(CONFLICT_HTTP_CODE, BOOKING_ALREADY_EXIST)
    }

    // SUPPOSE IF USER BOOKING IS CONFIRMED AND STILL 
    if (
        existingBooking
        && existingBooking.checkInDate.toUnixTimestamp() >=
        new Date(bookingDetails.checkInDate)
        || existingBooking.checkOutDate.toUnixTimestamp() >
        new Date(bookingDetails.checkInDate).toUnixTimestamp()
    ) {
        throw new CustomError(CONFLICT_HTTP_CODE, BOOKING_ALREADY_EXIST)
    }

    const newBooking = await db.booking.create({
        data: {
            ...bookingDetails, vendorId, userId, propertyId
        }
    })

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

export const getRecentBooking = async (req: UserRequest, res: Response) => {
    const userId = req.user.id;

    console.log('Hey')
    const recentBooking = await db.booking.findFirst({ where: { userId } });
    return res.status(200).json(new ApiResponse(200, recentBooking));
}