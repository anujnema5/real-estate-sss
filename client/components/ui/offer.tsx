import React from 'react'
import MuteBackground from '../mobile/ui/MuteBackground'
import OfferIcon from '@/assets/Icons/OfferIcon'

const Offer = () => {
    return (
        <div className="bg-white rounded-md min-w-[30vh] h-full flex items-center pl-3 gap-6 shadow-md">
            <div className="flex gap-4 border-r border-muted-dark h-full items-center pr-3">
                <OfferIcon />
            </div>

            <div className="flex flex-col">
                <p className='text-lg'>Lorem ipsum dolor sit.</p>
                <span className='text-black/40 text-sm'>Lorem ipsum dolor sit.</span>
            </div>

            <div className="w-3 h-full bg-primary/65 rounded-r-lg"></div>
        </div>
    )
}

export default Offer