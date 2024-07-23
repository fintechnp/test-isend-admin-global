const actions = {
    GET_CUSTOMER_BY_ID: "GET_CUSTOMER_BY_ID",
    GET_CUSTOMER_BY_ID_SUCCESS: "GET_CUSTOMER_BY_ID_SUCCESS",
    GET_CUSTOMER_BY_ID_FAILED: "GET_CUSTOMER_BY_ID_FAILED",
    GET_CUSTOMER_BY_ID_RESET: "GET_CUSTOMER_BY_ID_RESET",

    CREATE_CUSTOMER: "CREATE_CUSTOMER",
    CREATE_CUSTOMER_SUCCESS: "CREATE_CUSTOMER_SUCCESS",
    CREATE_CUSTOMER_FAILED: "CREATE_CUSTOMER_FAILED",
    CREATE_CUSTOMER_RESET: "CREATE_CUSTOMER_RESET",

    UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
    UPDATE_CUSTOMER_SUCCESS: "UPDATE_CUSTOMER_SUCCESS",
    UPDATE_CUSTOMER_FAILED: "UPDATE_CUSTOMER_FAILED",
    UPDATE_CUSTOMER_RESET: "UPDATE_CUSTOMER_RESET",

    get_customer_by_id: (id) => ({
        type: actions.GET_CUSTOMER_BY_ID,
        id,
    }),

    create_customer: (data) => ({
        type: actions.CREATE_CUSTOMER,
        data,
    }),

    create_customer_reset: (data) => ({
        type: actions.CREATE_CUSTOMER_RESET,
        data,
    }),

    update_customer: (id, data) => ({
        type: actions.UPDATE_CUSTOMER,
        id,
        data,
    }),

    update_customer_reset: () => ({
        type: actions.UPDATE_CUSTOMER_RESET,
    }),
};

export default actions;
