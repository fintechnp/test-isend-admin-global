const actions = {
    GET_ALL_SUB_MENU: "GET_ALL_SUB_MENU",
    GET_ALL_SUB_MENU_SUCCESS: "GET_ALL_SUB_MENU_SUCCESS",
    GET_ALL_SUB_MENU_FAILED: "GET_ALL_SUB_MENU_FAILED",

    ADD_SUB_MENU: "ADD_SUB_MENU",
    ADD_SUB_MENU_SUCCESS: "ADD_SUB_MENU_SUCCESS",
    ADD_SUB_MENU_FAILED: "ADD_SUB_MENU_FAILED",
    ADD_SUB_MENU_RESET: "ADD_SUB_MENU_RESET",

    UPDATE_SUB_MENU: "UPDATE_SUB_MENU",
    UPDATE_SUB_MENU_SUCCESS: "UPDATE_SUB_MENU_SUCCESS",
    UPDATE_SUB_MENU_FAILED: "UPDATE_SUB_MENU_FAILED",
    UPDATE_SUB_MENU_RESET: "UPDATE_SUB_MENU_RESET",

    UPDATE_SUB_MENU_STATUS: "UPDATE_SUB_MENU_STATUS",
    UPDATE_SUB_MENU_STATUS_SUCCESS: "UPDATE_SUB_MENU_STATUS_SUCCESS",
    UPDATE_SUB_MENU_STATUS_FAILED: "UPDATE_SUB_MENU_STATUS_FAILED",
    UPDATE_SUB_MENU_STATUS_RESET: "UPDATE_SUB_MENU_STATUS_RESET",

    DELETE_SUB_MENU: "DELETE_SUB_MENU",
    DELETE_SUB_MENU_SUCCESS: "DELETE_SUB_MENU_SUCCESS",
    DELETE_SUB_MENU_FAILED: "DELETE_SUB_MENU_FAILED",
    DELETE_SUB_MENU_RESET: "DELETE_SUB_MENU_RESET",

    get_all_sub_menu: (id, query) => ({
        type: actions.GET_ALL_SUB_MENU,
        id,
        query,
    }),

    add_sub_menu: (id, data) => ({
        type: actions.ADD_SUB_MENU,
        data,
        id,
    }),

    update_sub_menu: (sub_id, parent_id, data) => ({
        type: actions.UPDATE_SUB_MENU,
        data,
        parent_id,
        sub_id,
    }),

    update_sub_menu_status: (sub_id, parent_id, data) => ({
        type: actions.UPDATE_SUB_MENU_STATUS,
        data,
        parent_id,
        sub_id,
    }),

    delete_sub_menu: (sub_id, parent_id) => ({
        type: actions.DELETE_SUB_MENU,
        parent_id,
        sub_id,
    }),
};

export default actions;
