import { Route } from 'react-router-dom';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { DashboardPage } from '../pages/dashboard/DashboardPage';

export const DashboardRoutes = () => {
    return (
        <Route element={<DashboardLayout />}>
            <Route index element={<DashboardPage />} />
            {/* Add more dashboard routes here */}
        </Route>
    );
};

export default DashboardRoutes;
