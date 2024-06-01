import React from 'react'
import MuteBackground from '../mobile/ui/MuteBackground'
import OfferIcon from '@/assets/Icons/OfferIcon'

const Offer = () => {
    return (
        <div className="bg-white rounded-md w-full h-full flex items-center px-6 py-1 gap-6 shadow-md relative">
            <div className="flex gap-4 border-r border-muted-dark h-full items-center pr-3">
                <OfferIcon />
            </div>

            <div className="flex flex-col">
                <p className='text-lg whitespace-nowrap'>Lorem ipsum dolor sit.</p>
                <span className='text-black/40 text-sm'>Lorem ipsum dolor sit.</span>
            </div>

            <div className="w-3 h-full bg-primary/65 rounded-r-lg absolute right-0"></div>
        </div>
    )
}

export default Offer