import Product from '@/components/ui/Product'
import Gap from '@/components/utils/Gap'
import React from 'react'

const Brands = () => {
    return (
        <div className='bg-[#fff7e5] sm:w-full sm:h-full w-full h-full sm:py-0 pb-10 pt-4'>
            <div className="flex flex-col justify-between sm:py-14 sm:px-20  h-full gap-10">
                <h3 className='sm:text-3xl text-xl font-semibold text-primary px-10 sm:px-0 sm:mt-0 mt-10'>We use best Brands in 1-Time use packs</h3>

                <ul className='flex flex-wrap justify-around gap-5 sm:h-auto px-6 sm:px-0 w-full h-full'>
                    {new Array(6).fill(6).map(() => (
                        <li className='min-w-40 min-h-40'><Product width/></li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Brands