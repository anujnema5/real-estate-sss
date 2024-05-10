import React from 'react'

const Product = ({ width }: { width?: boolean }) => {
    return (
        <div 
        className={`
        bg-slate-400/20 rounded-3xl 
        ${!width ? ' w-36 h-36 lg:w-60 lg:h-60 sm:w-72 sm:h-72' : ' w-full h-full'}`}>{/* TODO */}</div>
    )
}

export default Product