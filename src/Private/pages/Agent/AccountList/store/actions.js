const actions = {
    GET_Account_List: "GET_Account_List",
    GET_Account_List_SUCCESS: "GET_Account_List_SUCCESS",
    GET_Account_List_FAILED: "GET_Account_List_FAILED",

    GET_Account_Balance_By_ID: "GET_Account_Balance_By_ID",
    GET_Account_Balance_By_ID_SUCCESS: "GET_Account_Balance_By_ID_SUCCESS",
    GET_Account_Balance_By_ID_FAILED: "GET_Account_Balance_By_ID_FAILED",

    get_all_account_list: (query) => ({
        type: actions.GET_Account_List,
        query,
    }),

    get_account_balance_by_id: (id) => ({
        type: actions.GET_Account_Balance_By_ID,
        id,
    }),
};

export default actions;
