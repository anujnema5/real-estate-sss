import React from 'react';
import { Card, CardHeader } from '@/components/ui/card';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from '@/components/ui/table';

import '@/utils/custom-prototypes';

interface AccordionTableProps {
    data: Record<string, any>;
    title: string;
}

interface MainData {
    entitySpecificKeys: string[];
    entityOneToMany: { title: string;[key: string]: any }[];
    entityOneToOne: { title: string;[key: string]: any }[];
}

const AccordionTable: React.FC<AccordionTableProps> = ({ data, title }) => {
    const main: MainData = {
        entitySpecificKeys: [],
        entityOneToMany: [],
        entityOneToOne: [],
    };

    const dataEntries = data?.data || {};

    Object.entries(dataEntries).forEach(([key, value]) => {
        if (value === null || typeof value === 'string') {
            main.entitySpecificKeys.push(key);
        } else if (Array.isArray(value)) {
            main.entityOneToMany.push({ title: key, ...value });
        } else if (typeof value === 'object') {
            main.entityOneToOne.push({ title: key, ...value });
        }
    });

    return (
        <div className="w-[79vw] flex flex-col gap-7">
            {Object.keys(main).map((entity) => {
                if (entity === 'entitySpecificKeys') {
                    return (
                        <Card key={entity}>
                            <CardHeader>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="details">
                                        <AccordionTrigger className="text-xl font-semibold no-underline">
                                            {`${title.firstLetterCapital()}'s details`}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        {main.entitySpecificKeys.map((header) => (
                                                            <TableHead key={header} className="uppercase">
                                                                {header}
                                                            </TableHead>
                                                        ))}
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    <TableRow>
                                                        {main.entitySpecificKeys.map((key) => (
                                                            <TableCell key={key} className="font-medium whitespace-nowrap">
                                                                {dataEntries[key] ?? 'None'}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardHeader>
                        </Card>
                    );
                } else {
                    return main[entity].map((otherEntity: any) => {
                        const title = otherEntity.title.firstLetterCapital();
                        const headers = Object.keys(otherEntity);
                        const values = Object.values(otherEntity);

                        let DoCompRender = headers.length > 1;
                        return (
                            <Card key={title}>
                                <CardHeader>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value={title}>
                                            <AccordionTrigger className="text-xl font-semibold no-underline">
                                                {title}
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                {DoCompRender ?
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                {headers.map((header) => (
                                                                    <TableHead key={header} className="uppercase">
                                                                        {header}
                                                                    </TableHead>
                                                                ))}
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            <TableRow>
                                                                {values.map((value: any, index) => {
                                                                    console.log(value);
                                                                    return <TableCell key={index}
                                                                        className="font-medium whitespace-nowrap">
                                                                        {value === null ? "None" :
                                                                            (typeof value === 'object' ? 'Exist' :
                                                                                (typeof value === 'boolean' ? (value ? "Yes" : "No") : typeof value === 'number' ? (String(value)): value))}

                                                                    </TableCell>
                                                                })}
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                    : <h3 className='text-sm font-medium py-3'>{`No ${title} Available`}</h3>}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardHeader>
                            </Card>
                        );
                    });
                }
            })}
        </div>
    );
};

export default AccordionTable;
