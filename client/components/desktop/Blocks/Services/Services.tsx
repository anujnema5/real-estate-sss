import Product from '@/components/ui/Product'
import Gap from '@/components/utils/Gap'
import React from 'react'

const Services = () => {
    return (
        <div className='w-full text-left my-6 sm:my-20 px-4 flex flex-col sm:gap-10 gap-6 justify-around'>
            <h3 className='sm:text-3xl text-lg font-semibold'>Book our services at affordable price</h3>

            <div className="flex flex-wrap items-center sm:justify-between justify-around gap-5">
                {new Array(10).fill(Math.random().toString()).map((_, i) => (
                    <Product/>
                ))} 
            </div>
        </div>
    )
}

export default Gap(Services)