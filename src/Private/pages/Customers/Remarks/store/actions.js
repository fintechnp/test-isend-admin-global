const actions = {
    GET_REMARKS: "GET_REMARKS",
    GET_REMARKS_SUCCESS: "GET_REMARKS_SUCCESS",
    GET_REMARKS_FAILED: "GET_REMARKS_FAILED",
    GET_REMARKS_RESET: "GET_REMARKS_RESET",

    GET_REMARKS_BYID: "GET_REMARKS_BYID",
    GET_REMARKS_BYID_SUCCESS: "GET_REMARKS_BYID_SUCCESS",
    GET_REMARKS_BYID_FAILED: "GET_REMARKS_BYID_FAILED",
    GET_REMARKS_BYID_RESET: "GET_REMARKS_BYID_RESET",

    CREATE_REMARKS: "CREATE_REMARKS",
    CREATE_REMARKS_SUCCESS: "CREATE_REMARKS_SUCCESS",
    CREATE_REMARKS_FAILED: "CREATE_REMARKS_FAILED",
    CREATE_REMARKS_RESET: "CREATE_REMARKS_RESET",

    get_remarks: (customer_id, query) => ({
        type: actions.GET_REMARKS,
        customer_id,
        query,
    }),

    get_remarks_byid: (id) => ({
        type: actions.GET_REMARKS_BYID,
        id,
    }),

    create_remarks: (customer_id, data) => ({
        type: actions.CREATE_REMARKS,
        customer_id,
        data,
    }),
};

export default actions;
