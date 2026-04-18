import React, { useState } from 'react';
import { Badge, SegmentedControl, SegmentedControlItem, Card, CardContent, Button } from '@atlas-ds/react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ArrowUpRightIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

export const AssistantInsights = () => {
    const [businessInsightsSelect, setBusinessInsightSelect] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex-[216] rounded-[12px] bg-[#003460] [background-image:radial-gradient(circle_at_top_left,rgba(78,170,232,0.3)_0%,transparent_20%),radial-gradient(circle_at_bottom_right,rgba(78,170,232,0.3)_0%,transparent_20%)] p-2 shadow-sm'>
                <div className='w-full h-full bg-white/8 rounded-[6px] flex flex-col gap-4 items-center p-4'>
                    <div>
                        <img src='/ai-logo.png' alt='AI Logo' />
                    </div>
                    <div className='text-white text-center space-y-1'>
                        <h1 className='font-medium text-xl'>
                            <span>Hey I’m</span>
                            <span className='bg-[linear-gradient(90deg,#8D9FFF_0%,#B1A6FF_38%,#FFCAEE_68%,#FFB4C3_100%)] bg-clip-text text-transparent'>
                                {' '}
                                MyAI
                            </span>
                        </h1>
                        <p className='text-sm'>How can I assist you today?</p>
                    </div>
                    <div className='grid grid-cols-[auto_1fr] gap-2'>
                        <Badge color={'blue'} variant={'light'} size={'sm'}>
                            Policy Advisor
                        </Badge>
                        <Badge color={'blue'} variant={'light'} size={'sm'}>
                            Premium Calculator
                        </Badge>
                        <Badge color={'blue'} variant={'light'} size={'sm'}>
                            Customer 360
                        </Badge>
                        <Badge color={'blue'} variant={'light'} size={'sm'}>
                            <span className='inline-flex items-center gap-1.5'>
                                <SparklesIcon className='w-4 h-4 shrink-0' />
                                Ask me anything
                            </span>
                        </Badge>
                    </div>
                </div>
            </div>
            <div className='flex-[650] flex flex-col gap-6 p-5 bg-white rounded-[12px] shadow-sm'>
                <div className='flex-1 flex flex-col gap-3'>
                    <h1 className='text-slate-800 text-2xl font-medium'>Business Insights</h1>
                    <div>
                        <SegmentedControl
                            value={businessInsightsSelect}
                            onValueChange={(val) => setBusinessInsightSelect(val as 'weekly' | 'monthly' | 'yearly')}
                            className='w-full'
                            size='sm'
                        >
                            <SegmentedControlItem value='weekly'>Weekly</SegmentedControlItem>
                            <SegmentedControlItem value='monthly'>Monthly</SegmentedControlItem>
                            <SegmentedControlItem value='yearly'>Yearly</SegmentedControlItem>
                        </SegmentedControl>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <Card variant='horizontal' className='w-full'>
                            <CardContent className='text-[#475569] text-sm'>
                                <div>
                                    <div className='text-nowrap'>Total Quotes Shared</div>
                                    <div className='text-[#1E293B] text-[28px] font-semibold'>0</div>
                                </div>
                                <div className='flex justify-between items-center text-[12px]'>
                                    <div>
                                        <span>Due this week: </span>
                                        <span className='text-[#1E293B] font-medium'>0</span>
                                    </div>
                                    <div>
                                        <ArrowUpRightIcon className='w-4 h-4' />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card variant='horizontal' className='w-full'>
                            <CardContent className='text-[#475569] text-sm'>
                                <div>
                                    <div>Lapsed Policies</div>
                                    <div className='text-[#1E293B] text-[28px] font-semibold'>0</div>
                                    <div className='flex items-center justify-end'>
                                        <ArrowUpRightIcon className='w-4 h-4' />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card variant='horizontal' className='w-full'>
                            <CardContent className='text-[#475569] text-sm'>
                                <div>
                                    <div>Total Renewals</div>
                                    <div className='text-[#1E293B] text-[28px] font-semibold'>0</div>
                                </div>
                                <div className='flex justify-between items-center text-[12px]'>
                                    <div>
                                        <span>Pending: </span>
                                        <span className='text-[#1E293B] font-medium'>0</span>
                                    </div>
                                    <div>
                                        <ArrowUpRightIcon className='w-4 h-4' />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card variant='horizontal' className='w-full'>
                            <CardContent className='text-[#475569] text-sm'>
                                <div>
                                    <div>No. of claims</div>
                                    <div className='text-[#1E293B] text-[28px] font-semibold'>0</div>
                                </div>
                                <div className='flex items-center justify-end'>
                                    <ArrowUpRightIcon className='w-4 h-4' />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                <div className='flex-1'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-slate-800 text-2xl font-medium'>Today’s Tasks</h1>
                        <Button variant={'link'}>
                            View all <ChevronRightIcon className='w-4 h-4' />
                        </Button>
                    </div>
                    <div className='h-full flex flex-col justify-center items-center'>
                        <div>
                            <img src='/calendar.png' alt='calender' />
                        </div>
                        <div className='text-[#475569]'>Yay! You have no tasks for today!</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
