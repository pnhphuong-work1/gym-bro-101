'use server'

import {getAxiosClient} from "@/lib/utils";
import {AuthResponseValue, BaseResponseValue, ErrorResponseValue} from "@/types";
import {cookies} from "next/headers";

export async function login({ email, password } : { email: string, password: string }) {
    const axios = getAxiosClient();

    try {
        const response = await axios
            .post<BaseResponseValue<AuthResponseValue>>('v2024-09-29/auth/login', { email, password });

        if (response.status === 200) {
            cookies().set('tokens', JSON.stringify(response.data.value), {
               path: '/',
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
            });
        }
        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}

export async function getUserCredentials() {
    const credentials = cookies().get("tokens")?.value;
    if (credentials) {
        return JSON.parse(credentials) as AuthResponseValue;
    }
    return null
}
