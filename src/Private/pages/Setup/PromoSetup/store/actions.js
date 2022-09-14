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

    DELETE_PROMO_SETUP: "DELETE_PROMO_SETUP",
    DELETE_PROMO_SETUP_SUCCESS: "DELETE_PROMO_SETUP_SUCCESS",
    DELETE_PROMO_SETUP_FAILED: "DELETE_PROMO_SETUP_FAILED",
    DELETE_PROMO_SETUP_RESET: "DELETE_PROMO_SETUP_RESET",

    //promo codes
    GET_PROMO_CODE: "GET_PROMO_CODE",
    GET_PROMO_CODE_SUCCESS: "GET_PROMO_CODE_SUCCESS",
    GET_PROMO_CODE_FAILED: "GET_PROMO_CODE_FAILED",

    DELETE_PROMO_CODE: "DELETE_PROMO_CODE",
    DELETE_PROMO_CODE_SUCCESS: "DELETE_PROMO_CODE_SUCCESS",
    DELETE_PROMO_CODE_FAILED: "DELETE_PROMO_CODE_FAILED",
    DELETE_PROMO_CODE_RESET: "DELETE_PROMO_CODE_RESET",

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

    delete_promo_setup: (promo_id) => ({
        type: actions.DELETE_PROMO_SETUP,
        promo_id,
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

    delete_promo_code: (promo_id, promo_code_id) => ({
        type: actions.DELETE_PROMO_CODE,
        promo_code_id,
        promo_id,
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
