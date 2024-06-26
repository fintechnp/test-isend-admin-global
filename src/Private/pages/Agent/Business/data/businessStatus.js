export const businessStatus = {
    PROFILE_INCOMPLETE: 0,
    PENDING: 1,
    APPROVED: 2,
    REJECTED: 3,
    BLOCKED: 4,
    SANCTIONED: 5,
    EXPIRED: 6,
};

export const businessStatusOptions = [
    {
        label: "Profile Incomplete",
        value: businessStatus.PROFILE_INCOMPLETE,
    },
    {
        label: "Pending",
        value: businessStatus.PENDING,
    },
    {
        label: "Approved",
        value: businessStatus.APPROVED,
    },
    {
        label: "Rejected",
        value: businessStatus.REJECTED,
    },
    {
        label: "Blocked",
        value: businessStatus.BLOCKED,
    },
    {
        label: "Sanctioned",
        value: businessStatus.SANCTIONED,
    },
    {
        label: "Expired",
        value: businessStatus.EXPIRED,
    },
];

export const businessActiveInactiveStatus = {
    ACTIVE: 1,
    INACTIVE: 0,
};
