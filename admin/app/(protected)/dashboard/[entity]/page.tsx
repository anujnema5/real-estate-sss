'use client'
import Section,{ DynamicTable } from '@/components/ui/custom/entity-table';

import React from 'react'
import { usePathname } from 'next/navigation';
import DashboardProvider from '@/app/providers/dashboard-provider';

const page = ({ params }: { params: { entity: string } }) => {
    console.log(params.entity)
    const pathname = usePathname();

    return (
        <DashboardProvider params={params.entity} pathName={pathname}>
            <hr className='w-full ' />
            <DynamicTable entity={params.entity} />
            <hr className='w-full' />
        </DashboardProvider>
    )
}

export default page