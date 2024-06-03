import { ChevronRightIcon } from '@radix-ui/react-icons'
import { ArrowRight } from 'lucide-react'
import React from 'react'

const UserDirectoryCard = ({ title, Icon }: { title: string, Icon: any }) => {
    return (
        <div className='w-full cursor-pointer'>
            <div className="flex items-center justify-between gap-3 w-full border py-3 bg-gray-100/50 rounded-lg pl-3 pr-3">
                <div className="flex items-center gap-3">
                    <Icon className="w-10 h-10 text-primary bg-primary/10 p-2 rounded-full" />
                    {title}
                </div>

                <ChevronRightIcon />
            </div>
        </div>
    )
}

export default UserDirectoryCard