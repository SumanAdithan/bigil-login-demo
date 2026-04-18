import type {
    ImdLoginData,
    MobileLoginData,
    ForgotPasswordData,
    ResetPasswordData,
} from '../../domain/entities/auth_entities';
import { authRepository } from '../../infrastructure/repository/auth_repository';

/**
 * Use cases for Authentication flows.
 * These orchestrate the flow by calling the designated repository.
 */
export const authUseCases = {
    loginWithImd: async (data: ImdLoginData) => {
        console.log('Application: loginWithImd');
        const result = await authRepository.loginWithImd(data);
        return { success: result.success, redirectTo: '/auth/otp' };
    },

    loginWithMobile: async (data: MobileLoginData) => {
        console.log('Application: loginWithMobile');
        const result = await authRepository.loginWithMobile(data);
        return { success: result.success, redirectTo: '/auth/otp' };
    },

    generateOtp: async (data: ForgotPasswordData) => {
        console.log('Application: generateOtp');
        const result = await authRepository.generateOtp(data);
        return { success: result.success, redirectTo: '/auth/otp', state: { recovery: true } };
    },

    verifyOtp: async (otp: string, isRecovery: boolean) => {
        console.log('Application: verifyOtp');
        const result = await authRepository.verifyOtp(otp);
        const redirectTo = isRecovery ? '/auth/reset-password' : '/dashboard';
        return { success: result.success, redirectTo };
    },

    resetPassword: async (data: ResetPasswordData) => {
        console.log('Application: resetPassword');
        const result = await authRepository.resetPassword(data);
        return { success: result.success, redirectTo: '/auth/reset-success' };
    },
};
