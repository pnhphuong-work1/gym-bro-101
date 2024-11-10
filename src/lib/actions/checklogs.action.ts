'use server';

import {getAxiosClient, getAxiosClientWithToken} from "@/lib/utils";
import {
    BasePaginationResponseValue,
    BaseResponseValue,
    CheckLogResponseValue,
    ErrorResponseValue,
} from "@/types";
import {getUserCredentials} from "@/lib/actions/login.action";
import {redirect} from "next/navigation";

export async function getCheckLogById(id: string) {
    const axios = getAxiosClient();

    try {
        const response = await axios
            .get<BaseResponseValue<CheckLogResponseValue>>(`v2024-09-19/check-logs/${id}`);
        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}


export async function getAllCheckLogs(checkStatus?: string, timeFrame?: string, search?: string, searchBy?: string, sortOrder?: string, sortBy?: string, currentPage?: number, pageSize?: number) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios
            .get<BasePaginationResponseValue<CheckLogResponseValue>>('v2024-09-19/check-logs', {
                params: {
                    checkStatus,
                    timeFrame,
                    search,
                    searchBy,
                    sortOrder,
                    sortBy,
                    currentPage,
                    pageSize
                }
            });

        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}
export async function getAllCheckLogsByUserId(
    userId: string,
    checkStatus?: string,
    timeFrame?: string,
    search?: string,
    searchBy?: string,
    sortOrder?: string,
    sortBy?: string,
    currentPage?: number,
    pageSize?: number)
{
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios
            .get<BasePaginationResponseValue<CheckLogResponseValue>>(`v2024-09-19/check-logs/user/${userId}`, {
                params: {
                    userId,
                    checkStatus,
                    timeFrame,
                    search,
                    searchBy,
                    sortOrder,
                    sortBy,
                    currentPage,
                    pageSize
                }
            });

        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

