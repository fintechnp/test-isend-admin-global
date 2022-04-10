const actions = {
    GET_ALL_PERMISSION: "GET_ALL_PERMISSION",
    GET_ALL_PERMISSION_SUCCESS: "GET_ALL_PERMISSION_SUCCESS",
    GET_ALL_PERMISSION_FAILED: "GET_ALL_PERMISSION_FAILED",
    GET_ALL_PERMISSION_RESET: "GET_ALL_PERMISSION_RESET",

    CREATE_USER_PERMISSION: "CREATE_USER_PERMISSION",
    CREATE_USER_PERMISSION_SUCCESS: "CREATE_USER_PERMISSION_SUCCESS",
    CREATE_USER_PERMISSION_FAILED: "CREATE_USER_PERMISSION_FAILED",

    get_all_permission: (id, query) => ({
        type: actions.GET_ALL_PERMISSION,
        id,
        query,
    }),

    create_user_permission: (id, data) => ({
        type: actions.CREATE_USER_PERMISSION,
        id,
        data,
    }),
};

export default actions;
