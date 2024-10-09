export interface BaseResponseValue<T> {
    error: {
        code: number;
        message: string;
    },
    isSuccess: boolean;
    isFailure: boolean;
    value: T;
}

export interface ErrorResponseValue {
    type: string;
    title: string;
    status: number;
    detail: string;
    errors: [{
        code: string;
        message: string;
    }]
}

export interface AuthResponseValue {
    accessToken: string;
    refreshToken: string;
    role: string;
    fullName: string;
    AccessTokenExpiration: Date;
    RefreshTokenExpiration: Date;
}

export interface UserResponseValue {
    id: string;
    email: string;
    userName: string;
    fullName: string;
    phoneNumber: string;
}