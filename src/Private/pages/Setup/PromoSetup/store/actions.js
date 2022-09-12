const actions = {
    GET_PROMO_SETUP: "GET_PROMO_SETUP",
    GET_PROMO_SETUP_SUCCESS: "GET_PROMO_SETUP_SUCCESS",
    GET_PROMO_SETUP_FAILED: "GET_PROMO_SETUP_FAILED",

    GET_PROMO_SETUP_DETAILS: "GET_PROMO_SETUP_DETAILS",
    GET_PROMO_SETUP_DETAILS_SUCCESS: "GET_PROMO_SETUP_DETAILS_SUCCESS",
    GET_PROMO_SETUP_DETAILS_FAILED: "GET_PROMO_SETUP_DETAILS_FAILED",

    ADD_PROMO_SETUP: "ADD_PROMO_SETUP",
    ADD_PROMO_SETUP_SUCCESS: "ADD_PROMO_SETUP_SUCCESS",
    ADD_PROMO_SETUP_FAILED: "ADD_PROMO_SETUP_FAILED",
    ADD_PROMO_SETUP_RESET: "ADD_PROMO_SETUP_RESET",

    UPDATE_PROMO_SETUP: "UPDATE_PROMO_SETUP",
    UPDATE_PROMO_SETUP_SUCCESS: "UPDATE_PROMO_SETUP_SUCCESS",
    UPDATE_PROMO_SETUP_FAILED: "UPDATE_PROMO_SETUP_FAILED",
    UPDATE_PROMO_SETUP_RESET: "UPDATE_PROMO_SETUP_RESET",

    UPDATE_PROMO_SETUP_STATUS: "UPDATE_PROMO_SETUP_STATUS",
    UPDATE_PROMO_SETUP_STATUS_SUCCESS: "UPDATE_PROMO_SETUP_STATUS_SUCCESS",
    UPDATE_PROMO_SETUP_STATUS_FAILED: "UPDATE_PROMO_SETUP_STATUS_FAILED",
    UPDATE_PROMO_SETUP_STATUS_RESET: "UPDATE_PROMO_SETUP_STATUS_RESET",

    //promo codes
    GET_PROMO_CODE: "GET_PROMO_CODE",
    GET_PROMO_CODE_SUCCESS: "GET_PROMO_CODE_SUCCESS",
    GET_PROMO_CODE_FAILED: "GET_PROMO_CODE_FAILED",

    GET_PROMO_CODE_DETAILS: "GET_PROMO_CODE_DETAILS",
    GET_PROMO_CODE_DETAILS_SUCCESS: "GET_PROMO_CODE_DETAILS_SUCCESS",
    GET_PROMO_CODE_DETAILS_FAILED: "GET_PROMO_CODE_DETAILS_FAILED",

    PROMO_CODE_IMPORT: "PROMO_CODE_IMPORT",
    PROMO_CODE_IMPORT_SUCCESS: "PROMO_CODE_IMPORT_SUCCESS",
    PROMO_CODE_IMPORT_FAILED: "PROMO_CODE_IMPORT_FAILED",
    PROMO_CODE_IMPORT_RESET: "PROMO_CODE_IMPORT_RESET",

    ADD_PROMO_CODE: "ADD_PROMO_CODE",
    ADD_PROMO_CODE_SUCCESS: "ADD_PROMO_CODE_SUCCESS",
    ADD_PROMO_CODE_FAILED: "ADD_PROMO_CODE_FAILED",
    ADD_PROMO_CODE_RESET: "ADD_PROMO_CODE_RESET",

    UPDATE_PROMO_CODE_STATUS: "UPDATE_PROMO_CODE_STATUS",
    UPDATE_PROMO_CODE_STATUS_SUCCESS: "UPDATE_PROMO_CODE_STATUS_SUCCESS",
    UPDATE_PROMO_CODE_STATUS_FAILED: "UPDATE_PROMO_CODE_STATUS_FAILED",
    UPDATE_PROMO_CODE_STATUS_RESET: "UPDATE_PROMO_CODE_STATUS_RESET",

    get_promo_setup: (query) => ({
        type: actions.GET_PROMO_SETUP,
        query,
    }),

    get_promo_setup_details: (id) => ({
        type: actions.GET_PROMO_SETUP_DETAILS,
        id,
    }),

    add_promo_setup: (data) => ({
        type: actions.ADD_PROMO_SETUP,
        data,
    }),

    update_promo_setup: (id, data) => ({
        type: actions.UPDATE_PROMO_SETUP,
        data,
        id,
    }),

    update_promo_setup_status: (id, data) => ({
        type: actions.UPDATE_PROMO_SETUP_STATUS,
        data,
        id,
    }),

    //ACTION CREATOR FOR PROMO CODE
    import_promo_code: (promo_id, data) => ({
        type: actions.PROMO_CODE_IMPORT,
        promo_id,
        data,
    }),

    get_promo_code: (promo_id, query) => ({
        type: actions.GET_PROMO_CODE,
        promo_id,
        query,
    }),

    get_promo_code_details: (promo_code_id) => ({
        type: actions.GET_PROMO_CODE_DETAILS,
        promo_code_id,
    }),

    add_promo_code: (promo_id, data) => ({
        type: actions.ADD_PROMO_CODE,
        promo_id,
        data,
    }),

    update_promo_code_status: (promo_code_id, promo_id, data) => ({
        type: actions.UPDATE_PROMO_CODE_STATUS,
        data,
        promo_id,
        promo_code_id,
    }),
};

export default actions;
