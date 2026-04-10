import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { SegmentedControl, SegmentedControlItem } from '@atlas-ds/react';
import { ChevronLeft } from 'lucide-react';
import { ImdLoginForm } from '../components/ImdLoginForm';
import { MobileLoginForm } from '../components/MobileLoginForm';

export const AgentLogin = () => {
    const navigate = useNavigate();
    const [loginMethod, setLoginMethod] = React.useState<'imd' | 'mobile'>('imd');

    return (
        <div className='mx-auto flex w-full max-w-md flex-col'>
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className='mb-8 flex items-center gap-1 text-sm transition-colors hover:text-gray-900 cursor-pointer'
                style={{ color: 'var(--text-secondary)' }}
            >
                <ChevronLeft className='h-4 w-4' /> Back
            </button>

            <div className='mb-10 text-center'>
                <h1 className='mb-6 text-4xl font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Enter Login Details
                </h1>

                <p className='mb-4 text-left text-md' style={{ color: 'var(--text-secondary)' }}>
                    How would you like to login?
                </p>

                <SegmentedControl
                    value={loginMethod}
                    onValueChange={(val) => setLoginMethod(val as 'imd' | 'mobile')}
                    className='w-full'
                >
                    <SegmentedControlItem value='imd' className='flex-1 py-3'>
                        IMD Code
                    </SegmentedControlItem>
                    <SegmentedControlItem value='mobile' className='flex-1 py-3'>
                        Mobile Number
                    </SegmentedControlItem>
                </SegmentedControl>
            </div>

            {loginMethod === 'imd' ? <ImdLoginForm /> : <MobileLoginForm />}

            <div className='mt-4 text-center text-md mb-4' style={{ color: 'var(--text-secondary)' }}>
                Can’t login? <span onClick={() => navigate('/login/help', { state: { persona: 'agent' } })} className='font-normal text-[#004E91] cursor-pointer'>Get Help</span>
            </div>
        </div>
    );
};
