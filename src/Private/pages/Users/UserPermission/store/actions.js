const actions = {
    GET_ALL_PERMISSION: "GET_ALL_PERMISSION",
    GET_ALL_PERMISSION_SUCCESS: "GET_ALL_PERMISSION_SUCCESS",
    GET_ALL_PERMISSION_FAILED: "GET_ALL_PERMISSION_FAILED",
    GET_ALL_PERMISSION_RESET: "GET_ALL_PERMISSION_RESET",

    UPDATE_USER_PERMISSION: "UPDATE_USER_PERMISSION",
    UPDATE_USER_PERMISSION_SUCCESS: "UPDATE_USER_PERMISSION_SUCCESS",
    UPDATE_USER_PERMISSION_FAILED: "UPDATE_USER_PERMISSION_FAILED",

    get_all_permission: (id, query) => ({
        type: actions.GET_ALL_PERMISSION,
        id,
        query,
    }),

    update_user_permission: (id, data) => ({
        type: actions.UPDATE_USER_PERMISSION,
        id,
        data,
    }),
};

export default actions;
