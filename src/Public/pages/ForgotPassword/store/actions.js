const actions = {
    FORGOT_PASSWORD_INIT: "FORGOT_PASSWORD_INIT",
    FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
    FORGOT_PASSWORD_FAILED: "FORGOT_PASSWORD_FAILED",
    FORGOT_PASSWORD_RESET: "FORGOT_PASSWORD_RESET",

    forgotPassword: (payload) => ({
        type: actions.FORGOT_PASSWORD_INIT,
        payload,
    }),

    resetForgotPassword: () => ({
        type: actions.FORGOT_PASSWORD_RESET,
    }),
};

export default actions;
