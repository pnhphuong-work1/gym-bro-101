import {getAxiosClient} from "@/lib/utils";
import {BaseResponseValue, RevenueResponseValue, SubscriptionResponseValue} from "@/types";

const baseUrl = "/v2024-09-29/revenues";
export async function getRevenueByMonth(month: number, year: number) {
    const axios = getAxiosClient();
    try {
        const response = await axios.get<BaseResponseValue<RevenueResponseValue>>(`${baseUrl}?Month=${month}&Year=${year}`);
        return response.data;
    } catch (error: any) {
        return error.response ? error.response.data : { error: "Unknown error" }; // Ensure a valid response is returned
    }
}