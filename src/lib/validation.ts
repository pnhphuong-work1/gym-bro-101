import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Please enter a password"),
})

export const RegisterSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Please enter a password"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    phoneNumber: z.string().min(1, "Please enter a phone number"),
    fullName: z.string().min(1, "Please enter your full name"),
    dob: z.date({
        message: "Please enter a valid date of birth",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Show error under confirmPassword field
    message: "Passwords do not match",
});

export const CreateSubscriptionSchema = z.object({
    name: z.string().min(1, "Please enter a name"),
    totalWorkoutTime: z.string().min(1, "Please enter a total workout time"),
    price: z.preprocess((value) => parseFloat(value as string), z.number().min(0, "Please enter a price")),
    totalMonth: z.number().min(1, "Please enter a total month"),
    group: z.string().min(1, "Please enter a group"),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email"),
})

export const VerifyEmailSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    token: z.string().min(1, "Please enter a token"),
});

export const RenewPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    token: z.string().min(1, "Please enter a token"),
    newPassword: z.string().min(1, "Please enter a new password"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"], // Show error under confirmPassword field
    message: "Passwords do not match",
})

export const UpdateUserSchema = z.object({
    id: z.string().min(1, "Please enter a valid id"),
    email: z.string().email("Please enter a valid email"),
    fullName: z.string().min(1, "Please enter your full name"),
    phoneNumber: z.string().min(1, "Please enter a phone number"),
    dob: z.date({
        message: "Please enter a valid date of birth",
    }),
})