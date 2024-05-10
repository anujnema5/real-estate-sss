import { User, Vendor } from "@prisma/client";
import { Request } from "express";

export interface UserRequest extends Request {
    user : User
}

export interface VendorRequest extends Request {
    user: User,
    vendor : Vendor
}