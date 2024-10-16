'use server';

import {getAxiosClient} from "@/lib/utils";
import {
    BasePaginationResponseValue,
    BaseResponseValue,
    CheckLogResponseValue,
    ErrorResponseValue,
} from "@/types";

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


export async function getAllCheckLogs(search?: string, searchBy?: string, sortOrder?: string, sortBy?: string, currentPage?: number, pageSize?: number) {
    const axios = getAxiosClient();
    try {
        const response = await axios
            .get<BasePaginationResponseValue<CheckLogResponseValue>>('v2024-09-19/check-logs', {
                params: {
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
