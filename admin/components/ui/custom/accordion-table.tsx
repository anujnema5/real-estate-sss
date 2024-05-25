import React from 'react'

import { Card, CardHeader } from '@/components/ui/card';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import '@/utils/custom-prototypes'

const AccordionTable = ({ data }: { data: any }) => {
    type MainType = {
        entitySpecificKeys: string[];
        entityOneToMany: { title: string;[key: string]: any }[];
        entityOneToOne: { title: string;[key: string]: any }[];
    }

    const main: any = {
        entitySpecificKeys: [],
        entityOneToMany: [],
        entityOneToOne: []
    }

    console.log(main)

    const dataEntries = data?.data || {};

    for (const [key, value] of Object.entries(dataEntries)) {
        if (value === null || typeof value === 'string') {
            main.entitySpecificKeys.push(key);
        } else if (Array.isArray(value)) {
            main.entityOneToMany.push({ title: key, ...value });
        } else if (typeof value === 'object') {
            main.entityOneToOne.push({ title: key, ...value });
        }
    }

    const mappable = Object.keys(main);
    console.log(mappable)

    return (
        <div className='w-[79vw] flex flex-col gap-7'>

            {mappable?.map((entity: any) => {
                if (entity === 'entitySpecificKeys') {
                    return <Card className=''>
                        <CardHeader className=''>
                            <Accordion type="single" collapsible className="w-full ">
                                <AccordionItem value="  ">
                                    <AccordionTrigger className='text-xl font-semibold no-underline'>User details</AccordionTrigger>
                                    <AccordionContent>
                                        <Table>
                                            <TableHeader className=''>
                                                <TableRow>
                                                    {main.entitySpecificKeys?.map((header: string | null) => (
                                                        <TableHead className=" uppercase">{header}</TableHead>
                                                    ))}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {main.entitySpecificKeys.map((invoice, index) => {
                                                    console.log()
                                                    if (!dataEntries[invoice]) {
                                                        return <TableCell className="font-medium">
                                                            {"None"}
                                                        </TableCell>
                                                    } else {
                                                        return <TableCell className="font-medium whitespace-nowrap">
                                                            {dataEntries[invoice]}
                                                        </TableCell>
                                                    }
                                                }
                                                )}
                                            </TableBody>
                                        </Table>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </CardHeader>
                    </Card>
                } else {
                    return main[entity].map((otherEntity: any) => {
                        const headers = Object.keys(otherEntity)
                        const keyss = Object.values(otherEntity);
                        return <Card className=''>
                            <CardHeader className=''>
                                <Accordion type="single" collapsible className="w-full ">
                                    <AccordionItem value="  ">
                                        <AccordionTrigger className='text-xl font-semibold no-underline'>{otherEntity.title.firstLetterCapital()}</AccordionTrigger>
                                        <AccordionContent>
                                            <Table>
                                                <TableHeader className=''>
                                                    <TableRow>
                                                        {headers?.map((header: string | null) => (
                                                            <TableHead className=" uppercase">{header}</TableHead>
                                                        ))}
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {keyss.map((invoice: any, index) => {
                                                        console.log()
                                                        if (!invoice || typeof invoice === 'object') {
                                                            return <TableCell className="font-medium">
                                                                {"None"}
                                                            </TableCell>
                                                        } else {
                                                            return <TableCell className="font-medium whitespace-nowrap">
                                                                {invoice}
                                                            </TableCell>
                                                        }
                                                    }
                                                    )}
                                                </TableBody>
                                            </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardHeader>
                        </Card>
                    })

                }
            })}
        </div>
    )
}

export default AccordionTable


