'use server'

import {getAxiosClient, isErrorResponseValue} from "@/lib/utils";
import {AuthResponseValue, BaseResponseValue, ErrorResponseValue} from "@/types";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function login({ email, password } : { email: string, password: string }) {
    const axios = getAxiosClient();

    try {
        const response = await axios
            .post<BaseResponseValue<AuthResponseValue>>('v2024-09-29/auth/login', { email, password });

        if (response.status === 200) {
            cookies().set('tokens', JSON.stringify(response.data.value), {
               path: '/',
                // Set the expiration date to 3 hours
                expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
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
        const response = await axios.post<BaseResponseValue<AuthResponseValue>>(
            'v2024-09-29/auth/refresh-token',
            {
                accessToken,
                refreshToken,
            }
        );

        if (response.status === 200) {
            cookies().set('tokens', JSON.stringify(response.data.value), {
                path: '/',
                // Set the expiration date to 3 hours
                expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
            });
        }

        return response.data;
    } catch (error: any) {
        if (error.response?.status === 400) {
            redirect('/login'); // Redirect server-side to login
        }
        return error.response?.data as ErrorResponseValue;
    }
}

export async function getUserCredentials(allowRedirect: boolean = true) {
    const cookieStore = cookies();  // Using next/headers cookies API on the server side
    const credentials = cookieStore.get('tokens')?.value;

    if (credentials) {
        const cre = JSON.parse(credentials) as AuthResponseValue;

        // Convert accessTokenExpiration and refreshTokenExpiration to Date objects
        const expirationDate = new Date(cre.accessTokenExpiration);
        const refreshTokenExpiration = new Date(cre.refreshTokenExpiration);

        if (expirationDate.getTime() < Date.now()) {
            // If access token expired, check if the refresh token is still valid
            if (refreshTokenExpiration.getTime() > Date.now()) {
                const res = await silentLogin(cre.accessToken, cre.refreshToken);
                if (!isErrorResponseValue(res)) return res.value;
            } else {
                // If both tokens expired, redirect to login page
                if (allowRedirect)
                    redirect('/login');  // Use Next.js server-side redirect

                return null;
            }
        }

        // If tokens are valid, return credentials
        return cre;
    }

    if (allowRedirect)
        redirect('/login');  // Redirect to login page if no tokens found

    return null;
}
