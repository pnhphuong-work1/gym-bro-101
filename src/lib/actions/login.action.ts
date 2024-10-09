'use server'

import {getAxiosClient} from "@/lib/utils";
import {AuthResponseValue, BaseResponseValue} from "@/types";
import * as https from "node:https";
import {cookies} from "next/headers";

export async function login({ email, password } : { email: string, password: string }) {
    const axios = getAxiosClient();
    // Create an HTTPS agent that disables SSL certificate validation
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false, // Disable SSL certificate validation
    });
    const response = await axios
        .post<BaseResponseValue<AuthResponseValue>>('v2024-09-29/auth/login', { email, password }, { httpsAgent });


    if (response.status === 200) {
        cookies().set('tokens', JSON.stringify(response.data.value), {
           path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days
        });
    }

    return response.data;
}

export async function getUserCredentials() {
    const credentials = cookies().get("tokens")?.value;
    if (credentials) {
        return JSON.parse(credentials) as AuthResponseValue;
    }
    return null
}
