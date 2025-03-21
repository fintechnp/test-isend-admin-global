const actions = {
    GET_LANGUAGE_VALUE: "GET_LANGUAGE_VALUE",
    GET_LANGUAGE_VALUE_SUCCESS: "GET_LANGUAGE_VALUE_SUCCESS",
    GET_LANGUAGE_VALUE_FAILED: "GET_LANGUAGE_VALUE_FAILED",
    GET_LANGUAGE_VALUE_DETAILS: "GET_LANGUAGE_VALUE_DETAILS",
    GET_LANGUAGE_VALUE_DETAILS_SUCCESS: "GET_LANGUAGE_VALUE_DETAILS_SUCCESS",
    GET_LANGUAGE_VALUE_DETAILS_FAILED: "GET_LANGUAGE_VALUE_DETAILS_FAILED",

    ADD_LANGUAGE_VALUE: "ADD_LANGUAGE_VALUE",
    ADD_LANGUAGE_VALUE_SUCCESS: "ADD_LANGUAGE_VALUE_SUCCESS",
    ADD_LANGUAGE_VALUE_FAILED: "ADD_LANGUAGE_VALUE_FAILED",
    ADD_LANGUAGE_VALUE_RESET: "ADD_LANGUAGE_VALUE_RESET",

    UPDATE_LANGUAGE_VALUE: "UPDATE_LANGUAGE_VALUE",
    UPDATE_LANGUAGE_VALUE_SUCCESS: "UPDATE_LANGUAGE_VALUE_SUCCESS",
    UPDATE_LANGUAGE_VALUE_FAILED: "UPDATE_LANGUAGE_VALUE_FAILED",
    UPDATE_LANGUAGE_VALUE_RESET: "UPDATE_LANGUAGE_VALUE_RESET",

    UPDATE_LANGUAGE_VALUE_STATUS: "UPDATE_LANGUAGE_VALUE_STATUS",
    UPDATE_LANGUAGE_VALUE_STATUS_SUCCESS: "UPDATE_LANGUAGE_VALUE_STATUS_SUCCESS",
    UPDATE_LANGUAGE_VALUE_STATUS_FAILED: "UPDATE_LANGUAGE_VALUE_STATUS_FAILED",
    UPDATE_LANGUAGE_VALUE_STATUS_RESET: "UPDATE_LANGUAGE_VALUE_STATUS_RESET",

    DELETE_LANGUAGE_VALUE: "DELETE_LANGUAGE_VALUE",
    DELETE_LANGUAGE_VALUE_SUCCESS: "DELETE_LANGUAGE_VALUE_SUCCESS",
    DELETE_LANGUAGE_VALUE_FAILED: "DELETE_LANGUAGE_VALUE_FAILED",
    DELETE_LANGUAGE_VALUE_RESET: "DELETE_LANGUAGE_VALUE_RESET",

    get_all_language_value: (query) => ({
        type: actions.GET_LANGUAGE_VALUE,
        query,
    }),

    get_language_value_details: (id) => ({
        type: actions.GET_LANGUAGE_VALUE_DETAILS,
        id,
    }),

    add_language_value: (data) => ({
        type: actions.ADD_LANGUAGE_VALUE,
        data,
    }),

    update_language_value: (id, data) => ({
        type: actions.UPDATE_LANGUAGE_VALUE,
        data,
        id,
    }),

    update_language_value_status: (id, data) => ({
        type: actions.UPDATE_LANGUAGE_VALUE_STATUS,
        data,
        id,
    }),

    delete_language_value: (id) => ({
        type: actions.DELETE_LANGUAGE_VALUE,
        id,
    }),
};

export default actions;
