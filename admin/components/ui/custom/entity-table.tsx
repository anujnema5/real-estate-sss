'use client';

import '@/utils/custom-prototypes'
import React, { useState } from 'react';
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

export function   DynamicTable({ entity }: { entity: string }) {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, entityName, error, isError } = useEntityFetch(entity);
  const [keys, setKeys] = useState('');

  if (error) {
    console.log(error)
    dispatch(logout())
  }

  if (!data || data.data.length === 0) return <p>No data available :(</p>;

  const headersKeys = Object.keys(data.data[0]);
  const entityData = data.data;

  const handleSearch = (e: any) => {
    setKeys(e.target.value.toLowerCase());
  }

  const filteredData = entityData.filter((item: any) => {
    return headersKeys.some(key => {
      const value = item[key];
      return value && value.toString().toLowerCase().includes(keys);
    });
  });

  return (
    <div className="flex flex-col gap-5">
      <Input className='w-4/12 rounded-md' placeholder={`Search ${entity}...`} onChange={handleSearch} />
      <div className="rounded-md w-[80dvw] border">

        <Table className=''>
          <TableHeader>
            <TableRow>
              {headersKeys?.map(header => (
                <TableHead key={header} className='uppercase'>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className=''>
            {filteredData.length === 0 && (<TableCell className='whitespace-nowrap text-black dark:text-white'>No Data Found</TableCell>)}
            {filteredData?.map((entity: any) => {
              return (
                <TableRow key={entity.id} className=''>
                  
                  {headersKeys?.map((header: any) => {
                    const cellValue = entity[header];
                    if (typeof cellValue !== 'object' || cellValue === null || Array.isArray(cellValue)) {
                      return (
                        <TableCell key={header} className='whitespace-nowrap text-black dark:text-white'>
                          <Link href={`/dashboard/${entityName}/${entity.id}`}>
                            {String(cellValue)}
                          </Link>
                        </TableCell>
                      );
                    } else {
                      return (
                        <TableCell key={header}>
                          <Button className='h-5 mt-2'>{'Exist'}</Button>
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Section;
