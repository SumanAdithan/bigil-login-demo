import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@atlas-ds/react';
import { FormField, FormLabel, FormInput, FormMessage } from '@atlas-ds/react';
import { mobileSchema } from '../../domain/validations/auth_schemas';
import type { MobileLoginData } from '../../domain/entities/auth_entities';
import { authUseCases } from '../../application/useCases/auth_use_cases';

export const MobileLoginForm = () => {
    const navigate = useNavigate();
    const methods = useForm<MobileLoginData>({
        resolver: zodResolver(mobileSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            mobileNumber: '',
        },
    });

    const { control, handleSubmit, watch } = methods;

    const mobileValue = watch('mobileNumber');
    const isFormFilled = mobileValue?.length === 10;

    const onSubmit = async (data: MobileLoginData) => {
        const result = await authUseCases.loginWithMobile(data);
        if (result.success) {
            navigate(result.redirectTo);
        }
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
