import { Button } from '@/components/ui/button'
import Gap from '@/components/utils/Gap'
import { MapPinIcon } from '@heroicons/react/24/solid'
import { MapIcon } from '@heroicons/react/24/solid'
import React from 'react'

const Hero = () => {
    return (
        <div className='w-full sm:h-[65vh] h-[30vh] relative'>
            <div className="bg-building bg-no-repeat bg-cover w-full h-full bg-center border-2 rounded-xl"></div>
            <div className="sm:ring-1 sm:px-5 px-3 py-5 sm:ring-red-600 border absolute sm:h-16 h-10 sm:rounded-2xl rounded-lg -translate-x-1/2 -translate-y-1/2 left-1/2 w-10/12 lg:w-5/12 sm:min-w-5/12 bg-white">

                <div className="location justify-between flex items-center w-full h-full">
                    <div className="flex items-center gap-3">
                        <MapPinIcon className='text-red-500 sm:w-10 sm:h-10 h-6 w-6' />
                        <h3 className='sm:text-lg text-sm font-bold'>Banglore</h3>
                    </div>
                    <Button className='min-w-5/12 sm:min-w-3/12 text-xs sm:text-sm h-7 sm:h-9'>Explore Services</Button>
                </div>
            </div>
        </div>
    )
}

export default Gap(Hero)