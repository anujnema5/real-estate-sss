'use client';
import HeadingWrapper from '@/components/mobile/Layout/Providers/heading-wrapper';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import Profile from './profile';

const page = () => {

    return (
        <HeadingWrapper heading='My Profile' back>
            <Profile />
        </HeadingWrapper>
    )
}

export default page