import {
    BaseResponseValue,
    ErrorResponseValue,
    PaymentResponseReturnValue,
    PaymentResponseValue,
} from "@/types";
import {getAxiosClient, getAxiosClientWithToken} from "@/lib/utils";
import {getUserCredentials} from "@/lib/actions/login.action";
import {redirect} from "next/navigation";

const baseUrl = "/v2024-09-29/payments"; // Relative path

export async function createPayment(userId: string, subscriptionId: string) {
    const axios = getAxiosClient();
    try {
        const response = await axios.post<BaseResponseValue<PaymentResponseValue>>(`${baseUrl}`, { userId, subscriptionId });
        return response.data;
    } catch (error: any) {
        return error.response.data as ErrorResponseValue;
    }
}


export async function createPaymentReturn({ code, id, cancel, status, orderCode, subscriptionId } : { code: string, id: string, cancel: boolean, status: string, orderCode: number, subscriptionId: string}) {
    const axiosClient = getAxiosClient(); // Use the configured axios client

    try {
        const response = await axiosClient.post<BaseResponseValue<PaymentResponseReturnValue>>(`${baseUrl}/payment-return`, { code, id, cancel, status, orderCode, subscriptionId });
        return response.data;
    } catch (error : any) {
        return error.response.data as ErrorResponseValue;
    }
}