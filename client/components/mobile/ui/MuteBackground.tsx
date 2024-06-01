import React from 'react'

const MuteBackground = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-auto bg-muted '>
            {children}
        </div>
    )
}

export default MuteBackground