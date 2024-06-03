import React from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'


const MenuCard = ({ Icons, title, href }: { Icons: any, title: string, href: string }) => {
    return (

        <Link href={href} className='sm:w-28 sm:h-24 w-full h-full rounded-xl flex items-center justify-center'>
            <Card className='w-full h-full flex flex-col justify-center items-center sm:py-2 py-5 px-1 space-y-1'>
                <Icons className="sm:w-7 sm:h-7 w-5 h-5 text-primary" />
                <span className='sm:text-sm text-xs whitespace-nowrap '>{title}</span>
            </Card>
        </Link>

    )
}

export default MenuCard