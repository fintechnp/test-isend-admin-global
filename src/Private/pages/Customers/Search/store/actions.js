const actions = {
    GET_CUSTOMERS: "GET_CUSTOMERS",
    GET_CUSTOMERS_SUCCESS: "GET_CUSTOMERS_SUCCESS",
    GET_CUSTOMERS_FAILED: "GET_CUSTOMERS_FAILED",
    GET_CUSTOMERS_RESET: "GET_CUSTOMERS_RESET",

    get_customers: (query) => ({
        type: actions.GET_CUSTOMERS,
        query,
    }),
};

export default actions;
