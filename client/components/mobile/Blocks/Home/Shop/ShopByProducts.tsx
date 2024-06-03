import Product from '@/components/ui/Product'
import React from 'react'
import HeadingWrapper from '@/components/mobile/Layout/Providers/heading-wrapper'

const ShopByProducts = () => {
    return (

        <HeadingWrapper heading='Shop by products'>
            <div className='flex flex-col h-auto items-center justify-between px-2 mt-5'>
                <ul className=' h-full flex gap-4 flex-wrap items-center justify-around'>
                    {new Array(4).fill(0).map(() => (
                        <li className=' w-44 h-44'><Product width /></li>
                    ))}
                </ul>
            </div>
        </HeadingWrapper>
    )
}

export default ShopByProducts