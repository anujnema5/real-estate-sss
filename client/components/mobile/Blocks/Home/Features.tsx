import React from 'react'
import HeadingWrapper from '@/components/mobile/Layout/Providers/heading-wrapper'

const Features = () => {
    return (
        <HeadingWrapper heading="GetLook's Safety Standards">
            <div className="px-10">
                <ul className='flex w-full justify-between'>

                    {new Array(4).fill(0).map(() => (
                        <li className="flex flex-col justify-center items-center border-r px-5">
                            <div className='text-sm'>ICON IMG</div>
                            <span className='text-xs'>Lorem.</span>
                        </li>
                    ))}
                </ul>
            </div>
        </HeadingWrapper>
    )
}

export default Features