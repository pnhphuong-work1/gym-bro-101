import React from 'react';
import ManagerSideNav from "@/components/shared/sidenav/ManagerSiveNav";
import CheckLogDashboard from "@/components/dashboard/CheckLogDashboard";

const CheckLogPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
            <ManagerSideNav />

            {/* Main content */}
            <div>
               <CheckLogDashboard />
            </div>

        </div>
    );
};

export default CheckLogPage;