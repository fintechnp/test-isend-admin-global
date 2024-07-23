const countryStateActions = {
    GET_COUNTRY_STATES: "GET_COUNTRY_STATES",
    GET_COUNTRY_STATES_SUCCESS: "GET_COUNTRY_STATES_SUCCESS",
    GET_COUNTRY_STATES_FAILED: "GET_COUNTRY_STATES_FAILED",

    ADD_COUNTRY_STATE: "ADD_COUNTRY_STATE",
    ADD_COUNTRY_STATE_SUCCESS: "ADD_COUNTRY_STATE_SUCCESS",
    ADD_COUNTRY_STATE_FAILED: "ADD_COUNTRY_STATE_FAILED",
    ADD_COUNTRY_STATE_RESET: "ADD_COUNTRY_STATE_RESET",
    OPEN_ADD_COUNTRY_STATE_MODAL: "OPEN_ADD_COUNTRY_STATE_MODAL",
    CLOSE_ADD_COUNTRY_STATE_MODAL: "CLOSE_ADD_COUNTRY_STATE_MODAL",

    UPDATE_COUNTRY_STATE: "UPDATE_COUNTRY_STATE",
    UPDATE_COUNTRY_STATE_SUCCESS: "UPDATE_COUNTRY_STATE_SUCCESS",
    UPDATE_COUNTRY_STATE_FAILED: "UPDATE_COUNTRY_STATE_FAILED",
    UPDATE_COUNTRY_STATE_RESET: "UPDATE_COUNTRY_STATE_RESET",
    OPEN_UPDATE_COUNTRY_STATE_MODAL: "OPEN_UPDATE_COUNTRY_STATE_MODAL",
    CLOSE_UPDATE_COUNTRY_STATE_MODAL: "CLOSE_UPDATE_COUNTRY_STATE_MODAL",

    DELETE_COUNTRY_STATE: "DELETE_COUNTRY_STATE",
    DELETE_COUNTRY_STATE_SUCCESS: "DELETE_COUNTRY_STATE_SUCCESS",
    DELETE_COUNTRY_STATE_FAILED: "DELETE_COUNTRY_STATE_FAILED",
    DELETE_COUNTRY_STATE_RESET: "DELETE_COUNTRY_STATE_RESET",

    get_country_states: (country, query) => ({
        type: countryStateActions.GET_COUNTRY_STATES,
        country,
        query,
    }),

    add_country_state: (data) => ({
        type: countryStateActions.ADD_COUNTRY_STATE,
        data,
    }),

    update_country_state: (id, data) => ({
        type: countryStateActions.UPDATE_COUNTRY_STATE,
        data,
        id,
    }),

    delete_country_state: (id) => ({
        type: countryStateActions.DELETE_COUNTRY_STATE,
        id,
    }),
};

export default countryStateActions;
