'use client'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { otpSchema } from "@/schema"

import { z } from "zod"
import { Button } from "../button"
import { useTransition } from "react"
import usePhoneLogin from "@/hooks/useOtplogin"
import { Icons } from "@/components/icons"

export function LoginOTPPattern({ phoneNumber }: { phoneNumber: string }) {
    const [isPending, startTransition] = useTransition();
    const { useConfirmOTP } = usePhoneLogin();

    const form = useForm<z.infer<typeof otpSchema>>({
        resolver: zodResolver(otpSchema),

        defaultValues: {
            otp: '',
            phoneNumber: phoneNumber
        }
    })

    const confirmOTP = (values: z.infer<typeof otpSchema>) => {
        console.log(values)
        startTransition(async () => {
            await useConfirmOTP(values);
            
        })
    }

    return (
        <div className="text-center flex flex-col justify-center items-center gap-3 w-full">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(confirmOTP)} className="space-y-5 w-full flex flex-col items-start">
                    <FormField
                        control={form.control}
                        name="otp"
                        render={({ field: { onChange, value } }) => (
                            <FormItem className="flex flex-col gap-0 items-start w-full ">
                                <FormLabel className="font-semibold">Enter Your OTP</FormLabel>
                                <FormControl>
                                    <InputOTP className="" maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} onChange={onChange}>
                                        <InputOTPGroup className="w-full" >
                                            {new Array(6).fill(0).map((_, i) => (
                                                <InputOTPSlot index={i} />
                                            ))}
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription className="text-left">
                                    {`Enter the OTP code from the SMS we sent to ${phoneNumber}`}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isPending} className="w-10/12">{isPending ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/> : "Confirm"}</Button>
                </form>
            </Form>

        </div>
    )
}
