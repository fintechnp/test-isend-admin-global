const actions = {
    GET_SANCTION_LIST: "GET_SANCTION_LIST",
    GET_SANCTION_LIST_SUCCESS: "GET_SANCTION_LIST_SUCCESS",
    GET_SANCTION_LIST_FAILED: "GET_SANCTION_LIST_FAILED",

    IMPORT_SANCTION_LIST: "IMPORT_SANCTION_LIST",
    IMPORT_SANCTION_LIST_SUCCESS: "IMPORT_SANCTION_LIST_SUCCESS",
    IMPORT_SANCTION_LIST_FAILED: "IMPORT_SANCTION_LIST_FAILED",
    IMPORT_SANCTION_LIST_RESET: "IMPORT_SANCTION_LIST_RESET",

    GET_SANCTION_BY_ID: "GET_SANCTION_BY_ID",
    GET_SANCTION_BY_ID_SUCCESS: "GET_SANCTION_BY_ID_SUCCESS",
    GET_SANCTION_BY_ID_FAILED: "GET_SANCTION_BY_ID_FAILED",

    ADD_SANCTION: "ADD_SANCTION",
    ADD_SANCTION_SUCCESS: "ADD_SANCTION_SUCCESS",
    ADD_SANCTION_FAILED: "ADD_SANCTION_FAILED",
    ADD_SANCTION_RESET: "ADD_SANCTION_RESET",

    UPDATE_SANCTION: "UPDATE_SANCTION",
    UPDATE_SANCTION_SUCCESS: "UPDATE_SANCTION_SUCCESS",
    UPDATE_SANCTION_FAILED: "UPDATE_SANCTION_FAILED",
    UPDATE_SANCTION_RESET: "UPDATE_SANCTION_RESET",

    DELETE_SANCTION: "DELETE_SANCTION",
    DELETE_SANCTION_SUCCESS: "DELETE_SANCTION_SUCCESS",
    DELETE_SANCTION_FAILED: "DELETE_SANCTION_FAILED",
    DELETE_SANCTION_RESET: "DELETE_SANCTION_RESET",

    get_sanction_list: (query) => ({
        type: actions.GET_SANCTION_LIST,
        query,
    }),

    get_sanction_by_id: (id) => ({
        type: actions.GET_SANCTION_BY_ID,
        id,
    }),

    import_sanction_list: (data) => ({
        type: actions.IMPORT_SANCTION_LIST,
        data,
    }),

    add_sanction: (data) => ({
        type: actions.ADD_SANCTION,
        data,
    }),

    update_sanction: (id, data) => ({
        type: actions.UPDATE_SANCTION,
        data,
        id,
    }),

    delete_sanction: (id) => ({
        type: actions.DELETE_SANCTION,
        id,
    }),
};

export default actions;
