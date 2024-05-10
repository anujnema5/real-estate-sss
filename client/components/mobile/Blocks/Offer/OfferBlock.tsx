import React from 'react'
import MuteBackground from '../../ui/MuteBackground'
import Offer from '@/components/ui/offer'

const OfferBlock = () => {
  return (
    <MuteBackground>
      <div className='w-full h-16 px-2 overflow-x-auto scrollbar-none'>
        <ul className='flex gap-5 min-w-full h-full w-max'>
          {new Array(4).fill(0).map(() => (
            <li className='w-full h-full'><Offer /></li>
          ))}
        </ul>
      </div>
    </MuteBackground>
  )
}

export default OfferBlock