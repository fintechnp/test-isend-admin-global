const actions = {
    GET_MARKET_MAKER: "GET_MARKET_MAKER",
    GET_MARKET_MAKER_SUCCESS: "GET_MARKET_MAKER_SUCCESS",
    GET_MARKET_MAKER_FAILED: "GET_MARKET_MAKER_FAILED",

    GET_MARKET_MAKER_DETAILS: "GET_MARKET_MAKER_DETAILS",
    GET_MARKET_MAKER_DETAILS_SUCCESS: "GET_MARKET_MAKER_DETAILS_SUCCESS",
    GET_MARKET_MAKER_DETAILS_FAILED: "GET_MARKET_MAKER_DETAILS_FAILED",

    ADD_MARKET_MAKER: "ADD_MARKET_MAKER",
    ADD_MARKET_MAKER_SUCCESS: "ADD_MARKET_MAKER_SUCCESS",
    ADD_MARKET_MAKER_FAILED: "ADD_MARKET_MAKER_FAILED",
    ADD_MARKET_MAKER_RESET: "ADD_MARKET_MAKER_RESET",

    UPDATE_MARKET_MAKER: "UPDATE_MARKET_MAKER",
    UPDATE_MARKET_MAKER_SUCCESS: "UPDATE_MARKET_MAKER_SUCCESS",
    UPDATE_MARKET_MAKER_FAILED: "UPDATE_MARKET_MAKER_FAILED",
    UPDATE_MARKET_MAKER_RESET: "UPDATE_MARKET_MAKER_RESET",

    UPDATE_MARKET_MAKER_STATUS: "UPDATE_MARKET_MAKER_STATUS",
    UPDATE_MARKET_MAKER_STATUS_SUCCESS: "UPDATE_MARKET_MAKER_STATUS_SUCCESS",
    UPDATE_MARKET_MAKER_STATUS_FAILED: "UPDATE_MARKET_MAKER_STATUS_FAILED",
    UPDATE_MARKET_MAKER_STATUS_RESET: "UPDATE_MARKET_MAKER_STATUS_RESET",

    ///DOCUMENTS

    GET_DOCUMENT_SETINGS: "GET_DOCUMENT_SETINGS",
    GET_DOCUMENT_SETINGS_SUCCESS: "GET_DOCUMENT_SETINGS_SUCCESS",
    GET_DOCUMENT_SETINGS_FAILED: "GET_DOCUMENT_SETINGS_FAILED",

    ADD_DOCUMENT: "ADD_DOCUMENT",
    ADD_DOCUMENT_SUCCESS: "ADD_DOCUMENT_SUCCESS",
    ADD_DOCUMENT_FAILED: "ADD_DOCUMENT_FAILED",
    ADD_DOCUMENT_RESET: "ADD_DOCUMENT_RESET",

    // KYB

    ADD_MARKET_MAKER_KYB: "ADD_MARKET_MAKER_KYB",
    ADD_MARKET_MAKER_KYB_SUCCESS: "ADD_MARKET_MAKER_KYB_SUCCESS",
    ADD_MARKET_MAKER_KYB_FAILED: "ADD_MARKET_MAKER_KYB_FAILED",
    ADD_MARKET_MAKER_KYB_RESET: "ADD_MARKET_MAKER_KYB_RESET",

    UPDATE_MARKET_MAKER_KYB: "UPDATE_MARKET_MAKER_KYB",
    UPDATE_MARKET_MAKER_KYB_SUCCESS: "UPDATE_MARKET_MAKER_KYB_SUCCESS",
    UPDATE_MARKET_MAKER_KYB_FAILED: "UPDATE_MARKET_MAKER_KYB_FAILED",
    UPDATE_MARKET_MAKER_KYB_RESET: "UPDATE_MARKET_MAKER_KYB_RESET",

    UPDATE_MARKET_MAKER_KYC: "UPDATE_MARKET_MAKER_KYC",
    UPDATE_MARKET_MAKER_KYC_SUCCESS: "UPDATE_MARKET_MAKER_KYC_SUCCESS",
    UPDATE_MARKET_MAKER_KYC_FAILED: "UPDATE_MARKET_MAKER_KYC_FAILED",
    UPDATE_MARKET_MAKER_KYC_RESET: "UPDATE_MARKET_MAKER_KYC_RESET",

    // KYC
    ADD_MARKET_MAKER_KYC: "ADD_MARKET_MAKER_KYC",
    ADD_MARKET_MAKER_KYC_SUCCESS: "ADD_MARKET_MAKER_KYC_SUCCESS",
    ADD_MARKET_MAKER_KYC_FAILED: "ADD_MARKET_MAKER_KYC_FAILED",
    ADD_MARKET_MAKER_KYC_RESET: "ADD_MARKET_MAKER_KYC_RESET",

    //USERS

    GET_MARKET_MAKER_USER: "GET_MARKET_MAKER_USER",
    GET_MARKET_MAKER_USER_SUCCESS: "GET_MARKET_MAKER_USER_SUCCESS",
    GET_MARKET_MAKER_USER_FAILED: "GET_MARKET_MAKER_USER_FAILED",

    get_all_market_maker: (query) => ({
        type: actions.GET_MARKET_MAKER,
        query,
    }),

    get_market_maker_details: (id) => ({
        type: actions.GET_MARKET_MAKER_DETAILS,
        id,
    }),

    add_market_maker: (data) => ({
        type: actions.ADD_MARKET_MAKER,
        data,
    }),

    update_market_maker: (id, data) => ({
        type: actions.UPDATE_MARKET_MAKER,
        data,
        id,
    }),
    update_market_maker_status: (id) => ({
        type: actions.UPDATE_MARKET_MAKER_STATUS,
        id,
    }),

    /// DOCUMENTS

    get_document_settings: (query) => ({
        type: actions.GET_DOCUMENT_SETINGS,
        query,
    }),

    add_document: (data) => ({
        type: actions.ADD_DOCUMENT,
        data,
    }),

    // KYB

    add_market_maker_kyb: (data) => ({
        type: actions.ADD_MARKET_MAKER_KYB,
        data,
    }),

    update_market_maker_kyb: (id, data) => ({
        type: actions.UPDATE_MARKET_MAKER_KYB,
        data,
        id,
    }),

    // KYC

    add_market_maker_kyc: (data) => ({
        type: actions.ADD_MARKET_MAKER_KYC,
        data,
    }),

    update_market_maker_kyc: (id, data) => ({
        type: actions.UPDATE_MARKET_MAKER_KYC,
        data,
        id,
    }),

    //uSERS

    get_market_maker_users: (id) => ({
        type: actions.GET_MARKET_MAKER_USER,
        id,
    }),
};

export default actions;
