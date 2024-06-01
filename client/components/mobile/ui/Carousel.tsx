import React from 'react'

const Carousel = () => {
    return (
        <div className='w-full h-auto flex gap-4'>
            <div className="w-full h-44 flex gap-4 rounded-lg overflow-x-auto scrollbar-none">
                {new Array(6).fill(0).map((_, i) => (
                    <div className="h-full min-w-96 bg-zinc-300 rounded-lg"></div>
                ))}
            </div>
        </div>
    )
}

export default Carousel