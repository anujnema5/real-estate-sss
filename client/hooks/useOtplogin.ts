'use client';
import { useConfirmOTPMutation, useSendOTPMutation } from "@/features/api/auth-api.slice";
import { setOTPInitiated } from "@/features/config/config-slice";
import { useDispatch } from "react-redux"
import { object, z } from "zod";
import { Toaster, toast } from "sonner"
import { otpSchema, phoneNumberSchema } from "@/schema";
import { setCredentials } from "@/features/auth/auth-slice";
import { useRouter } from "next/navigation";

const usePhoneLogin = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [sendOTP, { data, error, isError, isLoading, isSuccess, status }] = useSendOTPMutation();
    const [confirmOTP, allVariables] = useConfirmOTPMutation();
    
    
    const useSendOTP = async (values: z.infer<typeof phoneNumberSchema>) => {
        try {
            const initiateOTP = await sendOTP(values).unwrap();
            
            if (initiateOTP.statusCode === 200) {
                dispatch(setOTPInitiated(true))
                toast.success('OTP Sent to your mobile number')
                
            }
            
        } catch (error: any) {
            if (error.data) {
                toast.error(error.data.message)
            } else {
                toast.error('Something went wrong')
            }
        }
        
        return { data, error, isError, isSuccess }
    }
    
    const useConfirmOTP = async (values: z.infer<typeof otpSchema>) => {
        try {
            const inputOTPResponse = await confirmOTP(values).unwrap();

            console.log(inputOTPResponse.data)

            if (inputOTPResponse.statusCode === 200) {
                dispatch(setCredentials(inputOTPResponse.data))
                toast.success('OTP Verified')
                router.push('/')
            }

            console.log(inputOTPResponse.data)



        } catch (error: any) {
            if (error.data) {
                toast.error(error.data.message)
            } else {
                toast.error('Something went wrong')
            }
        }
    }

    return { useSendOTP, useConfirmOTP }
}

export default usePhoneLogin;