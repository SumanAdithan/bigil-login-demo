import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/auth/Layout';
import { DesignationSelect } from '../pages/auth/DesignationSelect';
import { AgentLogin } from '../pages/auth/AgentLogin';
import { VerifyOtp } from '../pages/auth/VerifyOtp';
import { GetHelp } from '../pages/auth/GetHelp';
import { RmLogin } from '../pages/auth/RmLogin';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';
import { PasswordSuccess } from '../pages/auth/PasswordSuccess';
import { DashboardRoutes } from './DashboardRoutes';

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<DesignationSelect />} />
                    <Route path='/auth/agent' element={<AgentLogin />} />
                    <Route path='/auth/otp' element={<VerifyOtp />} />
                    <Route path='/auth/help' element={<GetHelp />} />
                    <Route path='/auth/rm' element={<RmLogin />} />
                    <Route path='/auth/forgot-password' element={<ForgotPassword />} />
                    <Route path='/auth/reset-password' element={<ResetPassword />} />
                    <Route path='/auth/reset-success' element={<PasswordSuccess />} />
                </Route>
                <Route path='/dashboard/*'>{DashboardRoutes()}</Route>
            </Routes>
        </BrowserRouter>
    );
};
