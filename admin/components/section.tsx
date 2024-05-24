import React from 'react';
import '@/utils/custom-prototypes'

export default function Section(Component: React.FC<any>, heading?: string) {
    return (props: any) => (
        <div className='flex flex-col text-white'>
            <main className='flex-grow'>
                {heading && (
                    <div className='flex justify-between items-center mb-4'>
                        <h1 className='text-2xl font-bold text-black dark:text-white'>{heading?.firstLetterCapital()}</h1>
                    </div>
                )}
                <div className="">
                    <Component {...props} />
                </div>
            </main>
        </div>
    );
}
