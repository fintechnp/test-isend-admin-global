const actions = {
    GET_PARTNER: "GET_PARTNER",
    GET_PARTNER_SUCCESS: "GET_PARTNER_SUCCESS",
    GET_PARTNER_FAILED: "GET_PARTNER_FAILED",
    GET_PARTNER_RESET: "GET_PARTNER_RESET",

    GET_SENDING_PARTNER: "GET_SENDING_PARTNER",
    GET_SENDING_PARTNER_SUCCESS: "GET_SENDING_PARTNER_SUCCESS",
    GET_SENDING_PARTNER_FAILED: "GET_SENDING_PARTNER_FAILED",
    GET_SENDING_PARTNER_RESET: "GET_SENDING_PARTNER_RESET",

    GET_PAYOUT_PARTNER: "GET_PAYOUT_PARTNER",
    GET_PAYOUT_PARTNER_SUCCESS: "GET_PAYOUT_PARTNER_SUCCESS",
    GET_PAYOUT_PARTNER_FAILED: "GET_PAYOUT_PARTNER_FAILED",
    GET_PAYOUT_PARTNER_RESET: "GET_PAYOUT_PARTNER_RESET",

    GET_PARTNER_DETAILS: "GET_PARTNER_DETAILS",
    GET_PARTNER_DETAILS_SUCCESS: "GET_PARTNER_DETAILS_SUCCESS",
    GET_PARTNER_DETAILS_FAILED: "GET_PARTNER_DETAILS_FAILED",

    ADD_PARTNER: "ADD_PARTNER",
    ADD_PARTNER_SUCCESS: "ADD_PARTNER_SUCCESS",
    ADD_PARTNER_FAILED: "ADD_PARTNER_FAILED",

    UPDATE_PARTNER: "UPDATE_PARTNER",
    UPDATE_PARTNER_SUCCESS: "UPDATE_PARTNER_SUCCESS",
    UPDATE_PARTNER_FAILED: "UPDATE_PARTNER_FAILED",

    DELETE_PARTNER: "DELETE_PARTNER",
    DELETE_PARTNER_SUCCESS: "DELETE_PARTNER_SUCCESS",
    DELETE_PARTNER_FAILED: "DELETE_PARTNER_FAILED",

    GET_CORRIDOR: "GET_CORRIDOR",
    GET_CORRIDOR_SUCCESS: "GET_CORRIDOR_SUCCESS",
    GET_CORRIDOR_FAILED: "GET_CORRIDOR_FAILED",

    GET_CORRIDOR_DETAILS: "GET_CORRIDOR_DETAILS",
    GET_CORRIDOR_DETAILS_SUCCESS: "GET_CORRIDOR_DETAILS_SUCCESS",
    GET_CORRIDOR_DETAILS_FAILED: "GET_CORRIDOR_DETAILS_FAILED",

    ADD_CORRIDOR: "ADD_CORRIDOR",
    ADD_CORRIDOR_SUCCESS: "ADD_CORRIDOR_SUCCESS",
    ADD_CORRIDOR_FAILED: "ADD_CORRIDOR_FAILED",

    UPDATE_CORRIDOR: "UPDATE_CORRIDOR",
    UPDATE_CORRIDOR_SUCCESS: "UPDATE_CORRIDOR_SUCCESS",
    UPDATE_CORRIDOR_FAILED: "UPDATE_CORRIDOR_FAILED",

    DELETE_CORRIDOR: "DELETE_CORRIDOR",
    DELETE_CORRIDOR_SUCCESS: "DELETE_CORRIDOR_SUCCESS",
    DELETE_CORRIDOR_FAILED: "DELETE_CORRIDOR_FAILED",

    //PARTNER
    get_all_partner: (query) => ({
        type: actions.GET_PARTNER,
        query,
    }),

    get_sending_partner: (query) => ({
        type: actions.GET_SENDING_PARTNER,
        query,
    }),

    get_payout_partner: (query) => ({
        type: actions.GET_PAYOUT_PARTNER,
        query,
    }),

    get_partner_details: (id) => ({
        type: actions.GET_PARTNER_DETAILS,
        id,
    }),

    add_partner: (data) => ({
        type: actions.ADD_PARTNER,
        data,
    }),

    update_partner: (id, data) => ({
        type: actions.UPDATE_PARTNER,
        id,
        data,
    }),

    delete_partner: (id) => ({
        type: actions.DELETE_PARTNER,
        id,
    }),

    //CORRIDOR
    get_all_corridor: (id, query) => ({
        type: actions.GET_CORRIDOR,
        id,
        query,
    }),

    get_corridor_details: (id) => ({
        type: actions.GET_CORRIDOR_DETAILS,
        id,
    }),

    add_corridor: (data) => ({
        type: actions.ADD_CORRIDOR,
        data,
    }),

    update_corridor: (id, data) => ({
        type: actions.UPDATE_CORRIDOR,
        id,
        data,
    }),

    delete_corridor: (id) => ({
        type: actions.DELETE_CORRIDOR,
        id,
    }),
};

export default actions;
