import { Admin, Subscription, User, Vendor } from "@prisma/client";
import { Request } from "express";

export interface UserRequest extends Request {
    user: User
}

export interface VendorRequest extends Request {
    user: User,
    vendor: Vendor
}

export interface VerifySubscription extends Request {
    user: User,
    vendor: Vendor | null,
    subscription: Subscription | null,
}

export interface UserSubRequest extends Request {
    user : User 
    vendor: Vendor | null
    subscription: Subscription | null
    subscriber: Boolean
}

export interface AdminRequest extends Request {
    admin : Admin
}