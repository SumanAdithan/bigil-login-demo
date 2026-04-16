import type { IAuthRepository } from '../../domain/interfaces/auth_interfaces';
import type { 
    ImdLoginData, 
    MobileLoginData, 
    ForgotPasswordData, 
    ResetPasswordData 
} from '../../domain/entities/auth_entities';
import { apiClient } from '../networkservice/api_client';

/**
 * Infrastructure Layer - Auth Repository Implementation
 * This class implements the IAuthRepository interface and handles the actual data fetching logic.
 */
export class AuthRepository implements IAuthRepository {
    async loginWithImd(data: ImdLoginData) {
        return await apiClient.post('/auth/login/imd', data);
    }

    async loginWithMobile(data: MobileLoginData) {
        return await apiClient.post('/auth/login/mobile', data);
    }

    async generateOtp(data: ForgotPasswordData) {
        return await apiClient.post('/auth/otp/generate', data);
    }

    async verifyOtp(otp: string) {
        return await apiClient.post('/auth/otp/verify', { otp });
    }

    async resetPassword(data: ResetPasswordData) {
        return await apiClient.post('/auth/password/reset', data);
    }
}

// Export a singleton instance
export const authRepository = new AuthRepository();
