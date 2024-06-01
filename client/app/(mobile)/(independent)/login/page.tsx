'use client'
import Link from 'next/link'
import React, { useState, useTransition } from 'react'

import HeadingWrapper from '@/components/mobile/Layout/Providers/heading-wrapper'
import { OTPLogin } from '@/components/mobile/Blocks/Auth/otp-login'
import GoogleLogin from '@/components/mobile/Blocks/Auth/google-login'

const page = () => {

    return (
        <HeadingWrapper showHeading={false}>
            <div className="flex flex-col flex-grow w-full items-center justify-center h-full sm:px-12 px-8 py-10 sm:py-0 ">
                <div className="w-full h-[80vh] flex flex-col items-center">

                    <h1 className='text-2xl font-semibold'>LOGO HERE</h1>
                    <div className="w-full h-full flex flex-col items-center justify-center flex-grow  sm:gap-3 gap-1.5 ">
                        <OTPLogin />
                        <hr className=' w-full'/>
                        <GoogleLogin />
                    </div>
                </div>

                <span className='text-sm'>By signing in I agree to <Link href={'/'} className='text-primary'>Terms & Conditions</Link> </span>
            </div>
        </HeadingWrapper>
    )
}

export default page