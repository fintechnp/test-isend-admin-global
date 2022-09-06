const actions = {
    GET_CUSTOMERS: "GET_CUSTOMERS",
    GET_CUSTOMERS_SUCCESS: "GET_CUSTOMERS_SUCCESS",
    GET_CUSTOMERS_FAILED: "GET_CUSTOMERS_FAILED",
    GET_CUSTOMERS_RESET: "GET_CUSTOMERS_RESET",

    BLOCK_UNBLOCK_CUSTOMER: "BLOCK_UNBLOCK_CUSTOMER",
    BLOCK_UNBLOCK_CUSTOMER_SUCCESS: "BLOCK_UNBLOCK_CUSTOMER_SUCCESS",
    BLOCK_UNBLOCK_CUSTOMER_FAILED: "BLOCK_UNBLOCK_CUSTOMER_FAILED",
    BLOCK_UNBLOCK_CUSTOMER_RESET: "BLOCK_UNBLOCK_CUSTOMER_RESET",

    get_customers: (query) => ({
        type: actions.GET_CUSTOMERS,
        query,
    }),

    block_unblock_customer: (id, query, data) => ({
        type: actions.BLOCK_UNBLOCK_CUSTOMER,
        id,
        query,
        data,
    }),
};

export default actions;
