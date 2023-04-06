const actions = {
    GET_STREET_TYPE: "GET_STREET_TYPE",
    GET_STREET_TYPE_SUCCESS: "GET_STREET_TYPE_SUCCESS",
    GET_STREET_TYPE_FAILED: "GET_STREET_TYPE_FAILED",

    ADD_STREET_TYPE: "ADD_STREET_TYPE",
    ADD_STREET_TYPE_SUCCESS: "ADD_STREET_TYPE_SUCCESS",
    ADD_STREET_TYPE_FAILED: "ADD_STREET_TYPE_FAILED",
    ADD_STREET_TYPE_RESET: "ADD_STREET_TYPE_RESET",

    UPDATE_STREET_TYPE: "UPDATE_STREET_TYPE",
    UPDATE_STREET_TYPE_SUCCESS: "UPDATE_STREET_TYPE_SUCCESS",
    UPDATE_STREET_TYPE_FAILED: "UPDATE_STREET_TYPE_FAILED",
    UPDATE_STREET_TYPE_RESET: "UPDATE_STREET_TYPE_RESET",

    DELETE_STREET_TYPE: "DELETE_STREET_TYPE",
    DELETE_STREET_TYPE_SUCCESS: "DELETE_STREET_TYPE_SUCCESS",
    DELETE_STREET_TYPE_FAILED: "DELETE_STREET_TYPE_FAILED",
    DELETE_STREET_TYPE_RESET: "DELETE_STREET_TYPE_RESET",

    get_street_type: (query) => ({
        type: actions.GET_STREET_TYPE,
        query,
    }),

    add_street_type: (data) => ({
        type: actions.ADD_STREET_TYPE,
        data,
    }),

    update_street_type: (id, data) => ({
        type: actions.UPDATE_STREET_TYPE,
        data,
        id,
    }),

    delete_street_type: (id) => ({
        type: actions.DELETE_STREET_TYPE,
        id,
    }),
};

export default actions;
