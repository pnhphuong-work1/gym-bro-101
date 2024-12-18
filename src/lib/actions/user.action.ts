'use server';

import {getAxiosClient, getAxiosClientWithToken} from "@/lib/utils";
import {
    BasePaginationResponseValue,
    BaseResponseValue,
    CustomerResponseValue,
    ErrorResponseValue,
    UserResponseValue
} from "@/types";
import {getUserCredentials} from "@/lib/actions/login.action";
import {redirect} from "next/navigation";

export async function register({ email, password, dob, fullName, confirmPassword, phoneNumber } : { email: string, dob: Date, password: string, fullName: string, confirmPassword: string, phoneNumber: string}) {
    const axios = getAxiosClient();
    // YYYY-MM-DD
    const dateOfBirth = dob.toISOString().split('T')[0];
    try {
        const response = await axios
            .post<BaseResponseValue<UserResponseValue>>('v2024-09-19/users', { email, fullName, dateOfBirth, password, confirmPassword, phoneNumber });
    
        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function createManager({ email, password, dob, fullName, confirmPassword, phoneNumber } : { email: string, dob: Date, password: string, fullName: string, confirmPassword: string, phoneNumber: string}) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    // YYYY-MM-DD
    const dateOfBirth = dob.toISOString().split('T')[0];
    try {
        const response = await axios
            .post<BaseResponseValue<UserResponseValue>>('v2024-09-19/managers', { email, fullName, dateOfBirth, password, confirmPassword, phoneNumber });

        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function updateUser({ id, email, fullName, dob, phoneNumber } : { id: string, email: string, fullName: string, dob: Date, phoneNumber: string }) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    // YYYY-MM-DD
    const dateOfBirth = dob.toISOString().split('T')[0];
    try {
        const response = await axios
            .put<BaseResponseValue<UserResponseValue>>(`v2024-09-19/users/${id}`, { email, fullName, dateOfBirth, phoneNumber });

        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function getCustomerById(id: string) {
    const axios = getAxiosClient();

    try {
        const response = await axios
            .get<BaseResponseValue<CustomerResponseValue>>(`v2024-09-19/users/${id}`);
        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function getManagerById(id: string) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);

    try {
        const response = await axios
            .get<BaseResponseValue<UserResponseValue>>(`v2024-09-19/managers/${id}`);
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

export async function getAllManagers(search?: string, searchBy?: string, sortOrder?: string, sortBy?: string, currentPage?: number, pageSize?: number) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios
            .get<BasePaginationResponseValue<UserResponseValue>>('v2024-09-19/managers', {
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

export async function getAllCustomers(search?: string, searchBy?: string, sortOrder?: string, sortBy?: string, currentPage?: number, pageSize?: number) {
    const axios = getAxiosClient();
    try {
        const response = await axios
            .get<BasePaginationResponseValue<CustomerResponseValue>>('v2024-09-19/users', {
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

export async function deleteUser(id: string) {
    const credentials = await getUserCredentials();
    if (!credentials) {
        redirect('/login');
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);
    try {
        const response = await axios
            .delete<BaseResponseValue<UserResponseValue>>(`v2024-09-19/users/${id}`);

        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}