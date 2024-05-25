'use client'
import React from 'react'
import DashboardProvider from '@/app/providers/dashboard-provider';
import useEntityFetch from '@/hooks/useEntity-fetch';
import { usePathname } from 'next/navigation';
import '@/utils/custom-prototypes'

import AccordionTable from '@/components/ui/custom/accordion-table';

const page = ({ params }: { params: { entity: string[] } }) => {
  const arr = params.entity
  const pathname = usePathname();

  const [entity, id] = arr;
  const { data, entityName } = useEntityFetch(`${entity}/${id}`);

  const paramString = arr.join(" ");

  return (
    <DashboardProvider params={paramString} pathName={pathname}>
      <AccordionTable data={data} title={entity} />
    </DashboardProvider>
  )
}

export default page