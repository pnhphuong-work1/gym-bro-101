import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Please enter a password"),
})

export const RegisterSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Please enter a password"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    fullName: z.string().min(1, "Please enter your full name"),
}).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], // Show error under confirmPassword field
    message: "Passwords do not match",
});