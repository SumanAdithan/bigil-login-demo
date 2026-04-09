import * as React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, OtpInput } from '@atlas-ds/react';
import { ChevronLeft } from 'lucide-react';

export const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isRecovery = location.state?.recovery === true;
    const [otpValue, setOtpValue] = React.useState('');
    const [timeLeft, setTimeLeft] = React.useState(119); // 1:59 in seconds

    React.useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResend = () => {
        setTimeLeft(119); // Reset timer on resend
    };

    const handleOtpChange = (value: string) => {
        setOtpValue(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('OTP Submitted:', otpValue);
        if (isRecovery) {
            navigate('/login/reset-password');
        } else {
            navigate('/');
        }
    };

    return (
        <div className='mx-auto flex w-full max-w-md flex-col'>
            {/* Back Button */}
            <button
                onClick={() => navigate('/login/agent')}
                className='mb-8 flex items-center gap-1 text-sm transition-colors hover:text-gray-900 cursor-pointer'
                style={{ color: 'var(--text-secondary)' }}
            >
                <ChevronLeft className='h-4 w-4' /> Back
            </button>

            <div className='mb-10 text-center'>
                <h1 className='mb-2 text-4xl font-medium tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Verify OTP
                </h1>

                <p className='mb-2 px-4 text-md font-normal leading-relaxed' style={{ color: 'var(--text-secondary)' }}>
                    We've sent a 6-digit verification code to your registered mobile number ending with ****8765
                </p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col'>
                <OtpInput
                    value={otpValue}
                    onChange={handleOtpChange}
                    label='Enter 6 digit OTP'
                    maxLength={6}
                    hint={timeLeft > 0 ? `Code expires in ${formatTime(timeLeft)} mins` : 'Code expired'}
                    onResend={handleResend}
                    className='mb-4'
                />

                <Button
                    type='submit'
                    disabled={otpValue.length !== 6}
                    fullWidth
                    className='mt-4 font-normal shadow-xs transition-opacity'
                >
                    Submit
                </Button>
            </form>

            <div className='mt-4 text-center text-md' style={{ color: 'var(--text-secondary)' }}>
                Can’t login? <span onClick={() => navigate('/login/help', { state: { persona: 'agent' } })} className='font-normal text-[#004E91] cursor-pointer'>Get Help</span>
            </div>
        </div>
    );
};
