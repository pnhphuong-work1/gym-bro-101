'use client';

import React, {useState} from 'react';
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {RenewPasswordSchema} from "@/lib/validation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {resetPassword} from "@/lib/actions/user.action";
import {isErrorResponseValue} from "@/lib/utils";

interface RenewPasswordFormProps {
    email: string;
    token: string;
}

const RenewPasswordForm = ({email, token} : RenewPasswordFormProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof RenewPasswordSchema>>({
        resolver: zodResolver(RenewPasswordSchema),
        defaultValues: {
            email: email,
            token: token,
            newPassword: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof RenewPasswordSchema>) {
        setIsSubmitting(true)
        try {
            const res = await resetPassword(values);

            if (!isErrorResponseValue(res)) {
                setMessage("Password reset successfully.");

                setInterval(() => {
                    router.push('/login');
                }, 3000);

                return;
            }
            setError(res.detail);
        } catch (error : any) {
            console.error(error.response)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input type="hidden" placeholder="" {...field} />
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
                                <Input readOnly={true} placeholder="Input your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Input your new password" {...field} />
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
                    {message}
                </FormMessage>

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
                    Back to {" "}
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

export default RenewPasswordForm;