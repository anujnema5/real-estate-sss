'use client'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'

const GoogleLogin = () => {

    return (
        <div className='flex w-full items-center gap-x-2'>
            <Button
                onClick={() => {
                    window.open(`${'http://localhost:8500'}/auth/google`, "_self");
                }} size={'lg'} className='w-full' variant={'outline'}>
                <FcGoogle />
            </Button>
        </div>
    )
}

export default GoogleLogin