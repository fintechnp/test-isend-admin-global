const actions = {
    GET_BANK_LIST: "GET_BANK_LIST",
    GET_BANK_LIST_SUCCESS: "GET_BANK_LIST_SUCCESS",
    GET_BANK_LIST_FAILED: "GET_BANK_LIST_FAILED",

    get_all_bank_list: (query) => ({
        type: actions.GET_BANK_LIST,
        query,
    }),
};

export default actions;
