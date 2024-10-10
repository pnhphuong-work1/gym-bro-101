import React from 'react';
import DashboardNav from "@/components/shared/navbar/DashboardNav";

const DashboardPage = () => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-blue-200">
            <DashboardNav />
        </div>
    );
};

export default DashboardPage;