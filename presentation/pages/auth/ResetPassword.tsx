import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormLabel, FormInput, FormMessage, Button } from '@atlas-ds/react';
import { Check } from 'lucide-react';
import { resetPasswordSchema } from '../../../domain/validations/auth_schemas';
import type { ResetPasswordData } from '../../../domain/entities/auth_entities';
import { authUseCases } from '../../../application/useCases/auth_use_cases';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<ResetPasswordData>({
        resolver: zodResolver(resetPasswordSchema),
        mode: 'onChange',
    });

    const passwordValue = watch('password', '');

    const requirements = [
        { label: 'At least one lowercase letter', met: /[a-z]/.test(passwordValue) },
        { label: 'Minimum 8 Characters', met: passwordValue.length >= 8 },
        { label: 'At least one uppercase letter', met: /[A-Z]/.test(passwordValue) },
        { label: 'At least one number', met: /[0-9]/.test(passwordValue) },
    ];

    const onSubmit = async (data: ResetPasswordData) => {
        const result = await authUseCases.resetPassword(data);
        if (result.success) {
            navigate(result.redirectTo);
        }
    };

    return (
        <div className='mx-auto flex w-full max-w-md flex-col'>
            <div className='mb-12 text-center'>
                <h1 className='text-4xl font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Enter New Password
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
                <div className='space-y-4'>
                    <FormField isError={!!errors.password}>
                        <FormLabel className='mb-1.5 text-sm' style={{ color: 'var(--text-secondary)' }}>
                            Enter New Password
                        </FormLabel>
                        <FormInput {...register('password')} type='password' placeholder='Enter New password' />
                    </FormField>

                    {/* Complexity Requirements List */}
                    <ul className='grid grid-cols-1 gap-y-2 pl-1'>
                        {requirements.map((req, index) => (
                            <li
                                key={index}
                                className='flex items-center gap-3 transition-colors duration-200'
                                style={{
                                    color: req.met ? '#4D7C0F' : passwordValue.length > 0 ? '#B91C1C' : '#64748B',
                                }}
                            >
                                <Check
                                    className={`h-4 w-4 transition-transform duration-200 ${req.met ? 'scale-110 opacity-100' : 'opacity-40'}`}
                                    style={{
                                        color: req.met ? '#65A30D' : passwordValue.length > 0 ? '#DC2626' : '#64748B',
                                    }}
                                    strokeWidth={3}
                                />
                                <span className='text-sm font-normal'>{req.label}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <FormField isError={!!errors.confirmPassword}>
                    <FormLabel className='mb-1.5 text-sm' style={{ color: 'var(--text-secondary)' }}>
                        Confirm New Password
                    </FormLabel>
                    <FormInput {...register('confirmPassword')} type='password' placeholder='Enter New password' />
                    <FormMessage>{errors.confirmPassword?.message}</FormMessage>
                </FormField>

                <div className='flex flex-col gap-4 pt-4'>
                    <Button type='submit' fullWidth disabled={!isValid}>
                        Reset Password
                    </Button>

                    <Button variant='secondaryGray' fullWidth onClick={() => navigate('/')}>
                        Back to login
                    </Button>
                </div>
            </form>
        </div>
    );
};
