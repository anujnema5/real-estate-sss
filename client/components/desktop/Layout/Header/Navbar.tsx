import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import DownloadApp from '@/components/ui/downloadapp'
import { Button } from '@/components/ui/button'

const Navbar = () => {
    return (
        <div className='h-20 sm:h-24 flex items-center justify-between px-5 sm:px-16'>
            <div className="logo">
                {/* TEMPERORY */}
                <h1 className='text-xl font-bold'>LOGO</h1>
            </div>

            <div className="flex items-center justify-between gap-5">
                <DownloadApp/>

                <Link href={'/sign-in'}>
                    <Button className='py-2 font-semibold sm:py-5'>Login/Signup</Button>
                </Link>
            </div>
        </div>
    )
}

export default Navbar