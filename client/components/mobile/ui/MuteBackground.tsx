import React from 'react'

const MuteBackground = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='w-full h-auto bg-muted px-3 py-3'>
            {children}
        </div>
    )
}

export default MuteBackground