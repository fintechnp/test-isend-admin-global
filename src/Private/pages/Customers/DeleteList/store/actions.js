const actions = {
    GET_CUSTOMER_DELETE_LIST: "GET_CUSTOMER_DELETE_LIST",
    GET_CUSTOMER_DELETE_LIST_SUCCESS: "GET_CUSTOMER_DELETE_LIST_SUCCESS",
    GET_CUSTOMER_DELETE_LIST_FAILED: "GET_CUSTOMER_DELETE_LIST_FAILED",

    GET_CUSTOMER_DELETE_DETAILS: "GET_CUSTOMER_DELETE_DETAILS",
    GET_CUSTOMER_DELETE_DETAILS_SUCCESS: "GET_CUSTOMER_DELETE_DETAILS_SUCCESS",
    GET_CUSTOMER_DELETE_DETAILS_FAILED: "GET_CUSTOMER_DELETE_DETAILS_FAILED",

    UPDATE_CUSTOMER_DELETE_REQUEST: "UPDATE_CUSTOMER_DELETE_REQUEST",
    UPDATE_CUSTOMER_DELETE_REQUEST_SUCCESS: "UPDATE_CUSTOMER_DELETE_REQUEST_SUCCESS",
    UPDATE_CUSTOMER_DELETE_REQUEST_FAILED: "UPDATE_CUSTOMER_DELETE_REQUEST_FAILED",
    UPDATE_CUSTOMER_DELETE_REQUEST_RESET: " UPDATE_CUSTOMER_DELETE_REQUEST_RESET",

    get_all_customer_delete_list: (query) => ({
        type: actions.GET_CUSTOMER_DELETE_LIST,
        query,
    }),

    get_customer_delete_details: (id) => ({
        type: actions.GET_CUSTOMER_DELETE_DETAILS,
        id,
    }),

    update_delete_request: (id, data) => ({
        type: actions.UPDATE_CUSTOMER_DELETE_REQUEST,
        id,
        data,
    }),
};

export default actions;
