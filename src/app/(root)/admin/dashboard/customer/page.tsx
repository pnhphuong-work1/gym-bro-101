import React from 'react';
import AdminDashboardNav from "@/components/shared/navbar/AdminDashboardNav";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";

const CustomerPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
            <AdminDashboardNav/>
            <CustomerDashboard />
        </div>
    );
};

export default CustomerPage;