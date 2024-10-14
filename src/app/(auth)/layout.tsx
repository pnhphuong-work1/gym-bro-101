import React from 'react';

const AuthLayout = ({children} : {children: React.ReactNode}) => {
    return (
        <main className="bg-blue-300 min-h-screen w-full flex items-center justify-center">
            {children}
        </main>
    );
};

export default AuthLayout;