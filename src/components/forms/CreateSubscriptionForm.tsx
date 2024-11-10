'use client';

import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateSubscriptionSchema, RegisterSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {createManager} from "@/lib/actions/user.action";
import {isErrorResponseValue} from "@/lib/utils";
import CreateBaseForm from "@/components/forms/CreateBaseForm";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import {
    createSubscription,
    fetchDayGroup,
    getSubscriptionById,
    updateSubscription
} from "@/lib/actions/subscription.action";
import {DayGroupResponseValue} from "@/types";

interface prop{
    onSuccess?: () => void;
}

const CreateSubscriptionForm = ({onSuccess}: prop) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [dayGroup, setDayGroup] = useState<DayGroupResponseValue[]>([])
    const [validationError, setValidationError] = useState<string[] | null>(null)
    const form = useForm<z.infer<typeof CreateSubscriptionSchema>>({
        resolver: zodResolver(CreateSubscriptionSchema),
        defaultValues: {
            name: "",
            totalWorkoutTime: "",
            price: 1000,
            totalMonth: 1,
            group: "T2, T4, T6",
        },
    })

    async function onSubmit(values: z.infer<typeof CreateSubscriptionSchema>) {
        setIsSubmitting(true)
        try {
            const res = await createSubscription(values);
            if (!isErrorResponseValue(res)) {
                setMessage("Created successful!");
                setError(null);
                if (onSuccess) {
                    onSuccess();
                }
                return;
            }
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

    useEffect(() => {
        setIsLoading(true);
        fetchDayGroup()
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setDayGroup(response.value.items);
                }
            });
        setIsLoading(false);
    }, [isLoading]);
    return (
        <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subscription Name</FormLabel>
                                <FormControl>
                                    <Input readOnly={false} placeholder="Enter Subscription name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalWorkoutTime"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Workout Time</FormLabel>
                                <FormControl>
                                    <Input type={"time"} readOnly={false} placeholder="Enter Subscription name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type={"number"} readOnly={false} placeholder="Enter price" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalMonth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Month</FormLabel>
                                <FormControl>
                                    <Input type={"number"} readOnly={false} placeholder="Enter Subscription name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="group"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Day Group</FormLabel>
                                <FormControl>
                                    <select
                                        {...field}
                                        className="border border-gray-300 rounded px-2 py-1 w-full"
                                    >
                                        <option value="">-- Select Group --</option>
                                        {dayGroup.map((group) => (
                                            <option key={group.id} value={group.group}>{group.group}</option>
                                        ))}
                                    </select>
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
                        {isSubmitting ? <LoadingSpinner/> : "Create"}
                    </Button>
                </form>
        </Form>
    );
};

export default CreateSubscriptionForm;