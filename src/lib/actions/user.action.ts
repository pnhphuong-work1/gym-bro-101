'use server';

import {getAxiosClient} from "@/lib/utils";
import {BaseResponseValue, ErrorResponseValue, UserResponseValue} from "@/types";

export async function register({ email, password, dateOfBirth, fullName, confirmPassword } : { email: string, dateOfBirth: Date, password: string, fullName: string, confirmPassword: string }) {
    const axios = getAxiosClient();

    try {
        const response = await axios
            .post<BaseResponseValue<UserResponseValue>>('v2024-09-19/users', { email, fullName, dateOfBirth, password, confirmPassword });
    
        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function forgotPassword({ email } : { email: string }) {
    const axios = getAxiosClient();
    
    try {
        const response = await axios
            .post<BaseResponseValue<null>>('v2024-09-29/auth/forgot-password', { email });
        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function resetPassword({ email, token, newPassword, confirmPassword } : { email: string, token: string, newPassword: string, confirmPassword: string }) {
    const axios = getAxiosClient();
    try {
        const response = await axios
            .post<BaseResponseValue<null>>('v2024-09-29/auth/reset-password', { email, token, newPassword, confirmPassword });

        return response.data;

    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function verifyEmail({ email, token } : { email: string, token: string }) {
    const axios = getAxiosClient();
    try {
        const response = await axios
            .post<BaseResponseValue<null>>('v2024-09-29/auth/verify-email', { email, token });

        return response.data;

    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}