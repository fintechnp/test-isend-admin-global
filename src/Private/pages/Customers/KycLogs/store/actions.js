const actions = {
    GET_KYC_LOGS: "GET_KYC_LOGS",
    GET_KYC_LOGS_SUCCESS: "GET_KYC_LOGS_SUCCESS",
    GET_KYC_LOGS_FAILED: "GET_KYC_LOGS_FAILED",
    GET_KYC_LOGS_RESET: "GET_KYC_LOGS_RESET",

    GET_MORE_KYC_LOGS: "GET_MORE_KYC_LOGS",
    GET_MORE_KYC_LOGS_SUCCESS: "GET_MORE_KYC_LOGS_SUCCESS",

    GET_KYC_LOG_GREEN_ID: "GET_KYC_LOG_GREEN_ID",
    GET_KYC_LOG_GREEN_ID_SUCCESS: "GET_KYC_LOG_GREEN_ID_SUCCESS",
    GET_KYC_LOG_GREEN_ID_FAILED: "GET_KYC_LOG_GREEN_ID_FAILED",
    GET_KYC_LOG_GREEN_ID_RESET: "GET_KYC_LOG_GREEN_ID_RESET",

    get_kyc_logs: (query) => ({
        type: actions.GET_KYC_LOGS,
        query,
    }),

    get_more_kyc_logs: (query) => ({
        type: actions.GET_MORE_KYC_LOGS,
        query,
    }),

    get_customer_kyc_logs_green_id: (id) => ({
        type: actions.GET_KYC_LOG_GREEN_ID,
        id,
    }),
};

export default actions;
