import { mobileFooterLinks } from '@/data/Links/footerLinks'
import Link from 'next/link'
import React from 'react'

const Footerbar = () => {
  return (
    <div className='lg:w-6/12 xl:w-[30vw] sm:w-8/12 w-full h-20 bg-white fixed bottom-0'>
      <ul className='flex w-full h-full items-center justify-between px-8 py-2'>

        {mobileFooterLinks?.map(({ Icon, href, title }) => (
          <li className='h-full'>
            <Link href={href}>
              <div className="flex flex-col items-center justify-evenly gap-1 h-full">
                <Icon />
                <span className='text-black/70 text-sm'>{title}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Footerbar