import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

const ProfilePage = () => {
    const user = {
        id: "01923933-d21c-74d6-955f-84bd4532d85c",
        userName: "lqviet455@gmail.com",
        fullName: "Le Quoc Viet",
        email: "lqviet455@gmail.com",
        phoneNumber: "0353081770"
    };
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
                            <p className="text-gray-600">{user.fullName}</p>
                        </div>
                        <Separator/>
                        <div>
                            <h2 className="font-semibold">Email</h2>
                            <p className="text-gray-600">{user.email}</p>
                        </div>
                        <Separator/>
                        <div>
                            <h2 className="font-semibold">Phone Number</h2>
                            <p className="text-gray-600">{user.phoneNumber}</p>
                        </div>
                        <Separator/>
                        <div>
                            <h2 className="font-semibold">Username</h2>
                            <p className="text-gray-600">{user.userName}</p>
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