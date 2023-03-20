const actions = {
    GET_BANK: "GET_BANK",
    GET_BANK_SUCCESS: "GET_BANK_SUCCESS",
    GET_BANK_FAILED: "GET_BANK_FAILED",

    GET_BANK_DETAILS: "GET_BANK_DETAILS",
    GET_BANK_DETAILS_SUCCESS: "GET_BANK_DETAILS_SUCCESS",
    GET_BANK_DETAILS_FAILED: "GET_BANK_DETAILS_FAILED",

    ADD_BANK: "ADD_BANK",
    ADD_BANK_SUCCESS: "ADD_BANK_SUCCESS",
    ADD_BANK_FAILED: "ADD_BANK_FAILED",
    ADD_BANK_RESET: "ADD_BANK_RESET",

    UPDATE_BANK: "UPDATE_BANK",
    UPDATE_BANK_SUCCESS: "UPDATE_BANK_SUCCESS",
    UPDATE_BANK_FAILED: "UPDATE_BANK_FAILED",
    UPDATE_BANK_RESET: "UPDATE_BANK_RESET",

    UPDATE_BANK_STATUS: "UPDATE_BANK_STATUS",
    UPDATE_BANK_STATUS_SUCCESS: "UPDATE_BANK_STATUS_SUCCESS",
    UPDATE_BANK_STATUS_FAILED: "UPDATE_BANK_STATUS_FAILED",
    UPDATE_BANK_STATUS_RESET: "UPDATE_BANK_STATUS_RESET",

    DELETE_BANK: "DELETE_BANK",
    DELETE_BANK_SUCCESS: "DELETE_BANK_SUCCESS",
    DELETE_BANK_FAILED: "DELETE_BANK_FAILED",
    DELETE_BANK_RESET: "DELETE_BANK_RESET",

    get_all_bank: (query) => ({
        type: actions.GET_BANK,
        query,
    }),

    get_bank_details: (id) => ({
        type: actions.GET_BANK_DETAILS,
        id,
    }),

    add_bank: (data) => ({
        type: actions.ADD_BANK,
        data,
    }),

    update_bank: (id, data) => ({
        type: actions.UPDATE_BANK,
        data,
        id,
    }),

    // update_BANK_status: (id, data) => ({
    //     type: actions.UPDATE_BANK_STATUS,
    //     data,
    //     id,
    // }),

    delete_bank: (id) => ({
        type: actions.DELETE_BANK,
        id,
    }),
};

export default actions;
