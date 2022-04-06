const actions = {
    GET_ALL_MENU: "GET_ALL_MENU",
    GET_ALL_MENU_SUCCESS: "GET_ALL_MENU_SUCCESS",
    GET_ALL_MENU_FAILED: "GET_ALL_MENU_FAILED",

    ADD_MENU: "ADD_MENU",
    ADD_MENU_SUCCESS: "ADD_MENU_SUCCESS",
    ADD_MENU_FAILED: "ADD_MENU_FAILED",
    ADD_MENU_RESET: "ADD_MENU_RESET",

    UPDATE_MENU: "UPDATE_MENU",
    UPDATE_MENU_SUCCESS: "UPDATE_MENU_SUCCESS",
    UPDATE_MENU_FAILED: "UPDATE_MENU_FAILED",
    UPDATE_MENU_RESET: "UPDATE_MENU_RESET",

    DELETE_MENU: "DELETE_MENU",
    DELETE_MENU_SUCCESS: "DELETE_MENU_SUCCESS",
    DELETE_MENU_FAILED: "DELETE_MENU_FAILED",
    DELETE_MENU_RESET: "DELETE_MENU_RESET",

    get_all_menu: (query) => ({
        type: actions.GET_ALL_MENU,
        query,
    }),

    add_menu: (data) => ({
        type: actions.ADD_MENU,
        data,
    }),

    update_menu: (id, data) => ({
        type: actions.UPDATE_MENU,
        data,
        id,
    }),

    delete_menu: (id) => ({
        type: actions.DELETE_MENU,
        id,
    }),
};

export default actions;
