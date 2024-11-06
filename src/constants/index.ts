export const adminNavLinks = [
    {
        name: "Revenue",
        href: "/admin/dashboard/revenue"
    },
    {
        name: "Staff",
        href: "/admin/dashboard/staff"
    },
    {
        name: "Customer",
        href: "/admin/dashboard/customer"
    },
    {
        name: "Subscription",
        href: "/admin/dashboard/subscription"
    }
];

export enum Role {
    Admin = "Admin",
    Manager = "Manager",
    User = "User"
}

export const managerNavLinks = [
    {
        name: "Logs",
        href: "/manager/dashboard/check-log"
    },
    {
        name: "Customers",
        href: "/manager/dashboard/customer"
    }
];