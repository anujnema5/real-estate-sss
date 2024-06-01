'use client'
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import '@/utils/custom-prototypes'

const HeadingWrapper = ({ children, heading, showHeading = true, back=false }: { children: React.ReactNode, heading?: string, showHeading?: boolean, back?: boolean }) => {
    const pathname = usePathname();
    const fallbackHeading = pathname.slice(1)

    const router = useRouter();

    const handlePushRouterBack = ()=> {
        router.back();
    }

    return (
        <div className='flex flex-col h-auto items-start overflow-x-auto  bg-white rounded-xl py-3'>
            <div className="w-full flex items-center py-5 px-5 ">
                {back && <ArrowLeftIcon className='scale-150 font-semibold cursor-pointer' style={{ fontSize: '50px' }} onClick={handlePushRouterBack} />}
                <h4 className='text-xl flex flex-grow justify-center font-bold'>
                    {showHeading ? (heading ? heading.firstLetterCapital() : fallbackHeading.firstLetterCapital()) : ''}
                </h4>
            </div>

            {children}
        </div>
    )
}

export default HeadingWrapper