import * as z from 'zod';

export const passwordSchema = z
    .string()
    .min(8, 'Minimum 8 Characters')
    .regex(/[a-z]/, 'At least one lowercase letter')
    .regex(/[A-Z]/, 'At least one uppercase letter')
    .regex(/[0-9]/, 'At least one number');

export const imdSchema = z.object({
    imdCode: z.union([z.string().length(7, 'IMD Code must be exactly 7 digits'), z.literal('')]),
    password: z.union([z.string().min(1, 'Password is required'), z.literal('')]),
});

export const mobileSchema = z.object({
    mobileNumber: z.union([z.string().regex(/^\d{10}$/, 'Mobile Number must be exactly 10 digits'), z.literal('')]),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z
    .object({
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword'],
    });
