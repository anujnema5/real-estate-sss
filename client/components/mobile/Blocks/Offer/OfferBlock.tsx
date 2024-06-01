import React from 'react'
import MuteBackground from '../../ui/MuteBackground'
import Offer from '@/components/ui/offer'

const OfferBlock = () => {
  return (
    <div className='w-full h-16 px-2 '>
      <ul className='flex overflow-x-auto gap-4 scrollbar-none'>
        {new Array(4).fill(0).map(() => (
          <li className='h-full w-full  '>
            <Offer />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OfferBlock