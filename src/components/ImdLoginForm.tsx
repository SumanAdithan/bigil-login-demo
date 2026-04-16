import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@atlas-ds/react';
import { FormField, FormLabel, FormInput, FormMessage } from '@atlas-ds/react';

const imdSchema = z.object({
    imdCode: z.union([z.string().length(7, 'IMD Code must be exactly 7 digits'), z.literal('')]),
    password: z.union([z.string().min(1, 'Password is required'), z.literal('')]),
});

type ImdSchema = z.infer<typeof imdSchema>;

export const ImdLoginForm = () => {
    const navigate = useNavigate();
    const methods = useForm<ImdSchema>({
        resolver: zodResolver(imdSchema),
        mode: 'onSubmit',
        reValidateMode: 'onSubmit',
        defaultValues: {
            imdCode: '',
            password: '',
        },
    });

    const { control, handleSubmit, watch } = methods;

    const imdValue = watch('imdCode');
    const passwordValue = watch('password');
    const isFormFilled = imdValue && passwordValue;

    const onSubmit = (data: ImdSchema) => {
        // Zod handles validation, but we can add manual triggers here if strictly needed
        console.log('IMD Login Data:', data);
        navigate('/login/otp');
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col' autoComplete='off'>
                <div className='flex flex-col gap-4'>
                    <Controller
                        name='imdCode'
                        control={control}
                        render={({ field }) => (
                            <FormField className='w-full' isError={!!methods.formState.errors.imdCode}>
                                <FormLabel className='mb-[2px] text-sm' style={{ color: 'var(--text-secondary)' }}>
                                    Enter IMD code
                                </FormLabel>
                                <FormInput
                                    {...field}
                                    placeholder='Enter code'
                                    className='w-full border-gray-200 py-6'
                                    autoComplete='off'
                                />
                                <FormMessage>{methods.formState.errors.imdCode?.message}</FormMessage>
                            </FormField>
                        )}
                    />

                    <Controller
                        name='password'
                        control={control}
                        render={({ field }) => (
                            <FormField className='w-full' isError={!!methods.formState.errors.password}>
                                <FormLabel className='mb-[2px] text-sm' style={{ color: 'var(--text-secondary)' }}>
                                    Enter Password
                                </FormLabel>
                                <FormInput
                                    {...field}
                                    type='password'
                                    placeholder='**************'
                                    className='w-full border-gray-200 py-6'
                                    autoComplete='off'
                                />
                                <FormMessage>{methods.formState.errors.password?.message}</FormMessage>
                            </FormField>
                        )}
                    />
                </div>

                <div className='text-right'>
                    <Button variant='link' type='button' onClick={() => navigate('/login/forgot-password')}>
                        Forgot Password
                    </Button>
                </div>

                <Button
                    type='submit'
                    disabled={!isFormFilled}
                    fullWidth
                    className='mt-[32px] font-medium shadow-xs transition-opacity'
                >
                    Proceed
                </Button>
            </form>
        </FormProvider>
    );
};
