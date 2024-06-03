import LocationIcon from '@/assets/Icons/LocationIcon'
import UserIcon from '@/assets/Icons/UserIcon'
import Heading from '@/components/ui/heading'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='px-6 py-5 w-full h-full flex justify-between bg-white'>
            <div className="flex items-center gap-3 ">
                <LocationIcon />
                {/* <Heading type={'h1'} text='Banglore'/> */}
                <h3 className='text-2xl font-semibold text-primary'>Banglore</h3>
                <ChevronDownIcon className='text-primary w-6 h-6' />
            </div>
            <Link href={'/profile'}><UserIcon /></Link>
        </div>
    )
}

export default Header