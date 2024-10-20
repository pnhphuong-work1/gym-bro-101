'use server';

import {getAxiosClient} from "@/lib/utils";
import {
    BasePaginationResponseValue,
    ErrorResponseValue,
    UserSubscriptionByUserResponseValue,
    UserSubscriptionResponseValue, WorkoutDaysResponseValue
} from "@/types";

const baseUrl = 'v2024-09-19/subscription-user'
export async function getUserSubscriptionByUserId(userId: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios.get<UserSubscriptionByUserResponseValue>(`${baseUrl}/${userId}/user-subscriptions`, {
            params: { userId }
        });

        return response.data; // Make sure this returns the right structure
    } catch (error: any) {
        return error.response.data as ErrorResponseValue; // Ensure this captures errors correctly
    }
}
export async function getAllWorkoutDaysByUserId(userId: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios.get<WorkoutDaysResponseValue>(
            `${baseUrl}/${userId}/workout-days`, {
            params: { userId }
        });
        return response.data; // Make sure this returns the right structure
    } catch (error: any) {
        return error.response.data as ErrorResponseValue; // Ensure this captures errors correctly
    }
}