import React from 'react';
import { PaginationDots } from '@atlas-ds/react';

export const WhatsNew: React.FC = () => {
    return (
        <div className='flex-1 min-w-0 bg-white shadow-sm rounded-[12px] p-5 relative overflow-hidden max-h-[426px]'>
            <div
                className='absolute bottom-0 left-0 right-0 h-[60%] bg-[linear-gradient(135deg,#E0F2FE_0%,#3B82F6_100%)] z-0'
                style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 35%)' }}
            />

            <img
                src='/whats-new-illustration.png'
                alt=''
                className='absolute top-[40px] right-0 w-[45%] max-w-[170px] pointer-events-none z-0'
            />

            <div className='relative z-10 flex flex-col justify-between h-full'>
                <div className='max-w-[60%]'>
                    <h1 className='text-[#1E293B] text-xl font-medium'>What’s new</h1>
                    <p className='text-sm text-[#475569]'>Stay updated with latest news and updates from Bajaj!</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='w-full'>
                        <img
                            src='/whats-new-carousal.png'
                            alt='New Identity'
                            className='w-full rounded-[12px] shadow-sm border border-white/10'
                        />
                    </div>
                    <div className='flex justify-center pb-1'>
                        <PaginationDots total={4} activeIndex={0} />
                    </div>
                </div>
            </div>
        </div>
    );
};
