const actions = {
    GET_CUSTOMERS: "GET_CUSTOMERS",
    GET_CUSTOMERS_SUCCESS: "GET_CUSTOMERS_SUCCESS",
    GET_CUSTOMERS_FAILED: "GET_CUSTOMERS_FAILED",
    GET_CUSTOMERS_RESET: "GET_CUSTOMERS_RESET",

    GET_CUSTOMERS_BY_PARTNER: "GET_CUSTOMERS_BY_PARTNER",
    GET_CUSTOMERS_BY_PARTNER_SUCCESS: "GET_CUSTOMERS_BY_PARTNER_SUCCESS",
    GET_CUSTOMERS_BY_PARTNER_FAILED: "GET_CUSTOMERS_BY_PARTNER_FAILED",
    GET_CUSTOMERS_BY_PARTNER_RESET: "GET_CUSTOMERS_BY_PARTNER_RESET",

    BLOCK_UNBLOCK_CUSTOMER: "BLOCK_UNBLOCK_CUSTOMER",
    BLOCK_UNBLOCK_CUSTOMER_SUCCESS: "BLOCK_UNBLOCK_CUSTOMER_SUCCESS",
    BLOCK_UNBLOCK_CUSTOMER_FAILED: "BLOCK_UNBLOCK_CUSTOMER_FAILED",
    BLOCK_UNBLOCK_CUSTOMER_RESET: "BLOCK_UNBLOCK_CUSTOMER_RESET",

    OPEN_FILTER: "OPEN_FILTER",
    CLOSE_FILTER: "CLOSE_FILTER",

    GET_ALL_CUSTOMER_KYC_COUNT_BY_STATUS: "GET_ALL_CUSTOMER_KYC_COUNT_BY_STATUS",
    GET_ALL_CUSTOMER_KYC_COUNT_BY_STATUS_SUCCESS: "GET_ALL_CUSTOMER_KYC_COUNT_BY_STATUS_SUCCESS",
    GET_ALL_CUSTOMER_KYC_COUNT_BY_STATUS_FAILED: "GET_ALL_CUSTOMER_KYC_COUNT_BY_STATUS_FAILED",

    get_customers: (query) => ({
        type: actions.GET_CUSTOMERS,
        query,
    }),

    get_customers_by_partner: (id, query) => ({
        type: actions.GET_CUSTOMERS_BY_PARTNER,
        query,
        id,
    }),

    block_unblock_customer: (id, query, data) => ({
        type: actions.BLOCK_UNBLOCK_CUSTOMER,
        id,
        query,
        data,
    }),

    open_filter: () => ({
        type: actions.OPEN_FILTER,
    }),

    close_filter: () => ({
        type: actions.CLOSE_FILTER,
    }),

    close_filter: () => ({
        type: actions.CLOSE_FILTER,
    }),

    get_all_customer_kyc_count_by_status: (query) => ({
        type: actions.GET_ALL_CUSTOMER_KYC_COUNT_BY_STATUS,
        query
    }),
};

export default actions;
