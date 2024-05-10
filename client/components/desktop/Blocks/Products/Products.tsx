import Product from '@/components/ui/Product'
import Gap from '@/components/utils/Gap'
import React from 'react'

const Products = () => {
    return (
        <div className="w-full sm:h-[50vh] h-[60vh] py-10 px-2 flex flex-col gap-7">
            <h3 className='sm:text-3xl font-semibold text-xl'>Shop By Products</h3>

            <div className="w-full h-full flex sm:flex-row flex-col gap-5 justify-between items-center">

                <ul className='flex h-full w-full items-center sm:gap-10 gap-5 sm:h-5/6 sm:w-4/12'>
                    {new Array(2).fill(0).map(() => (
                        <Product width={true} />
                    ))}
                </ul>
                <div className="bg-gray-200 sm:w-5/12 w-full h-full rounded-3xl"></div>
            </div>
        </div>
    )
}

export default Gap(Products)