'use client'
import DashboardProvider from '@/components/providers/dashboard-provider';
import useEntityFetch from '@/hooks/useEntity-fetch';
import { usePathname } from 'next/navigation';
import React from 'react'
import '@/utils/custom-prototypes'
import { Card, CardHeader } from '@/components/ui/card';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import AccordionTable from '@/components/ui/custom/accordion-table';

const page = ({ params }: { params: { entity: string[] } }) => {
  const arr = params.entity
  const pathname = usePathname();

  const {
    data,
    entityName,
    error,
    isError,
    isLoading,
    isSuccess
  } = useEntityFetch(`${arr[0]}/${arr[1]}`);

  const paramString = arr.join(" ");

  return (
    <DashboardProvider params={paramString} pathName={pathname}>
      <AccordionTable data={data} title={arr[0]} />
    </DashboardProvider>
  )
}

export default page