'use server';

import {getAxiosClient} from "@/lib/utils";
import {BasePaginationResponseValue, ErrorResponseValue, SubscriptionResponseValue} from "@/types";

export async function getAllSubscriptions(search?: string, searchBy?: string, sortOrder?: string, sortBy?: string, currentPage?: number, pageSize?: number) {
    const axios = getAxiosClient();
    try{
        const response = await axios
            .get<BasePaginationResponseValue<SubscriptionResponseValue>>('v2024-09-19/subscriptions', {
                params: {
                    search,
                    searchBy,
                    sortOrder : "desc",
                    sortBy : "price",
                    currentPage,
                    pageSize
                }
            });

        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}
export async function getSubscriptionById(id: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios.get<SubscriptionResponseValue>(`v2024-09-19/subscriptions/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response ? error.response.data : { error: "Unknown error" }; // Ensure a valid response is returned
    }
}