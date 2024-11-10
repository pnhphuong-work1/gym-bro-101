'use client';

import React, {useEffect, useState} from 'react';
import {DayGroupResponseValue, SubscriptionResponseValue} from "@/types";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {CreateSubscriptionSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    fetchDayGroup,
    updateSubscription
} from "@/lib/actions/subscription.action";
import {isErrorResponseValue} from "@/lib/utils";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";

interface prop {
    subscription: SubscriptionResponseValue;
    onSuccess?: () => void;
}
const UpdateSubscriptionForm = ({subscription, onSuccess} : prop) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const [dayGroup, setDayGroup] = useState<DayGroupResponseValue[]>([])
    const [validationError, setValidationError] = useState<string[] | null>(null)
    const form = useForm<z.infer<typeof CreateSubscriptionSchema>>({
        resolver: zodResolver(CreateSubscriptionSchema),
        defaultValues: {
            name: subscription.name,
            totalWorkoutTime: subscription.totalWorkoutTime,
            price: subscription.price,
            totalMonth: subscription.totalMonth,
            group: subscription.group,
        },
    })
    async function onSubmit(values: z.infer<typeof CreateSubscriptionSchema>) {
        setIsSubmitting(true)
        try {
            // Add your register logic here
            const res = await updateSubscription(values, subscription.id);
            if (!isErrorResponseValue(res)) {
                setMessage("Updated successful!");
                setError(null)
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
        console.log("subs", subscription);
        fetchDayGroup().then((res) => {
            if (!isErrorResponseValue(res)) {
                setDayGroup(res.value.items);
            }
        });
        setIsLoading(false);
    }, [isLoading]);

    function HandleAa() {
        console.log("subs", subscription);
    }

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
                    {isSubmitting ? <LoadingSpinner/> : "Update"}
                </Button>
            </form>
        </Form>
    );
};

export default UpdateSubscriptionForm;