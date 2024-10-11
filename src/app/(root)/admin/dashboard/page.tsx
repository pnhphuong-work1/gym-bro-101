import React from 'react';
import AdminDashboardNav from "@/components/shared/navbar/AdminDashboardNav";

const DashboardPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-blue-200">
            <AdminDashboardNav />
        </div>
    );
};

export default DashboardPage;