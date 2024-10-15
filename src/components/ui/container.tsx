import React from "react";
import { cn } from "@/lib/utils"; // Assuming you have a utility for class names

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode; // Children components or elements
    className?: string; // Optional className prop for additional styling
}

const Container: React.FC<ContainerProps> = ({ children, className, ...props }) => {
    return (
        <div className={cn("max-w-7xl mx-auto p-4", className)} {...props}>
            {children}
        </div>
    );
};

export default Container;
