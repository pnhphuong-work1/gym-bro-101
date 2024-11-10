'use server';

import {getAxiosClient, getAxiosClientWithToken} from "@/lib/utils";
import {
    BasePaginationResponseValue,
    BaseResponseValue,
    DayGroupResponseValue,
    ErrorResponseValue,
    SubscriptionResponseValue
} from "@/types";
import {getUserCredentials} from "@/lib/actions/login.action";
import {redirect} from "next/navigation";

const baseUrl = 'v2024-09-19/subscriptions';
export async function getAllSubscriptions(search?: string, searchBy?: string, sortOrder?: string, sortBy?: string, currentPage?: number, pageSize?: number) {
    const axios = getAxiosClient();
    try{
        const response = await axios
            .get<BasePaginationResponseValue<SubscriptionResponseValue>>(baseUrl, {
                params: {
                    search,
                    searchBy,
                    sortOrder : "desc",
                    sortBy : "price",
                    currentPage: 1,
                    pageSize: 3
                }
            });

        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}
export async function getSubscriptionById(id: string) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios.get<SubscriptionResponseValue>(`${baseUrl}/${id}`);
        return response.data;
    } catch (error: any) {
        return error.response ? error.response.data : { error: "Unknown error" }; // Ensure a valid response is returned
    }
}

export async function createSubscription({name, totalWorkoutTime, price, totalMonth, group}: {name: string, totalWorkoutTime: string, price: number, totalMonth: number, group: string}) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios.post<BaseResponseValue<any>>(baseUrl, {
            name,
            totalWorkoutTime,
            price,
            totalMonth,
            group
        });
        return response.data;
    } catch (error: any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function deleteSubscription(id: string) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        console.log("del subs in axios", id);
        const res = await axios.delete<BaseResponseValue<any>>(`${baseUrl}/${id}`);
        return res.data;
    } catch (error: any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function updateSubscription(
    {name, totalWorkoutTime, price, totalMonth, group}
        : {name: string, totalWorkoutTime: string, price: number, totalMonth: number, group: string}, id: string) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios.put<BaseResponseValue<any>>(`${baseUrl}/${id}`, {
            name,
            totalWorkoutTime,
            price,
            totalMonth,
            group
        });
        return response.data;
    } catch (error: any) {
        return error.response.data as ErrorResponseValue;
    }
}

//fetch day group
export async function fetchDayGroup() {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios.get<BasePaginationResponseValue<DayGroupResponseValue>>(`/v2024-09-19/dayGroups`);
        return response.data;
    } catch (error: any) {
        return error.response.data as ErrorResponseValue;
    }
}