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

  console.log(`/${arr[0]}/${arr[1]}`);
  console.log(data?.data)

  let headers;
  if (typeof data?.data === 'object') {
    headers = Object.keys(data?.data);
    console.log(headers)
  }

  return (
    <DashboardProvider params={paramString} pathName={pathname}>
      <Card className='w-[80dvw]'>
        <CardHeader className=''>
          <Accordion type="single" collapsible className="w-full ">
            <AccordionItem value="item-1">
              <AccordionTrigger className='text-xl font-semibold no-underline'>User details</AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-5">
                  {headers?.map((header: string) => (

                    <span>{header}</span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardHeader>
      </Card>
    </DashboardProvider>
  )
}

export default page