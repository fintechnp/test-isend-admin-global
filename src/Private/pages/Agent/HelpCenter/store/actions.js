const actions = {
    GET_HELP_CENTERS: "GET_HELP_CENTERS",
    GET_HELP_CENTERS_SUCCESS: "GET_HELP_CENTERS_SUCCESS",
    GET_HELP_CENTERS_FAILED: "GET_HELP_CENTERS_FAILED",
    GET_HELP_CENTERS_RESET: "GET_HELP_CENTERS_RESET",

    CREATE_HELP_CENTER: "CREATE_HELP_CENTER",
    CREATE_HELP_CENTER_SUCCESS: "CREATE_HELP_CENTER_SUCCESS",
    CREATE_HELP_CENTER_FAILED: "CREATE_HELP_CENTER_FAILED",
    CREATE_HELP_CENTER_RESET: "CREATE_HELP_CENTER_RESET",
    OPEN_ADD_HELP_CENTER_MODAL: "OPEN_ADD_HELP_CENTER_MODAL",
    CLOSE_ADD_HELP_CENTER_MODAL: "CLOSE_ADD_HELP_CENTER_MODAL",

    UPDATE_HELP_CENTER: "UPDATE_HELP_CENTER",
    UPDATE_HELP_CENTER_SUCCESS: "UPDATE_HELP_CENTER_SUCCESS",
    UPDATE_HELP_CENTER_FAILED: "UPDATE_HELP_CENTER_FAILED",
    UPDATE_HELP_CENTER_RESET: "UPDATE_HELP_CENTER_RESET",
    OPEN_UPDATE_HELP_CENTER_MODAL: "OPEN_UPDATE_HELP_CENTER_MODAL",
    CLOSE_UPDATE_HELP_CENTER_MODAL: "CLOSE_UPDATE_HELP_CENTER_MODAL",

    get_help_centers: (query) => ({
        type: actions.GET_HELP_CENTERS,
        query,
    }),

    create_help_center: (data) => ({
        type: actions.CREATE_HELP_CENTER,
        data,
    }),

    create_help_center_reset: () => ({
        type: actions.CREATE_HELP_CENTER_RESET,
    }),

    update_help_center: (id, data) => ({
        type: actions.UPDATE_HELP_CENTER,
        id,
        data,
    }),

    update_help_center_reset: () => ({
        type: actions.UPDATE_HELP_CENTER_RESET,
    }),

    open_add_modal: () => ({
        type: actions.OPEN_ADD_HELP_CENTER_MODAL,
    }),

    close_add_modal: () => ({
        type: actions.CLOSE_ADD_HELP_CENTER_MODAL,
    }),

    open_edit_modal: (payload) => ({
        type: actions.OPEN_UPDATE_HELP_CENTER_MODAL,
        payload,
    }),

    close_edit_modal: () => ({
        type: actions.CLOSE_UPDATE_HELP_CENTER_MODAL,
    }),
};

export default actions;
