import React from 'react';
import AdminDashboardNav from "@/components/shared/navbar/AdminDashboardNav";
import RevenueDashboard from "@/components/dashboard/RevenueDashboard";

const Page = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
            <AdminDashboardNav/>
            <RevenueDashboard/>
        </div>
    );
};

export default Page;