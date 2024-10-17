import React from 'react';
import ManagerSideNav from "@/components/shared/sidenav/ManagerSiveNav";
import CheckLogDashboard from "@/components/dashboard/CheckLogDashboard";

const CheckLogPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
            <ManagerSideNav />

            {/* Main content */}
            <div className="ml-32 w-full bg-gray-100 p-6 overflow-x-auto">
               <CheckLogDashboard />
            </div>

        </div>
    );
};

export default CheckLogPage;