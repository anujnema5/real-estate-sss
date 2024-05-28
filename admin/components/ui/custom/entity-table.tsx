import '@/utils/custom-prototypes'
import React from 'react';
import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Section from '@/components/section';

import useEntityFetch from '@/hooks/useEntity-fetch';
import { Input } from '../input';
import { Button } from '../button';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';

export function DynamicTable({ entity }: { entity: string }) {
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, entityName, error, isError } = useEntityFetch(entity);

  if (error) {
    console.log(error)
    dispatch(logout())
  }

  if (!data || data.data.length === 0) return <p>No data available :(</p>;

  const headersKeys = Object.keys(data.data[0]);
  const entityData = data.data;

  return (
    <div className="flex flex-col gap-5">
      <Input className='w-4/12 rounded-md' placeholder={`Search ${entity}...`} />
      <div className="rounded-md w-[80dvw]  border ">

        <Table className=''>
          {/* <TableCaption>{entityName ? ` ${entityName.firstLetterCapital()} Table` : `Dynamic Table`}</TableCaption> */}
          <TableHeader>
            <TableRow>
              {headersKeys?.map(header => (
                <TableHead key={header} className='uppercase'>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className=''>
            {entityData?.map((entity: any) => {
              return (
                <TableRow className=''>
                  {headersKeys?.map((headers: any) => {
                    if (typeof entity[headers] !== 'object' || entity[headers] === null || Array.isArray(entity[headers])) {
                      return <TableCell className='whitespace-nowrap text-black dark:text-white'>
                        <Link href={`/dashboard/${entityName}/${entity.id}`}>
                          {String(entity[headers])}
                        </Link>
                      </TableCell>
                    }

                    else {
                      return <Button className='h-5 mt-2'>{'Exist'}</Button>
                    }
                  })
                  }
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Section;
