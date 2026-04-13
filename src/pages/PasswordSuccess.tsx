import { useNavigate } from 'react-router-dom';
import { Button } from '@atlas-ds/react';
import { CircleCheck } from 'lucide-react';

export const PasswordSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className='mx-auto w-full max-w-md items-center justify-center pt-24'>
            {/* High-Fidelity Success Icon */}

            <div className='flex justify-center'>
                <div className='mb-4 flex h-24 w-24 p-4 items-center justify-center rounded-full bg-green-50'>
                    <CircleCheck className='h-14 w-14 text-green-600' />
                </div>
            </div>

            <div className='mb-10 text-center'>
                <h1
                    className='text-4xl font-medium tracking-tight leading-tight'
                    style={{ color: 'var(--text-primary)' }}
                >
                    Password Changed
                    <br />
                    Successfully!
                </h1>
            </div>

            <div className='w-full'>
                <Button fullWidth onClick={() => navigate('/')}>
                    Back to Login
                </Button>
            </div>
        </div>
    );
};
