import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import MenuCard from './menu-card'
import { userProfileOptions } from '@/utils/constants'
import UserDirectoryCard from './user-directory-card'

const UserOptionsMenu = () => {

    return (
            <Card className='flex flex-col justify-center items-center border-none shadow-none'>
                <CardContent className='w-full px-0 '>
                    <div className="flex flex-col justify-between items-center gap-4 w-full">
                        {userProfileOptions?.map((_, i) => (
                            <UserDirectoryCard title={_.title} Icon={_.icon}/>
                        ))}
                    </div>
                </CardContent>
            </Card>
    )
}

export default UserOptionsMenu