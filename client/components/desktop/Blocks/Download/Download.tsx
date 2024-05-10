import DownloadApp from '@/components/ui/downloadapp'
import Gap from '@/components/utils/Gap'
import React from 'react'

const Download = () => {
  return (
    <div className='w-full h-full sm:h-[50vh] flex sm:flex-row flex-col-reverse justify-between sm:px-20 items-center p-4 py-14 sm:gap-0 gap-10'>
      <div className="sm:text-3xl font-bold text-2xl">TODO Image</div>

      <div className="flex flex-col sm:gap-10 gap-7">
        <div className="flex flex-col sm:gap-2 gap-5">
          <h3 className='sm:text-4xl text-3xl font-semibold'>Download GetLook app now</h3>
          <h6 className='text-xl'>Get the best salon service at your home</h6>
        </div>
        <DownloadApp show />
      </div>

    </div>
  )
}

export default Gap(Download)