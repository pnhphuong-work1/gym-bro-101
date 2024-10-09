'use server';

import {getAxiosClient} from "@/lib/utils";
import {BaseResponseValue, UserResponseValue} from "@/types";
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