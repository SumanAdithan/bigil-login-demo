import * as z from 'zod';
import { 
    imdSchema, 
    mobileSchema, 
    forgotPasswordSchema, 
    resetPasswordSchema 
} from '../validations/auth_schemas';

export type ImdLoginData = z.infer<typeof imdSchema>;
export type MobileLoginData = z.infer<typeof mobileSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;

export interface AuthState {
    isAuthenticated: boolean;
    user?: {
        persona: 'agent' | 'rm';
        mobileNumber?: string;
        email?: string;
    };
}
