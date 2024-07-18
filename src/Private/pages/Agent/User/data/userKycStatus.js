export const userKycStatus = {
    PROFILE_INCOMPLETE: 0,
    PENDING: 1,
    APPROVED: 2,
    REJECTED: 3,
    BLOCKED: 4,
    SANCTIONED: 5,
    EXPIRED: 6,
};

export const userKycStatusOptions = [
    {
        label: "Profile Incomplete",
        value: userKycStatus.PROFILE_INCOMPLETE,
    },
    {
        label: "Pending",
        value: userKycStatus.PENDING,
    },
    {
        label: "Approved",
        value: userKycStatus.APPROVED,
    },
    {
        label: "Rejected",
        value: userKycStatus.REJECTED,
    },
    {
        label: "Blocked",
        value: userKycStatus.BLOCKED,
    },
    {
        label: "Sanctioned",
        value: userKycStatus.SANCTIONED,
    },
    {
        label: "Expired",
        value: userKycStatus.EXPIRED,
    },
];
