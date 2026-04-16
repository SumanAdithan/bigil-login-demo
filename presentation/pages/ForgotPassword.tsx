import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormLabel, FormInput, FormMessage, Button } from '@atlas-ds/react';
import { ChevronLeft } from 'lucide-react';
import { forgotPasswordSchema } from '../../domain/validations/auth_schemas';
import type { ForgotPasswordData } from '../../domain/entities/auth_entities';
import { authUseCases } from '../../application/useCases/auth_use_cases';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ForgotPasswordData>({
        resolver: zodResolver(forgotPasswordSchema),
        mode: 'onSubmit',
    });

    const onSubmit = async (data: ForgotPasswordData) => {
        const result = await authUseCases.generateOtp(data);
        if (result.success) {
            navigate(result.redirectTo, { state: result.state });
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
                        placeholder='example@email.com'
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
