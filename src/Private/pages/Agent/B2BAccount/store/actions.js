const actions = {
    GET_B2BAccount: "GET_B2BAccount",
    GET_B2BAccount_SUCCESS: "GET_B2BAccount_SUCCESS",
    GET_B2BAccount_FAILED: "GET_B2BAccount_FAILED",

    get_all_b2b_account: (query) => ({
        type: actions.GET_B2BAccount,
        query,
    }),
};

export default actions;
