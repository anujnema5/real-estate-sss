'use client';
import HeadingWrapper from '@/components/mobile/Layout/Providers/heading-wrapper';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
    
    return (
        <HeadingWrapper heading='My Profile'>
            <div className=""></div>
        </HeadingWrapper>
    )
}

export default page