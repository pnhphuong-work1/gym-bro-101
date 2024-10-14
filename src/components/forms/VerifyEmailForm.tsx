'use client';

import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {VerifyEmailSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {verifyEmail} from "@/lib/actions/user.action";
import {isErrorResponseValue} from "@/lib/utils";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import {useRouter} from "next/navigation";

interface VerifyEmailFormProps {
    email: string;
    token: string;
}

const VerifyEmailForm = ({email, token} : VerifyEmailFormProps) => {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof VerifyEmailSchema>>({
        resolver: zodResolver(VerifyEmailSchema),
        defaultValues: {
            email: email,
            token: token
        },
    })

    async function onSubmit(values: z.infer<typeof VerifyEmailSchema>) {
        setIsSubmitting(true)
        try {
            const res = await verifyEmail(values);

            if (!isErrorResponseValue(res)) {
                setMessage("Verification successful.");

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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input readOnly={true} placeholder="" {...field} />
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
                    {isSubmitting ? <LoadingSpinner/> : "Verify"}
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

export default VerifyEmailForm;