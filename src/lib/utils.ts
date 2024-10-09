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
    baseURL: "https://localhost:7294/api/",
    headers: {
        "Content-Type": "application/json",
    }
  })
}

export function isErrorResponseValue(value: any): value is ErrorResponseValue {
  return value.type !== undefined && value.title !== undefined && value.status !== undefined && value.detail !== undefined;
}