'use server';

import {getAxiosClient} from "@/lib/utils";
import {
    BasePaginationResponseValue, BaseResponseValue,
    ErrorResponseValue,
    UserSubscriptionByUserResponseValue,
    UserSubscriptionResponseValue, WorkoutDaysResponseValue
} from "@/types";

const baseUrl = 'v2024-09-19/subscription-user'
export async function getUserSubscriptionByUserId(userId: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios.get<UserSubscriptionByUserResponseValue>(`${baseUrl}/${userId}/user-subscriptions`);

        return response.data; // Make sure this returns the right structure
    } catch (error: any) {
        return error.response.data as ErrorResponseValue; // Ensure this captures errors correctly
    }
}
export async function getAllWorkoutDaysByUserId(userId: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios.get<BaseResponseValue<WorkoutDaysResponseValue[]>>(
            `${baseUrl}/${userId}/workout-days`);
        console.log("response: ",response);
        return response.data; // Make sure this returns the right structure
    } catch (error: any) {
        return error.response.data as ErrorResponseValue; // Ensure this captures errors correctly
    }
}