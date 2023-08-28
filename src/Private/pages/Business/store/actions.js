const actions = {
    GET_BUSINESS: "GET_BUSINESS",
    GET_BUSINESS_SUCCESS: "GET_BUSINESS_SUCCESS",
    GET_BUSINESS_FAILED: "GET_BUSINESS_FAILED",

    GET_BUSINESS_DETAILS: "GET_BUSINESS_DETAILS",
    GET_BUSINESS_DETAILS_SUCCESS: "GET_BUSINESS_DETAILS_SUCCESS",
    GET_BUSINESS_DETAILS_FAILED: "GET_BUSINESS_DETAILS_FAILED",

    ADD_BUSINESS_APPROVAL: "ADD_BUSINESS",
    ADD_BUSINESS_APPROVAL_SUCCESS: "ADD_BUSINESS_SUCCESS",
    ADD_BUSINESS_APPROVAL_FAILED: "ADD_BUSINESS_FAILED",
    ADD_BUSINESS_APPROVAL_RESET: "ADD_BUSINESS_RESET",

    UPDATE_BUSINESS_STATUS: "UPDATE_BUSINESS",
    UPDATE_BUSINESS_STATUS_SUCCESS: "UPDATE_BUSINESS_SUCCESS",
    UPDATE_BUSINESS_STATUS_FAILED: "UPDATE_BUSINESS_FAILED",
    UPDATE_BUSINESS_STATUS_RESET: "UPDATE_BUSINESS_RESET",

    get_all_business: (query) => ({
        type: actions.GET_BUSINESS,
        query,
    }),

    get_business_details: (id) => ({
        type: actions.GET_BUSINESS_DETAILS,
        id,
    }),

    add_business_approval: (data) => ({
        type: actions.ADD_BUSINESS,
        data,
    }),

    update_business_status: (id, data) => ({
        type: actions.UPDATE_BUSINESS_STATUS,
        data,
        id,
    }),
};

export default actions;
