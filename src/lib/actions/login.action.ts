'use server'

import {getAxiosClient, getAxiosClientWithToken, isErrorResponseValue} from "@/lib/utils";
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

export async function logout() {
    const credentials = await getUserCredentials();
    if (!credentials) {
        // Already logged out, just redirect to login
        return true;
    }
    const axios = getAxiosClientWithToken(credentials.accessToken);

    try {
        await axios.post<BaseResponseValue<null>>('v2024-09-29/auth/logout', {
            accessToken: credentials.accessToken,
        });

        // Delete the token
        cookies().set('tokens', {
            path: '/', // Ensure the path matches the cookie creation path
            maxAge: 0, // This will force the cookie to be deleted
        });
        //localStorage.removeItem('authToken');

        // You may also want to clear any client-side data here
        // For example, if you use local storage, you can clear it:
        // localStorage.clear();

    } catch (error: any) {
       // throw error
        console.error(error);
        return false;
    }

    return true;
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

export async function getUserCredentials() {
    const cookieStore = cookies();  // Using next/headers cookies API on the server side
    const credentials = cookieStore.get('tokens')?.value;

    if (credentials) {
        const cre = JSON.parse(credentials) as AuthResponseValue;

        const expirationDate = new Date(cre.accessTokenExpiration);
        const refreshTokenExpiration = new Date(cre.refreshTokenExpiration);

        if (expirationDate.getTime() < Date.now()) {
            if (refreshTokenExpiration.getTime() > Date.now()) {
                const res = await silentLogin(cre.accessToken, cre.refreshToken);
                if (!isErrorResponseValue(res)) return res.value;
            } else {
                return null;
            }
        }
        return cre; // Return credentials if valid
    }

    return null; // No tokens found
}
