import React from 'react'
import HeadingWrapper from '@/components/mobile/Layout/Providers/heading-wrapper'
import Carousel from './NewLaunchServices'

const GetLooks = () => {
    return (
        <HeadingWrapper heading='Explore With GetLook'>
            <div className='px-5 py-3 w-full h-auto flex gap-4 overflow-x-auto scrollbar-none'>
                <div className="w-max flex gap-3">
                    {new Array(6).fill(0).map((_, i) => (
                        <div className="min-h-48 sm:min-w-[20vw] min-w-[75vw] bg-zinc-300 rounded-lg"></div>
                    ))}
                </div>
            </div>
        </HeadingWrapper>
    )
}

export default GetLooks