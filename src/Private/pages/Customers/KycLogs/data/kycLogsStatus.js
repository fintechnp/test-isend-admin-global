export const kycLogsStatus = {
    COMPLETED: "c",
    PENDING: "p",
    INITIATED: "i",
    PROCESSING: "n",
    REJECTED: "r",
};

export const getKycLogsStatus = (status) => {
    switch (status) {
        case kycLogsStatus.COMPLETED:
            return "Completed";
        case kycLogsStatus.PENDING:
            return "Pending";
        case kycLogsStatus.INITIATED:
            return "Initiated";
        case kycLogsStatus.PROCESSING:
            return "Processing";
        case kycLogsStatus.REJECTED:
            return "Rejected";
        default:
            return "";
    }
};
