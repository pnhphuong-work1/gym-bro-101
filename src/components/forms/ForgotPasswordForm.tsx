'use client';

import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {ForgotPasswordSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {isErrorResponseValue} from "@/lib/utils";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import {forgotPassword} from "@/lib/actions/user.action";

const ForgotPasswordForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: ""
        },
    })

    async function onSubmit(values: z.infer<typeof ForgotPasswordSchema>) {
        setIsSubmitting(true)
        try {
            const res = await forgotPassword(values);

            if (!isErrorResponseValue(res)) {
                setMessage("We have sent you an email to reset your password.");
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

export default ForgotPasswordForm;