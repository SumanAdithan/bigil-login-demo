import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormField, FormLabel, FormInput, FormMessage, Button } from '@atlas-ds/react';
import { ChevronLeft } from 'lucide-react';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'onSubmit',
    });

    const onSubmit = (data: ForgotPasswordFormValues) => {
        console.log('Generate OTP for:', data.email);
        // Mock success transition to OTP
        navigate('/login/otp', { state: { persona: 'agent', recovery: true } });
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

            <div className='mb-12 text-center'>
                <h1 className='text-4xl font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Enter Email ID
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <FormField isError={!!errors.email}>
                    <FormLabel className='mb-1.5 text-sm' style={{ color: 'var(--text-secondary)' }}>
                        Enter Email ID
                    </FormLabel>
                    <FormInput
                        {...register('email')}
                        type='email'
                        placeholder='olivia@untitledui.com'
                        className='w-full border-gray-200 py-6'
                    />
                    <FormMessage>{errors.email?.message}</FormMessage>
                </FormField>

                <div className='flex flex-col gap-4'>
                    <Button type='submit' fullWidth disabled={!isValid}>
                        Generate OTP
                    </Button>

                    <Button variant='secondaryGray' fullWidth onClick={() => navigate('/login/agent')}>
                        Back to Login
                    </Button>
                </div>
            </form>
        </div>
    );
};
