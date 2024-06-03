import React from 'react'
import '@/app/globals.css'

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="lg:w-6/12 xl:w-[30vw] sm:w-8/12 w-full min-h-screen shadow-md shadow-zinc-300 relative">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout