const actions = {
    GET_KYC_USER: "GET_KYC_USER",
    GET_KYC_USER_SUCCESS: "GET_KYC_USER_SUCCESS",
    GET_KYC_USER_FAILED: "GET_KYC_USER_FAILED",

    GET_KYC_USER_DETAILS: "GET_KYC_USER_DETAILS",
    GET_KYC_USER_DETAILS_SUCCESS: "GET_KYC_USER_DETAILS_SUCCESS",
    GET_KYC_USER_DETAILS_FAILED: "GET_KYC_USER_DETAILS_FAILED",

    UPDATE_KYC_USER_STATUS: "UPDATE_KYC_USER_STATUS",
    UPDATE_KYC_USER_STATUS_SUCCESS: "UPDATE_KYC_USER_STATUS_SUCCESS",
    UPDATE_KYC_USER_STATUS_FAILED: "UPDATE_KYC_USER_STATUS_FAILED",
    UPDATE_KYC_USER_STATUS_RESET: "UPDATE_KYC_USER_STATUS_RESET",

    get_all_kyc_user: (query) => ({
        type: actions.GET_KYC_USER,
        query,
    }),

    get_kyc_user_details: (id) => ({
        type: actions.GET_KYC_USER_DETAILS,
        id,
    }),

    update_kyc_user_status: (id, data) => ({
        type: actions.UPDATE_KYC_USER_STATUS,
        id,
        data,
    }),
};

export default actions;
