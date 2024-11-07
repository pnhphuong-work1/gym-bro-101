import React from 'react';
import AdminDashboardNav from "@/components/shared/navbar/AdminDashboardNav";
import SubscriptionDashboard from "@/components/dashboard/SubscriptionDashboard";

const SubscriptionPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
            <AdminDashboardNav />
            <SubscriptionDashboard />
        </div>
    );
};

export default SubscriptionPage;