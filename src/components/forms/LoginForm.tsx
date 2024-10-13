'use client'
import React, {useState} from 'react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {LoginSchema} from "@/lib/validation"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import {login} from "@/lib/actions/login.action";
import {useRouter} from "next/navigation";
import {useGlobalContext} from "@/context/GlobalContext";
import Link from "next/link";
import {isErrorResponseValue} from "@/lib/utils";

const LoginForm = () => {
    const router = useRouter();
    const {setRole, setFullName} = useGlobalContext();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        setIsSubmitting(true)
        try {
            const res = await login(values);

            if (!isErrorResponseValue(res)) {
                setRole(res.value.role);
                setFullName(res.value.fullName);
                router.push('/');
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
                            <p className="text-sm text-right">
                                <Link
                                    className="text-blue-500 p-2 hover:underline"
                                    href={"/forgot-password"
                                }>Forgot Password?</Link>
                            </p>
                        </FormItem>
                    )}
                />
                <FormMessage>
                    {error}
                </FormMessage>

                <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className='text-2xl text-white bg-red-500 w-full py-2'
                >
                    {isSubmitting ? <LoadingSpinner/> : "Login"}
                </Button>

                <FormMessage className="text-center text-black">
                    Don not have an account?
                    <Link
                        className="text-blue-500 p-2 hover:underline"
                        href={"/register"}
                    >
                        Register
                    </Link>
                </FormMessage>
            </form>
        </Form>
    );
};

export default LoginForm;