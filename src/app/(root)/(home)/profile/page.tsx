'use client';

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {useGlobalContext} from "@/context/GlobalContext";
import {getCustomerById} from "@/lib/actions/user.action";
import {UserResponseValue} from "@/types";
import {isErrorResponseValue} from "@/lib/utils";

const ProfilePage = () => {
    const { userId } = useGlobalContext();
    const [user, setUser] = useState<UserResponseValue>();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        getCustomerById(userId)
            .then((response) => {
                if (!isErrorResponseValue(response)) {
                    setUser(response.value);
                }
            })
            .catch((error) => {
                console.error("Error fetching subscription:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [userId]);
    return (
        <div className="flex justify-center items-center w-full h-full">
            <Card className="w-1/2 mx-auto shadow-md">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-semibold">Full Name</h2>
                            <p className="text-gray-600">{user?.fullName}</p>
                        </div>
                        <Separator/>
                        <div>
                            <h2 className="font-semibold">Email</h2>
                            <p className="text-gray-600">{user?.email}</p>
                        </div>
                        <Separator/>
                        <div>
                            <h2 className="font-semibold">Phone Number</h2>
                            <p className="text-gray-600">{user?.phoneNumber}</p>
                        </div>
                        <Separator/>
                        <div>
                            <h2 className="font-semibold">Username</h2>
                            <p className="text-gray-600">{user?.userName}</p>
                        </div>
                    </div>
                    {/*Workout Steaks*/}

                    {/* Subcription must be here*/}
                </CardContent>
            </Card>
        </div>
    );
};

export default ProfilePage;