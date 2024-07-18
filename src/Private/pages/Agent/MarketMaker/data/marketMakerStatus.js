export const marketMakerStatus = {
    INACTIVE: 0,
    APPROVED: 1,
    PENDING: 2,
    REJECTED: 3,
};

export const marketMakerStatusOptions = [
    {
        label: "Inactive",
        value: marketMakerStatus.INACTIVE,
    },
    {
        label: "Pending",
        value: marketMakerStatus.PENDING,
    },
    {
        label: "Approved",
        value: marketMakerStatus.APPROVED,
    },
    {
        label: "Rejected",
        value: marketMakerStatus.REJECTED,
    },
];

export const businessActiveInactiveStatus = {
    ACTIVE: 1,
    INACTIVE: 0,
};
