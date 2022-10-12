const actions = {
    GET_API_CONFIG: "GET_API_CONFIG",
    GET_API_CONFIG_SUCCESS: "GET_API_CONFIG_SUCCESS",
    GET_API_CONFIG_FAILED: "GET_API_CONFIG_FAILED",

    GET_API_CONFIG_DETAILS: "GET_API_CONFIG_DETAILS",
    GET_API_CONFIG_DETAILS_SUCCESS: "GET_API_CONFIG_DETAILS_SUCCESS",
    GET_API_CONFIG_DETAILS_FAILED: "GET_API_CONFIG_DETAILS_FAILED",

    ADD_API_CONFIG: "ADD_API_CONFIG",
    ADD_API_CONFIG_SUCCESS: "ADD_API_CONFIG_SUCCESS",
    ADD_API_CONFIG_FAILED: "ADD_API_CONFIG_FAILED",
    ADD_API_CONFIG_RESET: "ADD_API_CONFIG_RESET",

    UPDATE_API_CONFIG: "UPDATE_API_CONFIG",
    UPDATE_API_CONFIG_SUCCESS: "UPDATE_API_CONFIG_SUCCESS",
    UPDATE_API_CONFIG_FAILED: "UPDATE_API_CONFIG_FAILED",
    UPDATE_API_CONFIG_RESET: "UPDATE_API_CONFIG_RESET",

    get_api_config: (query) => ({
        type: actions.GET_API_CONFIG,
        query,
    }),

    get_api_config_details: (id) => ({
        type: actions.GET_API_CONFIG_DETAILS,
        id,
    }),

    add_api_config: (data) => ({
        type: actions.ADD_API_CONFIG,
        data,
    }),

    update_api_config: (id, data) => ({
        type: actions.UPDATE_API_CONFIG,
        data,
        id,
    }),
};

export default actions;
