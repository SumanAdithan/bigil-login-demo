import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@atlas-ds/react';
import { FormField, FormLabel, FormInput, FormMessage } from '@atlas-ds/react';

const mobileSchema = z.object({
    mobileNumber: z.union([
        z.string().regex(/^\d{10}$/, 'Mobile Number must be exactly 10 digits'),
        z.literal(''),
    ]),
});

type MobileSchema = z.infer<typeof mobileSchema>;

export const MobileLoginForm = () => {
    const navigate = useNavigate();
    const methods = useForm<MobileSchema>({
        resolver: zodResolver(mobileSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            mobileNumber: '',
        },
    });

    const { control, handleSubmit, watch } = methods;

    const mobileValue = watch('mobileNumber');
    // High-fidelity activation logic: Button only enables when exactly 10 digits are entered
    const isFormFilled = mobileValue?.length === 10;

    const onSubmit = (data: MobileSchema) => {
        console.log('Mobile Login Data:', data);
        navigate('/login/otp');
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col' autoComplete='off'>
                <Controller
                    name='mobileNumber'
                    control={control}
                    render={({ field }) => (
                        <FormField className='w-full' isError={!!methods.formState.errors.mobileNumber}>
                            <FormLabel
                                className='mb-1.5 text-sm font-medium'
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Enter Mobile Number
                            </FormLabel>
                            <div className='relative flex w-full items-center'>
                                <FormInput
                                    {...field}
                                    placeholder='+91-'
                                    className='w-full border-gray-200 py-6 pl-16'
                                    autoComplete='off'
                                />
                            </div>
                            <FormMessage>{methods.formState.errors.mobileNumber?.message}</FormMessage>
                        </FormField>
                    )}
                />

                <Button
                    type='submit'
                    disabled={!isFormFilled}
                    fullWidth
                    className='mt-8 font-medium shadow-xs transition-opacity'
                >
                    Proceed
                </Button>
            </form>
        </FormProvider>
    );
};
