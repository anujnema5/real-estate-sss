import Product from '@/components/ui/Product'
import React from 'react'
import HeadingWrapper from '../../Layout/Providers/PrimaryWrapper'

const Shop = () => {
    return (

        <HeadingWrapper heading='Shop by Service'>
            <div className='flex flex-col h-auto items-center justify-center'>
                <ul className='w-11/12 h-full flex gap-4 flex-wrap items-center justify-around'>
                    {new Array(12).fill(0).map(() => (
                        <li className=' w-40 h-40'><Product width /></li>
                    ))}
                </ul>
            </div>
        </HeadingWrapper>
    )
}

export default Shop