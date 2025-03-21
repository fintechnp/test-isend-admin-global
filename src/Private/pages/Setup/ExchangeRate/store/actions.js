const actions = {
    GET_EXCHANGE_RATE: "GET_EXCHANGE_RATE",
    GET_EXCHANGE_RATE_SUCCESS: "GET_EXCHANGE_RATE_SUCCESS",
    GET_EXCHANGE_RATE_FAILED: "GET_EXCHANGE_RATE_FAILED",

    GET_EXCHANGE_RATE_DETAILS: "GET_EXCHANGE_RATE_DETAILS",
    GET_EXCHANGE_RATE_DETAILS_SUCCESS: "GET_EXCHANGE_RATE_DETAILS_SUCCESS",
    GET_EXCHANGE_RATE_DETAILS_FAILED: "GET_EXCHANGE_RATE_DETAILS_FAILED",

    GET_EXCHANGE_RATE_BY_PARTNER: "GET_EXCHANGE_RATE_BY_PARTNER",
    GET_EXCHANGE_RATE_BY_PARTNER_SUCCESS: "GET_EXCHANGE_RATE_BY_PARTNER_SUCCESS",
    GET_EXCHANGE_RATE_BY_PARTNER_FAILED: "GET_EXCHANGE_RATE_BY_PARTNER_FAILED",

    ADD_EXCHANGE_RATE: "ADD_EXCHANGE_RATE",
    ADD_EXCHANGE_RATE_SUCCESS: "ADD_EXCHANGE_RATE_SUCCESS",
    ADD_EXCHANGE_RATE_FAILED: "ADD_EXCHANGE_RATE_FAILED",
    ADD_EXCHANGE_RATE_RESET: "ADD_EXCHANGE_RATE_RESET",

    UPDATE_EXCHANGE_RATE: "UPDATE_EXCHANGE_RATE",
    UPDATE_EXCHANGE_RATE_SUCCESS: "UPDATE_EXCHANGE_RATE_SUCCESS",
    UPDATE_EXCHANGE_RATE_FAILED: "UPDATE_EXCHANGE_RATE_FAILED",
    UPDATE_EXCHANGE_RATE_RESET: "UPDATE_EXCHANGE_RATE_RESET",

    DELETE_EXCHANGE_RATE: "DELETE_EXCHANGE_RATE",
    DELETE_EXCHANGE_RATE_SUCCESS: "DELETE_EXCHANGE_RATE_SUCCESS",
    DELETE_EXCHANGE_RATE_FAILED: "DELETE_EXCHANGE_RATE_FAILED",
    DELETE_EXCHANGE_RATE_RESET: "DELETE_EXCHANGE_RATE_RESET",

    REFRESH_EXCHANGE_RATE: "REFRESH_EXCHANGE_RATE",
    REFRESH_EXCHANGE_RATE_SUCCESS: "REFRESH_EXCHANGE_RATE_SUCCESS",
    REFRESH_EXCHANGE_RATE_FAILED: "REFRESH_EXCHANGE_RATE_FAILED",
    REFRESH_EXCHANGE_RATE_RESET: "REFRESH_EXCHANGE_RATE_RESET",

    get_all_exchange_rate: (query) => ({
        type: actions.GET_EXCHANGE_RATE,
        query,
    }),

    get_exchange_rate_by_partner: (id, query) => ({
        type: actions.GET_EXCHANGE_RATE_BY_PARTNER,
        query,
        id,
    }),

    get_exchange_rate_details: (id) => ({
        type: actions.GET_EXCHANGE_RATE_DETAILS,
        id,
    }),

    add_exchange_rate: (data) => ({
        type: actions.ADD_EXCHANGE_RATE,
        data,
    }),

    update_exchange_rate: (id, data) => ({
        type: actions.UPDATE_EXCHANGE_RATE,
        data,
        id,
    }),

    delete_exchange_rate: (id) => ({
        type: actions.DELETE_EXCHANGE_RATE,
        id,
    }),

    refresh_exchange_rate: (query) => ({
        type: actions.REFRESH_EXCHANGE_RATE,
        query,
    }),

    reset_refresh_exchange_rate: () => ({
        type: actions.REFRESH_EXCHANGE_RATE_RESET,
    }),
};

export default actions;
