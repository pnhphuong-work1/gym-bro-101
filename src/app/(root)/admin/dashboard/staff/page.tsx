import React from 'react';
import AdminDashboardNav from "@/components/shared/navbar/AdminDashboardNav";
import ManagerDashboard from "@/components/dashboard/ManagerDashboard";

const DashboardPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
            <AdminDashboardNav />
            <ManagerDashboard />
        </div>
    );
};

export default DashboardPage;