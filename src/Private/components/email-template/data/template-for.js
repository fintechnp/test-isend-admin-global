export const templateFor = {
    ADMIN: "admin",
    CUSTOMER: "customer",
    ADMINTOCUSTOMER: "admin_to_customer",
};

export const templateForOptions = [
    { label: "Customer", value: templateFor.CUSTOMER },
    { label: "Admin", value: templateFor.ADMIN },
    { label: "Admin to Customer", value: templateFor.ADMINTOCUSTOMER },
];

export const emailElementTypeOptions = [
    { label: "Header", value: "header" },
    { label: "Footer", value: "footer" },
];

export const templateForLabels = {
    [templateFor.ADMIN]: "Admin",
    [templateFor.CUSTOMER]: "Customer",
    [templateFor.ADMINTOCUSTOMER]: "Admin to Customer",
};
