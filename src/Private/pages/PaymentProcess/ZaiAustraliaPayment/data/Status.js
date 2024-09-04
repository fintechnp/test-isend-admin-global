export const ZaiPaymentStatus = {
    "Payment Pending": "Payment Pending",
    Created: "Created",
    Processing: "Processing",
    Completed: "Completed",
    Suspicious: "Suspicious",
    "Refunded/Rejected": "Refunded/Rejected",
    Blocked: "Blocked",
    Exception: "exception",
};

export const ZaiBalanceStatus = {
    Active: "Active",
    InActive: "InActive",
};

export const ZaiBalanceStatusOptions = [
    {
        label: "Active",
        value: ZaiBalanceStatus.Active,
    },
    {
        label: "InActive",
        value: ZaiBalanceStatus.InActive,
    },
];

export const ZaiPaymentStatusOptions = [
    {
        label: "Pending",
        value: ZaiPaymentStatus["Payment Pending"],
    },
    {
        label: "Created",
        value: ZaiPaymentStatus.Created,
    },
    {
        label: "Processing",
        value: ZaiPaymentStatus.Processing,
    },
    {
        label: "Completed",
        value: ZaiPaymentStatus.Completed,
    },
    {
        label: "Suspicious",
        value: ZaiPaymentStatus.Suspicious,
    },
    {
        label: "Refunded/Rejected",
        value: ZaiPaymentStatus["Refunded/Rejected"],
    },
    {
        label: "Blocked",
        value: ZaiPaymentStatus.Blocked,
    },
    {
        label: "Exception",
        value: ZaiPaymentStatus.Exception,
    },
];
