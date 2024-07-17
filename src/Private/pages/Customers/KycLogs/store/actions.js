const actions = {
    GET_KYC_LOGS: "GET_KYC_LOGS",
    GET_KYC_LOGS_SUCCESS: "GET_KYC_LOGS_SUCCESS",
    GET_KYC_LOGS_FAILED: "GET_KYC_LOGS_FAILED",
    GET_KYC_LOGS_RESET: "GET_KYC_LOGS_RESET",

    GET_MORE_KYC_LOGS: "GET_MORE_KYC_LOGS",
    GET_MORE_KYC_LOGS_SUCCESS: "GET_MORE_KYC_LOGS_SUCCESS",

    get_kyc_logs: (query) => ({
        type: actions.GET_KYC_LOGS,
        query,
    }),

    get_more_kyc_logs: (query) => ({
        type: actions.GET_MORE_KYC_LOGS,
        query,
    }),
};

export default actions;
