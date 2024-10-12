'use server'

import {getAxiosClient, isErrorResponseValue} from "@/lib/utils";
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

export async function silentLogin(accessToken: string, refreshToken: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios
            .post<BaseResponseValue<AuthResponseValue>>('v2024-09-29/auth/refresh-token', {
                accessToken,
                refreshToken
            });

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
        const cre = JSON.parse(credentials) as AuthResponseValue;

        // Convert accessTokenExpiration to a Date object
        const expirationDate = new Date(cre.accessTokenExpiration);

        if (expirationDate.getTime() < Date.now()) {
            const res = await silentLogin(cre.accessToken, cre.refreshToken);
            if (!isErrorResponseValue(res)) return res.value;
        }

        return cre;
    }
    return null;
}
