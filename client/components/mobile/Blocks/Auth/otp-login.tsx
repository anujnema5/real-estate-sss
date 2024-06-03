"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { PhoneInput } from "@/components/ui/phone-input"

import { useTransition } from "react"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { auth } from "@/firebase.config"
import usePhoneLogin from '@/hooks/useOtplogin';
import { Toaster, toast } from "sonner"
import { phoneNumberSchema } from "@/schema"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { LoginOTPPattern } from "@/components/ui/custom/login-otp-input"
import Link from "next/link"
import GoogleLogin from "./google-login"
import { Icons } from "@/components/icons"


export function OTPLogin() {
    const [isPending, startTransition] = useTransition();
    const { useSendOTP } = usePhoneLogin()
    const OTPInitiated = useSelector((state: RootState) => state.config.otpInitiated);

    const form = useForm<z.infer<typeof phoneNumberSchema>>({
        resolver: zodResolver(phoneNumberSchema),

        defaultValues: {
            phoneNumber: ''
        }
    })

    const sendOTP = (values: z.infer<typeof phoneNumberSchema>) => {
        startTransition(async () => {
            await useSendOTP(values);
        })
    }

    return (
        <>
            <Toaster richColors />
            <div className="w-full flex flex-col gap-10">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(sendOTP)} className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field: { onChange, value } }) => (
                                <FormItem>
                                    <FormLabel>Enter Your Phone Number</FormLabel>
                                    <FormControl>
                                        <PhoneInput placeholder="Enter your phone number" disabled={isPending || OTPInitiated} defaultCountry="IN" onChange={onChange} value={value} />
                                    </FormControl>
                                    <FormDescription>
                                        We'll send you an OTP for secure access
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending || OTPInitiated} type="submit" className="w-full">{isPending ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/> : "Request OTP"}</Button>
                    </form>

                </Form>

                {OTPInitiated &&
                    <div className="text-center flex flex-col justify-center items-start gap-3  w-full">
                        <LoginOTPPattern phoneNumber={form.getValues().phoneNumber.slice(3)} />
                        <span className="text-xs text-gray-600">{"Didn't received OTP?"} <span className="underline cursor-pointer" onClick={form.handleSubmit(sendOTP)}>Resend again?</span></span>
                    </div>
                }
            </div>


        </>
    )
}
