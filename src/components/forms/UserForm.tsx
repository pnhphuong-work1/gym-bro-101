'use client';

import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {z} from "zod";
import {UpdateUserSchema} from "@/lib/validation";
import {zodResolver} from "@hookform/resolvers/zod";
import {getUserById, updateUser} from "@/lib/actions/user.action";
import {cn, isErrorResponseValue} from "@/lib/utils";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {LoadingSpinner} from "@/components/shared/LoadingSpinner";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

interface UserFormProps {
    editable: boolean;
    id: string;
}

const UserForm = ({editable, id}: UserFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [validationError, setValidationError] = useState<string[] | null>(null)
    const [message, setMessage] = useState<string | null>(null)
    const form = useForm<z.infer<typeof UpdateUserSchema>>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            id: id,
            email: "",
            fullName: "",
            phoneNumber: "",
            dob: new Date(),
        },
    })

    useEffect(() => {
        getUserById(id).then((res) => {
            if (!isErrorResponseValue(res)) {
                form.reset(res.value);
                form.setValue("dob", new Date(res.value.dateOfBirth));
            } else {
                setError(res.detail);
            }
        });
    }, []);


    async function onSubmit(values: z.infer<typeof UpdateUserSchema>) {
        setIsSubmitting(true)
        try {
            // Add your register logic here
            const res = await updateUser(values);

            if (!isErrorResponseValue(res)) {
                setMessage("User updated successfully!");
                setError(null);
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

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="id"
                    render={({field}) => (
                        <FormItem
                            className="hidden"
                        >
                            <FormLabel>ID</FormLabel>
                            <FormControl>
                                <Input hidden placeholder="" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    disabled={!editable}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input readOnly={true} placeholder="" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="fullName"
                    disabled={!editable}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    disabled={!editable}
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dob"
                    disabled={!editable}
                    render={({field}) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date of birth</FormLabel>
                            <Popover>
                                <PopoverTrigger
                                    disabled={!editable}
                                    asChild
                                >
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "dd/MM/yyyy")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        captionLayout="dropdown"
                                        toYear={new Date().getFullYear()}
                                        fromYear={1900}
                                        classNames={{
                                            day_hidden: "invisible",
                                            dropdown: "px-2 py-1.5 rounded-md bg-popover text-popover-foreground text-sm  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                                            caption_dropdowns: "flex gap-3",
                                            vhidden: "hidden",
                                            caption_label: "hidden",
                                        }}
                                        defaultMonth={field.value || new Date()}
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        disabled={(date) =>
                                            date > new Date() || date < new Date("1900-01-01")
                                        }
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage/>
                        </FormItem>
                    )}
                />

                <FormMessage>
                    {message}
                </FormMessage>

                <FormMessage>
                    {error}
                </FormMessage>

                {
                    editable ? (
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <LoadingSpinner/> : "Save"}
                        </Button>
                    ) : null
                }
            </form>
        </Form>
    );
};

export default UserForm;