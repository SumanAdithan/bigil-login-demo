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
        <div className='mx-auto flex w-[400px] flex-col items-center justify-center pt-[20px]'>
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className='mb-8 flex items-center gap-1 text-sm transition-colors hover:text-gray-900 cursor-pointer self-start'
                style={{ color: 'var(--text-secondary)' }}
            >
                <ChevronLeft className='h-4 w-4' /> Back
            </button>

            <div className='w-full flex flex-col items-center'>
                <h1 className='mb-6 text-4xl font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Enter Login Details
                </h1>

                <p className='mb-2 text-left text-md self-start' style={{ color: 'var(--text-secondary)' }}>
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

            <div className='w-full mt-[32px]'>{loginMethod === 'imd' ? <ImdLoginForm /> : <MobileLoginForm />}</div>

            {/* Footer */}
            <div className='text-md text-center mt-2 mb-2' style={{ color: 'var(--text-secondary)' }}>
                Can’t login?{' '}
                <span
                    onClick={() => navigate('/login/help', { state: { persona: 'agent' } })}
                    className='text-[#004E91] cursor-pointer'
                >
                    Get Help
                </span>
            </div>
        </div>
    );
};
