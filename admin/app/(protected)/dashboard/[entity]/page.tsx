'use client'
import
Section,
{ DynamicTable }
    from '@/components/ui/custom/entity-table';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import React from 'react'
import DashboardBreakcrumb from '@/components/ui/custom/dynamic-breakcrumb';
import { usePathname } from 'next/navigation';
import { entity } from '@/utils/static/db/entity-table';
import DashboardProvider from '@/components/providers/dashboard-provider';

let paramss;

const page = ({ params }: { params: { entity: string } }) => {
    console.log(params.entity)
    const pathname = usePathname();

    return (
        <DashboardProvider params={params.entity} pathName={pathname}>
            <hr className='w-full'/>
            <DynamicTable entity={params.entity} />
            <hr className='w-full'/>
        </DashboardProvider>
    )
}

export default page