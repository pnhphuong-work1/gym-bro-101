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
    userId: string;
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

export interface DayGroupResponseValue {
    id: string;
    group: string;
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
    totalMonth: number;
    group: string;
}
export interface UserSubscriptionResponseValue {
    id: string,
    userId: string,
    subscriptionId: string,
    paymentId: string,
    paymentPrice: number,
    workoutSteak: number,
    longestWorkoutSteak: number,
    lastWorkoutDate: string,
    subscriptionEndDate: string,
    group: string,
    totalWorkoutTime: string,
    name: string
}
export interface UserSubscriptionByUserResponseValue {
    value: UserSubscriptionResponseValue[];
    isSuccess: boolean;
    isFailure: boolean;
    error: {
        code: string;
        message: string;
    };
}
export interface PaymentResponseValue {
    id: string,
    bin: string,
    amount: number,
    payOsOrderId: number,
    description: string,
    paymentLinkId: string,
    checkoutUrl: string,
    status: string,
    qrCode: string,
}
export interface PaymentResponseReturnValue {
    id: string,
    paymentStatus: string,
    paymentDate: string,
    amount: number,
    userId: string,
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
    subscriptionName: string
    checkInTime: string
}
export interface WorkoutDaysResponseValue {
    title?: string;
    start: string;
}
export interface RevenueResponseValue{
    totalMember: number;
    totalRevenue: number;
    weeklyRevenue: [
        week: string,
        revenue: number,
    ]
}