import React from 'react';
import { AdjustmentsHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Tile } from '@atlas-ds/react';

export const QuickQuotes: React.FC = () => {
    return (
        <div className='flex-1 min-w-0 bg-white shadow-sm rounded-[12px] p-5 flex flex-col gap-4 max-h-[220px]'>
            <div className='w-full flex justify-between items-center'>
                <div className='space-y-1'>
                    <h1 className='text-[#1E293B] text-xl font-medium'>Quick Quotes</h1>
                    <p className='text-sm text-[#475569]'>
                        Set up your quick quotes here or create a new quote.
                    </p>
                </div>
                <div className='flex item-center gap-2'>
                    <Button variant={'secondaryGray'} size={'sm'}>
                        <AdjustmentsHorizontalIcon className='w-3' />
                        Customise
                    </Button>
                    <Button variant={'secondary'} size={'sm'}>
                        View All Quotes
                    </Button>
                </div>
            </div>
            <div className='flex gap-4'>
                {[
                    { label: 'Health Insurance', icon: '/health-insurance.png' },
                    { label: 'Fire Insurance', icon: '/fire-insurance.png' },
                    { label: 'Motor Insurance', icon: '/motor-insurance.png' },
                ].map((item, index) => (
                    <Tile
                        key={index}
                        className='flex-1 flex flex-col p-3 gap-2 items-center justify-center min-h-[110px] max-h-[116px]'
                    >
                        <div className='flex-1 flex items-center justify-center'>
                            <img src={item.icon} alt={item.label} />
                        </div>
                        <h3 className='text-[#1E293B] text-[1rem] font-medium text-center'> {item.label}</h3>
                    </Tile>
                ))}
                <Tile className='flex-1 flex flex-col p-3 gap-2 items-center justify-center min-h-[110px] max-h-[116px]'>
                    <div className='flex-1 flex items-center justify-center'>
                        <PlusIcon className='w-8 h-8 text-[#475569]' />
                    </div>
                    <h3 className='text-[#1E293B] text-[1rem] font-medium text-center'>Manage LOB</h3>
                </Tile>
            </div>
        </div>
    );
};
