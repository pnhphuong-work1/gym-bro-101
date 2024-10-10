'use server';

import {getAxiosClient} from "@/lib/utils";
import {BaseResponseValue, ErrorResponseValue, UserResponseValue} from "@/types";
import * as https from "node:https";

export async function register({ email, password, fullName, confirmPassword } : { email: string, password: string, fullName: string, confirmPassword: string }) {
    const axios = getAxiosClient();

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // Disable SSL certificate validation
    });
    const response = await axios
        .post<BaseResponseValue<UserResponseValue>>('v2024-09-19/users', { email, password, fullName, confirmPassword } , { httpsAgent });

    return response.data;
}

export async function forgotPassword({ email } : { email: string }) {
    const axios = getAxiosClient();

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // Disable SSL certificate validation
    });
    const response = await axios
        .post<BaseResponseValue<null>>('v2024-09-29/auth/forgot-password', { email } , { httpsAgent });

    return response.data;
}

export async function resetPassword({ email, token, newPassword, confirmPassword } : { email: string, token: string, newPassword: string, confirmPassword: string }) {
    const axios = getAxiosClient();

    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // Disable SSL certificate validation
    });
    try {
        const response = await axios
            .post<BaseResponseValue<null>>('v2024-09-29/auth/reset-password', { email, token, newPassword, confirmPassword } , { httpsAgent });

        return response.data;

    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}