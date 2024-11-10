import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from "axios";
import {ErrorResponseValue} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAxiosClient() {
  return axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL,
    baseURL: "https://vk2pgym.azurewebsites.net/api/",
    headers: {
        "Content-Type": "application/json",
    }
  })
}

export function getAxiosClientWithToken(token: string) {
    return axios.create({
        // baseURL: process.env.NEXT_PUBLIC_API_URL,
        baseURL: "https://vk2pgym.azurewebsites.net/api/",
        headers: {
          "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
}

export function isErrorResponseValue(value: any): value is ErrorResponseValue {
  return value.type !== undefined && value.title !== undefined && value.status !== undefined && value.detail !== undefined;
}

export function formatDateTime(isoString: string): string {
    const date = new Date(isoString);

    // Extract hours and minutes
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    // Extract day, month, and year
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();

    // Return formatted string
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}

export function formatDurationToHour(duration: string|null): string {
    if (duration === null) {
        return "";
    }
    const [hours, minutes] = duration.split(':');
    // Return formatted string
    return `${hours}:${minutes} hour(s)`;
}