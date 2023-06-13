const actions = {
    UPDATE_PASSWORD: "UPDATE_PASSWORD",
    UPDATE_PASSWORD_SUCCESS: "UPDATE_PASSWORD_SUCCESS",
    UPDATE_PASSWORD_FAILED: "UPDATE_PASSWORD_FAILED",
    UPDATE_PASSWORD_RESET: "UPDATE_PASSWORD_RESET",

    change_password: (data) => ({
        type: actions.UPDATE_PASSWORD,
        data,
    }),
};

export default actions;
