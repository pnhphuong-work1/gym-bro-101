'use client';

import React, {useState} from 'react';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {RegisterSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {register} from "@/lib/actions/user.action";

const RegisterForm = () => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            fullName: "",
        },
    })

    async function onSubmit(values: z.infer<typeof RegisterSchema>) {
        setIsSubmitting(true)
        try {
            // Add your register logic here
            const res = await register(values);

            if (res && res.isSuccess) {
                router.push('/login');
                return;
            }

            setError(res.error.message);
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Input your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Input your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Input your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Confirm your password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormMessage>
                    {error}
                </FormMessage>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <LoadingSpinner/> : "Submit"}
                </Button>

                <FormMessage className="text-center text-black">
                    Already have an account?
                    <Link
                        className="text-blue-500 p-2 hover:underline"
                        href={"/login"}
                    >
                        Login
                    </Link>
                </FormMessage>
            </form>
        </Form>
    );
};

export default RegisterForm;