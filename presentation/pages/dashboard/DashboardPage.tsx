import React from 'react';

export const DashboardPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <h1 className="text-4xl font-bold text-slate-800">dashboard</h1>
            <p className="mt-4 text-slate-600">Welcome to your standalone dashboard.</p>
        </div>
    );
};

export default DashboardPage;
