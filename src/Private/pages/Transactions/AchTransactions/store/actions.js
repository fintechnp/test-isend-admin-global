const actions = {
    GET_ACH_TRANSACTIONS: "GET_ACH_TRANSACTIONS",
    GET_ACH_TRANSACTIONS_SUCCESS: "GET_ACH_TRANSACTIONS_SUCCESS",
    GET_ACH_TRANSACTIONS_FAILED: "GET_ACH_TRANSACTIONS_FAILED",

    UPDATE_ACH_TRANSACTION_STATUS: "UPDATE_ACH_TRANSACTION_STATUS",
    UPDATE_ACH_TRANSACTION_STATUS_SUCCESS: "UPDATE_ACH_TRANSACTION_STATUS_SUCCESS",
    UPDATE_ACH_TRANSACTION_STATUS_FAILED: "UPDATE_ACH_TRANSACTION_STATUS_FAILED",
    UPDATE_ACH_TRANSACTION_STATUS_RESET: "UPDATE_ACH_TRANSACTION_STATUS_RESET",

    get_ach_transactions: (query) => ({
        type: actions.GET_ACH_TRANSACTIONS,
        query,
    }),

    update_ach_transaction_status: (id, data) => ({
        type: actions.UPDATE_ACH_TRANSACTION_STATUS,
        data,
        id,
    }),
};

export default actions;
