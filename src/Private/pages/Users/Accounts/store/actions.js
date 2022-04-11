const actions = {
    GET_ACCOUNT_USER: "GET_ACCOUNT_USER",
    GET_ACCOUNT_USER_SUCCESS: "GET_ACCOUNT_USER_SUCCESS",
    GET_ACCOUNT_USER_FAILED: "GET_ACCOUNT_USER_FAILED",

    GET_ACCOUNT_NUMBER: "GET_ACCOUNT_NUMBER",
    GET_ACCOUNT_NUMBER_SUCCESS: "GET_ACCOUNT_NUMBER_SUCCESS",
    GET_ACCOUNT_NUMBER_FAILED: "GET_ACCOUNT_NUMBER_FAILED",

    GET_ACCOUNT_USER_DETAILS: "GET_ACCOUNT_USER_DETAILS",
    GET_ACCOUNT_USER_DETAILS_SUCCESS: "GET_ACCOUNT_USER_DETAILS_SUCCESS",
    GET_ACCOUNT_USER_DETAILS_FAILED: "GET_ACCOUNT_USER_DETAILS_FAILED",

    GET_ACCOUNT_USER_DETAILS_BY_ID: "GET_ACCOUNT_USER_DETAILS_BY_ID",
    GET_ACCOUNT_USER_DETAILS_BY_ID_SUCCESS:
        "GET_ACCOUNT_USER_DETAILS_BY_ID_SUCCESS",
    GET_ACCOUNT_USER_DETAILS_BY_ID_FAILED:
        "GET_ACCOUNT_USER_DETAILS_BY_ID_FAILED",

    ADD_ACCOUNT_USER: "ADD_ACCOUNT_USER",
    ADD_ACCOUNT_USER_SUCCESS: "ADD_ACCOUNT_USER_SUCCESS",
    ADD_ACCOUNT_USER_FAILED: "ADD_ACCOUNT_USER_FAILED",
    ADD_ACCOUNT_USER_RESET: "ADD_ACCOUNT_USER_RESET",

    UPDATE_ACCOUNT_USER: "UPDATE_ACCOUNT_USER",
    UPDATE_ACCOUNT_USER_SUCCESS: "UPDATE_ACCOUNT_USER_SUCCESS",
    UPDATE_ACCOUNT_USER_FAILED: "UPDATE_ACCOUNT_USER_FAILED",
    UPDATE_ACCOUNT_USER_RESET: "UPDATE_ACCOUNT_USER_RESET",

    UPDATE_ACCOUNT_STATUS: "UPDATE_ACCOUNT_STATUS",
    UPDATE_ACCOUNT_STATUS_SUCCESS: "UPDATE_ACCOUNT_STATUS_SUCCESS",
    UPDATE_ACCOUNT_STATUS_FAILED: "UPDATE_ACCOUNT_STATUS_FAILED",
    UPDATE_ACCOUNT_STATUS_RESET: "UPDATE_ACCOUNT_STATUS_RESET",

    DELETE_ACCOUNT_USER: "DELETE_ACCOUNT_USER",
    DELETE_ACCOUNT_USER_SUCCESS: "DELETE_ACCOUNT_USER_SUCCESS",
    DELETE_ACCOUNT_USER_FAILED: "DELETE_ACCOUNT_USER_FAILED",
    DELETE_ACCOUNT_USER_RESET: "DELETE_ACCOUNT_USER_RESET",

    get_all_user: (query) => ({
        type: actions.GET_ACCOUNT_USER,
        query,
    }),

    get_user_number: () => ({
        type: actions.GET_ACCOUNT_NUMBER,
    }),

    get_user_details: () => ({
        type: actions.GET_ACCOUNT_USER_DETAILS,
    }),

    get_user_details_by_id: (id) => ({
        type: actions.GET_ACCOUNT_USER_DETAILS_BY_ID,
        id,
    }),

    add_user: (data) => ({
        type: actions.ADD_ACCOUNT_USER,
        data,
    }),

    update_user: (data, id) => ({
        type: actions.UPDATE_ACCOUNT_USER,
        data,
        id,
    }),

    update_user_status: (data, id) => ({
        type: actions.UPDATE_ACCOUNT_STATUS,
        data,
        id,
    }),

    delete_user: (id) => ({
        type: actions.DELETE_ACCOUNT_USER,
        id,
    }),
};

export default actions;
