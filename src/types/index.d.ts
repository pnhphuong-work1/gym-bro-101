export interface BaseResponseValue<T> {
    error: {
        code: number;
        message: string;
    },
    isSuccess: boolean;
    isFailure: boolean;
    value: T;
}

export interface BasePaginationResponseValue<T> {
    value: {
        items: T[];
        pageIndex: number;
        pageSize: number;
        totalCount: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    },
    isSuccess: boolean;
    isFailure: boolean;
    error: {
        code: number;
        message: string;
    },
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
    accessTokenExpiration: Date;
    refreshTokenExpiration: Date;
}

export interface UserResponseValue {
    id: string;
    email: string;
    userName: string;
    fullName: string;
    phoneNumber: string;
    dateOfBirth: Date;
}

export interface CustomerResponseValue {
    id: string;
    email: string;
    userName: string;
    fullName: string;
    phoneNumber: string;
    dateOfBirth: Date;
    totalSpentTime: number;
    totalPayment: number;
    subscriptions: SubscriptionResponseValue[];
}
export interface SubscriptionResponseValue {
    id: string;
    name: string;
    totalWorkoutTime: string;
    price: number;
    dayGroupId: string;
    group: string;
}

export interface CheckLogResponseValue {
    id: string
    checkInId: string
    userSubscriptionId: string
    checkStatus: string
    workoutTime: string
    fullName: string
    createdAt: string
    userId: string
}