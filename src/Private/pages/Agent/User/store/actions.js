const actions = {
    GET_B2B_USERS: "GET_B2B_USERS",
    GET_B2B_USERS_SUCCESS: "GET_B2B_USERS_SUCCESS",
    GET_B2B_USERS_FAILED: "GET_B2B_USERS_FAILED",

    CHANGE_B2B_USER_KYC_STATUS: "CHANGE_B2B_USER_KYC_STATUS",
    CHANGE_B2B_USER_KYC_STATUS_SUCCESS: "CHANGE_B2B_USER_KYC_STATUS_SUCCESS",
    CHANGE_B2B_USER_KYC_STATUS_FAILED: "CHANGE_B2B_USER_KYC_STATUS_FAILED",
    CHANGE_B2B_USER_KYC_STATUS_RESET: "CHANGE_B2B_USER_KYC_STATUS_RESET",

    GET_B2B_USER_KYC_BY_ID: "GET_B2B_USER_KYC_BY_ID",
    GET_B2B_USER_KYC_BY_ID_SUCCESS: "GET_B2B_USER_KYC_BY_ID_SUCCESS",
    GET_B2B_USER_KYC_BY_ID_FAILED: "GET_B2B_USER_KYC_BY_ID_FAILED",

    get_b2b_users: (query) => ({
        type: actions.GET_B2B_USERS,
        query,
    }),

    change_b2b_user_status: (id, data) => ({
        type: actions.CHANGE_B2B_USER_KYC_STATUS,
        id,
        data,
    }),

    change_b2b_user_status_reset: () => ({
        type: actions.CHANGE_B2B_USER_KYC_STATUS,
    }),

    get_b2b_user_kyc_by_id: (id, data) => ({
        type: actions.GET_B2B_USER_KYC_BY_ID,
        id,
    }),
};

export default actions;
