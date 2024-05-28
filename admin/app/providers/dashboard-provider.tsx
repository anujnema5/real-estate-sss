'use client'
import React, { useState } from 'react'
import DashboardBreakcrumb from '../../components/ui/custom/dynamic-breakcrumb'
import '@/utils/custom-prototypes'

type TDashboardProvider = {
    children: React.ReactNode,
    params?: string,
    pathName?: string
}

const   DashboardProvider = ({ children, params, pathName }: TDashboardProvider) => {
    const [ellipses, setEllipses] = useState(true);
    
    return (
        <div className=''>
            <main className='flex flex-col gap-4 p-5 pt-8'>
                {pathName && (
                    <DashboardBreakcrumb params={pathName} />
                )}

                {params && (
                    <>
                        <div className='flex justify-between items-center '>
                            <h1 onClick={()=> setEllipses((elip)=> !elip)} 
                            className={`text-4xl select-none cursor-pointer truncate font-bold hover:underline text-black dark:text-white ${ellipses && "w-5/12 "}`}>
                                {params.firstLetterCapital()}
                            </h1>
                        </div>
                        <p className='text-sm dark:text-gray-400 text-gray-500 '>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                    </>
                )}

                {children}
            </main>
        </div>
    )
}

export default DashboardProvider