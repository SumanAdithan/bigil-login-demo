import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FormField, FormLabel, FormInput, FormMessage, Button } from '@atlas-ds/react';
import { ChevronLeft } from 'lucide-react';

const rmLoginSchema = z.object({
    employeeCode: z.string().min(4, 'Employee code must be at least 4 characters'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RmLoginFormValues = z.infer<typeof rmLoginSchema>;

export const RmLogin = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RmLoginFormValues>({
        resolver: zodResolver(rmLoginSchema),
        mode: 'onSubmit',
    });

    const onSubmit = (data: RmLoginFormValues) => {
        console.log('RM Login Submitted:', data);
        // Synchronized success transition to OTP verification
        navigate('/auth/otp');
    };

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
                <h1 className='text-4xl font-semibold tracking-tight' style={{ color: 'var(--text-primary)' }}>
                    Enter Login Details
                </h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                <FormField isError={!!errors.employeeCode}>
                    <FormLabel className='mb-1.5 text-sm' style={{ color: 'var(--text-secondary)' }}>
                        Enter Employee Code
                    </FormLabel>
                    <FormInput
                        {...register('employeeCode')}
                        placeholder='Enter Code'
                        className='w-full border-gray-200 py-6'
                    />
                    <FormMessage>{errors.employeeCode?.message}</FormMessage>
                </FormField>

                <div className='flex flex-col gap-1'>
                    <FormField isError={!!errors.password}>
                        <FormLabel className='mb-1.5 text-sm' style={{ color: 'var(--text-secondary)' }}>
                            Enter Password
                        </FormLabel>
                        <FormInput
                            {...register('password')}
                            type='password'
                            placeholder='**************'
                            className='w-full border-gray-200 py-6'
                        />
                        <FormMessage>{errors.password?.message}</FormMessage>
                    </FormField>
                    <div className='flex justify-end'>
                        <Button
                            type='button'
                            variant='link'
                            className='p-0 font-normal text-[#004E91]'
                            onClick={() => navigate('/auth/forgot-password')}
                        >
                            Forgot password?
                        </Button>
                    </div>
                </div>

                <div className='pt-4'>
                    <Button type='submit' fullWidth>
                        Proceed
                    </Button>
                </div>
            </form>

            <div className='mt-8 text-center text-md' style={{ color: 'var(--text-secondary)' }}>
                Can’t login?{' '}
                <Button
                    variant='link'
                    onClick={() => navigate('/auth/help', { state: { persona: 'rm' } })}
                    className='font-normal text-[#004E91] cursor-pointer'
                >
                    Get Help
                </Button>
            </div>
        </div>
    );
};
