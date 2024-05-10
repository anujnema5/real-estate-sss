import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './button'

const DownloadApp = ({show}: {show?: boolean}) => {
  return (
    <div className="flex items-center justify-between gap-5">
                <div className={`gap-5 ${show ? 'flex' : ' hidden sm:flex'}`}>
                    <Link href={'/'}>
                        <Image src={'https://getlook.in/static/img/app_store_download.png'}
                            alt='app-store-link'
                            width={3000}
                            height={3000}
                            className='w-36 h-10'
                        />
                    </Link>

                    <Link href={'/'}>
                        <Image src={'https://getlook.in/static/img/play_store_download.png'}
                            alt='app-store-link'
                            width={3000}
                            height={3000}
                            className='w-36 h-10'
                        />
                    </Link>
                </div>
            </div>
  )
}

export default DownloadApp