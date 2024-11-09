import React, { useEffect, useState } from 'react';
import Chart from "@/components/ui/chart";
import { getRevenueByMonth } from "@/lib/actions/revenue.action";
import { isErrorResponseValue } from "@/lib/utils";

const RevenueChart = () => {
    const [weeklyRevenue, setWeeklyRevenue] = useState([]);
    const [totalMember, setTotalMember] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const now = new Date();
    const month = now.getMonth() + 1; // Adding 1 because getMonth() returns 0-based index
    const year = now.getFullYear();

    useEffect(() => {
        setLoading(true);
        getRevenueByMonth(month, year)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setTotalMember(response.value.totalMember);
                    setTotalRevenue(response.value.totalRevenue);
                    setWeeklyRevenue(response.value.weeklyRevenue);
                }
            })
            .catch((error) => {
                console.log(error);
                setError("Failed to fetch revenue data.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const formatCurrencyVND = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <>
                    {/* Statistic Boxes */}
                    <div className="flex justify-around mb-4">
                        <div className="bg-blue-100 p-4 rounded-lg text-center shadow-md w-1/2 mx-2">
                            <h2 className="text-lg font-semibold">Total Members</h2>
                            <p className="text-2xl font-bold">{totalMember}</p>
                        </div>
                        <div className="bg-green-100 p-4 rounded-lg text-center shadow-md w-1/2 mx-2">
                            <h2 className="text-lg font-semibold">Total Revenue</h2>
                            <p className="text-2xl font-bold">{formatCurrencyVND(totalRevenue)}</p>
                        </div>
                    </div>

                    {/* Chart Component */}
                    <Chart weeklyRevenue={weeklyRevenue} />
                </>
            )}
        </div>
    );
};

export default RevenueChart;
