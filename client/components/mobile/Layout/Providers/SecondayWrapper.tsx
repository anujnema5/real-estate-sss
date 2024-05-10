import React from 'react'

const SecondayWrapper = ({ children, heading, textCenter }: { children: React.ReactNode, heading: string, textCenter?: boolean }) => {
    return (
        <div className='w-full h-56 px-3 py-4'>
            <div className={`bg-[#fff7e5] rounded-3xl  w-full h-full flex items-start px-10 py-5 ${textCenter ? 'justify-center' : 'justify-start'}`}>
                <h3 className='text-primary text-xl font-bold'>{heading}</h3>

                <div className="">{children}</div>
            </div>
        </div>
    )
}

export default SecondayWrapper