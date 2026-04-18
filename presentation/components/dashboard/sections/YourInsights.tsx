import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';
import { SegmentedControl, SegmentedControlItem, Badge, Card, CardContent } from '@atlas-ds/react';

export const YourInsights = () => {
    const [yourInsightsSelect, setYourInsightSelect] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

    const data = [
        { name: '1 Jan', value: 10 },
        { name: '', value: 10 },
        { name: '', value: 10 },
        { name: '', value: 10 },
        { name: '', value: 10 },
        { name: '', value: 10 },
        { name: '7 Jan', value: 10 },
    ];

    return (
        <div className='flex-1 min-w-0 flex flex-col gap-4 bg-white shadow-sm rounded-[12px] p-5'>
            <h1 className='text-[#1E293B] text-xl font-medium'>Your Insights</h1>
            <div className='flex-1 flex flex-col gap-4'>
                <SegmentedControl
                    value={yourInsightsSelect}
                    onValueChange={(val) => setYourInsightSelect(val as 'weekly' | 'monthly' | 'yearly')}
                    size='sm'
                    className='w-full'
                >
                    <SegmentedControlItem value='weekly'>Weekly</SegmentedControlItem>
                    <SegmentedControlItem value='monthly'>Monthly</SegmentedControlItem>
                    <SegmentedControlItem value='yearly'>Yearly</SegmentedControlItem>
                </SegmentedControl>
                <div className='max-h-[88px]'>
                    <div className='text-[16px] text-[#475569] flex items-center gap-2 '>
                        Premium Generated <InformationCircleIcon className='w-4 h-4' />
                    </div>

                    <div className='text-[32px] font-semibold'>₹ 0</div>

                    <Badge variant={'light'} size={'sm'} color={'lime'}>
                        ↑ -
                    </Badge>
                </div>

                <div className='h-[110px]'>
                    <ResponsiveContainer width='100%' height='100%'>
                        <LineChart data={data}>
                            <CartesianGrid stroke='#e5e7eb' vertical={false} />
                            <XAxis
                                dataKey='name'
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                                domain={[0, 1000]}
                                ticks={[0, 1000]}
                            />
                            <Line type='monotone' dataKey='value' stroke='#3b82f6' strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className='flex gap-2 flex-1'>
                    <Card variant='horizontal' className='w-full h-[76px]'>
                        <CardContent className='text-[#475569] text-sm '>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='flex gap-2 items-center'>
                                        Lapsed Policies <InformationCircleIcon className='w-4 h-4' />
                                    </div>
                                    <div className='text-[#1E293B] text-[28px] font-semibold'>0</div>
                                </div>
                                <ArrowUpRightIcon className='w-4 h-4 self-end mb-2' />
                            </div>
                        </CardContent>
                    </Card>
                    <Card variant='horizontal' className='w-full h-[76px]'>
                        <CardContent className='text-[#475569] text-sm'>
                            <div className='flex justify-between'>
                                <div>
                                    <div className='flex gap-2 items-center'>
                                        Renewals Done <InformationCircleIcon className='w-4 h-4' />
                                    </div>
                                    <div className='text-[#1E293B] text-[28px] font-semibold'>0</div>
                                </div>
                                <ArrowUpRightIcon className='w-4 h-4 self-end mb-2' />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};
