const actions = {
    SET_THEME: "SET_THEME",
    RESET: "RESET",

    SET_TOAST_DATA: "SET_TOAST_DATA",
    RESET_TOAST_DATA: "RESET_TOAST_DATA",

    GET_ALL_COUNTRY: "GET_ALL_COUNTRY",
    GET_ALL_COUNTRY_SUCCESS: "GET_ALL_COUNTRY_SUCCESS",
    GET_ALL_COUNTRY_FAILED: "GET_ALL_COUNTRY_FAILED",

    GET_SEND_COUNTRY: "GET_SEND_COUNTRY",
    GET_SEND_COUNTRY_SUCCESS: "GET_SEND_COUNTRY_SUCCESS",
    GET_SEND_COUNTRY_FAILED: "GET_SEND_COUNTRY_FAILED",

    GET_ALL_REFERENCE: "GET_ALL_REFERENCE",
    GET_ALL_REFERENCE_SUCCESS: "GET_ALL_REFERENCE_SUCCESS",
    GET_ALL_REFERENCE_FAILED: "GET_ALL_REFERENCE_FAILED",

    USER_DETAILS: "USER_DETAILS",
    USER_DETAILS_SUCCESS: "USER_DETAILS_SUCCESS",
    USER_DETAILS_FAILED: "USER_DETAILS_FAILED",
    USER_DETAILS_RESET: "USER_DETAILS_RESET",

    GET_USER_MENUS_AND_PERMISSIONS: "GET_USER_MENUS",
    GET_USER_MENUS_AND_PERMISSIONS_SUCCESS: "GET_USER_MENUS_AND_PERMISSIONS_SUCCESS",
    GET_USER_MENUS_AND_PERMISSIONS_FAILED: "GET_USER_MENUS_AND_PERMISSIONS_FAILED",
    GET_USER_MENUS_AND_PERMISSIONS_RESET: "GET_USER_MENUS_AND_PERMISSIONS_RESET",

    INVALID_TOKEN: "INVALID_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
    REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED",
    REFRESH_TOKEN_RESET: "REFRESH_TOKEN_RESET",

    PASSWORD_RESET: "PASSWORD_RESET",
    PASSWORD_RESET_SUCCESS: "PASSWORD_RESET_SUCCESS",
    PASSWORD_RESET_FAILED: "PASSWORD_RESET_FAILED",
    PASSWORD_RESET_RESET: "PASSWORD_RESET_RESET",

    LOG_OUT: "LOG_OUT",
    LOG_OUT_SUCCESS: "LOG_OUT_SUCCESS",
    LOG_OUT_FAILED: "LOG_OUT_FAILED",

    change_theme: (dark) => ({
        type: actions.SET_THEME,
        dark,
    }),

    get_user: () => ({
        type: actions.USER_DETAILS,
    }),

    get_user_menus_and_permissions: () => ({
        type: actions.GET_USER_MENUS_AND_PERMISSIONS,
    }),

    refresh_token: (data) => ({
        type: actions.REFRESH_TOKEN,
        data,
    }),

    get_all_country: () => ({
        type: actions.GET_ALL_COUNTRY,
    }),

    get_send_country: () => ({
        type: actions.GET_SEND_COUNTRY,
    }),

    get_all_reference: (query) => ({
        type: actions.GET_ALL_REFERENCE,
        query,
    }),

    reset_password: (data) => ({
        type: actions.PASSWORD_RESET,
        data,
    }),
    log_out: () => ({
        type: actions.LOG_OUT,
    }),
};

export default actions;
