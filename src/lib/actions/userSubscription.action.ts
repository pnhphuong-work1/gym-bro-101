'use server';

import {getAxiosClient} from "@/lib/utils";
import {
    BasePaginationResponseValue,
    ErrorResponseValue,
    UserSubscriptionByUserResponseValue,
    UserSubscriptionResponseValue
} from "@/types";

const baseUrl = 'v2024-09-19/subscription-user'
export async function getUserSubscriptionByUserId(userId: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios.get<UserSubscriptionByUserResponseValue>(`${baseUrl}/user/${userId}`, {
            params: { userId }
        });

        return response.data; // Make sure this returns the right structure
    } catch (error: any) {
        return error.response.data as ErrorResponseValue; // Ensure this captures errors correctly
    }
}