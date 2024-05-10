import React from 'react'

const HeadingWrapper = ({ children, heading }: { children: React.ReactNode, heading?: string }) => {
    return (
        <div className='flex flex-col h-auto items-center justify-center py-10 gap-8 overflow-x-auto bg-white'>
            <h4 className='text-xl font-bold'>{heading}</h4>

            <div className="w-full">{children}</div>
        </div>
    )
}

export default HeadingWrapper