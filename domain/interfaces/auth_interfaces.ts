import type { 
    ImdLoginData, 
    MobileLoginData, 
    ForgotPasswordData, 
    ResetPasswordData 
} from '../entities/auth_entities';

/**
 * Interface definition for Authentication Repository.
 * Following Clean Architecture, the Domain layer defines the requirements.
 */
export interface IAuthRepository {
    loginWithImd(data: ImdLoginData): Promise<{ success: boolean; data?: any }>;
    loginWithMobile(data: MobileLoginData): Promise<{ success: boolean; data?: any }>;
    generateOtp(data: ForgotPasswordData): Promise<{ success: boolean; data?: any }>;
    verifyOtp(otp: string): Promise<{ success: boolean; data?: any }>;
    resetPassword(data: ResetPasswordData): Promise<{ success: boolean; data?: any }>;
}
