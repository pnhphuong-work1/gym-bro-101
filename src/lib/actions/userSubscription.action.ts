'use server';

import {getAxiosClient, getAxiosClientWithToken} from "@/lib/utils";
import {
    BasePaginationResponseValue, BaseResponseValue,
    ErrorResponseValue,
    UserSubscriptionByUserResponseValue,
    UserSubscriptionResponseValue, WorkoutDaysResponseValue
} from "@/types";
import {getUserCredentials} from "@/lib/actions/login.action";
import {redirect} from "next/navigation";

const baseUrl = 'v2024-09-19/subscription-user'
export async function getUserSubscriptionByUserId(userId: string) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios.get<BaseResponseValue<UserSubscriptionByUserResponseValue>>(`${baseUrl}/${userId}/user-subscriptions`, {
            params: { userId }
        });

        return response.data; // Make sure this returns the right structure
    } catch (error: any) {
        return error.response.data as ErrorResponseValue; // Ensure this captures errors correctly
    }
}
export async function getAllWorkoutDaysByUserId(userId: string) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios.get<BaseResponseValue<WorkoutDaysResponseValue[]>>(
            `${baseUrl}/${userId}/workout-days`, {
            params: { userId }
        });
        return response.data; // Make sure this returns the right structure
    } catch (error: any) {
        return error.response.data as ErrorResponseValue; // Ensure this captures errors correctly
    }
}