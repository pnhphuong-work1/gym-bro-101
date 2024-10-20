import React from 'react';
import ManagerSideNav from "@/components/shared/sidenav/ManagerSiveNav";
import CustomerDashboard from "@/components/dashboard/CustomerDashboard";

const CustomerManagerPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
            <ManagerSideNav />
            <CustomerDashboard />
        </div>
    );
}

export default CustomerManagerPage;