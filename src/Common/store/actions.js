const actions = {
    SET_THEME: "SET_THEME",
    RESET: "RESET",

    SET_TOAST_DATA: "SET_TOAST_DATA",
    RESET_TOAST_DATA: "RESET_TOAST_DATA",

    GET_ALL_COUNTRY: "GET_ALL_COUNTRY",
    GET_ALL_COUNTRY_SUCCESS: "GET_ALL_COUNTRY_SUCCESS",
    GET_ALL_COUNTRY_FAILED: "GET_ALL_COUNTRY_FAILED",

    GET_ALL_REFERENCE: "GET_ALL_REFERENCE",
    GET_ALL_REFERENCE_SUCCESS: "GET_ALL_REFERENCE_SUCCESS",
    GET_ALL_REFERENCE_FAILED: "GET_ALL_REFERENCE_FAILED",

    USER_DETAILS: "USER_DETAILS",
    USER_DETAILS_SUCCESS: "USER_DETAILS_SUCCESS",
    USER_DETAILS_FAILED: "USER_DETAILS_FAILED",
    USER_DETAILS_RESET: "USER_DETAILS_RESET",

    INVALID_TOKEN: "INVALID_TOKEN",
    REFRESH_TOKEN: "REFRESH_TOKEN",
    REFRESH_TOKEN_SUCCESS: "REFRESH_TOKEN_SUCCESS",
    REFRESH_TOKEN_FAILED: "REFRESH_TOKEN_FAILED",
    REFRESH_TOKEN_RESET: "REFRESH_TOKEN_RESET",

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

    refresh_token: (data) => ({
        type: actions.REFRESH_TOKEN,
        data,
    }),

    get_all_country: () => ({
        type: actions.GET_ALL_COUNTRY,
    }),

    get_all_reference: () => ({
        type: actions.GET_ALL_REFERENCE,
    }),
};

export default actions;
