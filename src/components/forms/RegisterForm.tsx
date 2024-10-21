'use client';

import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {RegisterSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {register} from "@/lib/actions/user.action";
import {isErrorResponseValue} from "@/lib/utils";
import CreateBaseForm from "@/components/forms/CreateBaseForm";

const RegisterForm = ({ onSuccess }) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [validationError, setValidationError] = useState<string[] | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            dob: new Date(),
            confirmPassword: "",
            fullName: "",
        },
    })

    async function onSubmit(values: z.infer<typeof RegisterSchema>) {
        setIsSubmitting(true)
        try {
            // Add your register logic here
            const res = await register(values);

            if (!isErrorResponseValue(res)) {
                setMessage("Registration successful! Check your email to verify your account.");
                setError(null);
                onSuccess();
                return;
            }
            console.log(res.errors)
            if (res.errors && res.errors.length > 0) {
                setValidationError(res.errors.map((e) => e.message));
            } else {
                setError(res.detail);
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <CreateBaseForm
            form={form}
            onSubmit={onSubmit}
            isSubmitting={isSubmitting}
            message={message}
            error={error}
            validationError={validationError}
        />
    );
};

export default RegisterForm;