import Gap from '@/components/utils/Gap'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import React from 'react'

const WhyGetLook = () => {
    return (
        <div className='bg-[#fff7e5] sm:w-full sm:h-[40vh] h-full w-full rounded-2xl flex sm:flex-row flex-col justify-between -my-5'>
            <div className="sm:p-14 p-6 flex flex-col gap-10 justify-between w-full h-full ">
                <h3 className='text-primary sm:text-2xl text-xl font-semibold'>Why GetLook</h3>

                <ul className='flex flex-col gap-5'>
                    {new Array(3).fill(0).map(() => (
                        <li>
                            <div className="flex items-center sm:gap-2 gap-4">
                                <CheckCircleIcon className='w-7 h-7 text-primary'/>
                                <span className='sm:text-xl text-lg font-medium'>Lorem ipsum dolor sit amet ipsum sit amet.</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-center items-end p-20 sm:text-xl text-lg font-semibold">TODO SVG</div>
        </div>
    )
}

export default Gap(WhyGetLook)