import React from 'react';
import { AdjustmentsHorizontalIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Button, Tile } from '@atlas-ds/react';

export const YourToolkit: React.FC = () => {
    return (
        <div className='flex-1 min-w-0 bg-white shadow-sm rounded-[12px] p-5 flex flex-col gap-4 max-h-[204px]'>
            <div className='w-full flex justify-between items-center'>
                <div className='space-y-1'>
                    <h1 className='text-[#1E293B] text-xl font-medium'>Your toolkit</h1>
                    <p className='text-sm text-[#475569]'>
                        All your frequently used tools at one place.
                    </p>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant={'secondaryGray'} size={'sm'}>
                        <AdjustmentsHorizontalIcon className='w-3' />
                        Customise
                    </Button>
                    <Button variant={'secondary'} size={'sm'}>
                        View All Tools
                    </Button>
                </div>
            </div>
            <div className='flex gap-3 justify-between'>
                {[
                    { label: 'Brochures', icon: '/brochures.png', isFlex: true },
                    { label: 'Calculator', icon: '/calculator.png' },
                    { label: 'Learning', icon: '/learning.png' },
                    { label: 'Campaigns', icon: '/campaigns.png' },
                    { label: 'Query Tracker', icon: '/query-tracker.png' },
                ].map((item, index) => (
                    <Tile
                        key={index}
                        className={`${item.isFlex ? 'flex-1' : ''} flex flex-col p-3 gap-2 items-center justify-center max-h-[100px] max-w-[140px]`}
                    >
                        <div className='flex-1 flex items-center justify-center'>
                            <img src={item.icon} alt={item.label} />
                        </div>
                        <h3 className='text-[#1E293B] text-[1rem] text-center'>{item.label}</h3>
                    </Tile>
                ))}
                <Tile className='flex-1 flex flex-col p-3 gap-2 items-center justify-center max-h-[110px] max-w-[140px]'>
                    <div className='flex-1 flex items-center justify-center'>
                        <PlusIcon className='w-8 h-8 text-[#475569]' />
                    </div>
                    <h3 className='text-[#475569] text-[1rem] text-center'>Manage Tool</h3>
                </Tile>
            </div>
        </div>
    );
};
