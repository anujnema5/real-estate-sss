import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { userProfileMenuLinks } from '@/utils/constants'
import MenuCard from './menu-card'

const UserProfileMenu = () => {

    return (
            <Card className='flex justify-center items-center  border-none shadow-none'>
                <CardContent className='flex items-center py-0 gap-3 w-full justify-between px-0'>
                        {userProfileMenuLinks?.map((_, i) => (
                            <MenuCard Icons={_.icon} title={_.title} href={_.href} />
                        ))}
                </CardContent>
            </Card>
    )
}

export default UserProfileMenu