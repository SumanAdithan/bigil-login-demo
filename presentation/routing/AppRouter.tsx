import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { DesignationSelect } from '../pages/DesignationSelect';
import { AgentLogin } from '../pages/AgentLogin';
import { VerifyOtp } from '../pages/VerifyOtp';
import { GetHelp } from '../pages/GetHelp';
import { RmLogin } from '../pages/RmLogin';
import { ForgotPassword } from '../pages/ForgotPassword';
import { ResetPassword } from '../pages/ResetPassword';
import { PasswordSuccess } from '../pages/PasswordSuccess';

export const AppRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/' element={<DesignationSelect />} />
                    <Route path='/login/agent' element={<AgentLogin />} />
                    <Route path='/login/otp' element={<VerifyOtp />} />
                    <Route path='/login/help' element={<GetHelp />} />
                    <Route path='/login/rm' element={<RmLogin />} />
                    <Route path='/login/forgot-password' element={<ForgotPassword />} />
                    <Route path='/login/reset-password' element={<ResetPassword />} />
                    <Route path='/login/reset-success' element={<PasswordSuccess />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
