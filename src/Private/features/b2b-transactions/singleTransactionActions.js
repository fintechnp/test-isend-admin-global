const singleTransactionActions = {
    GET_SINGLE_TRANSACTIONS: "GET_SINGLE_TRANSACTIONS",
    GET_SINGLE_TRANSACTIONS_SUCCESS: "GET_SINGLE_TRANSACTIONS_SUCCESS",
    GET_SINGLE_TRANSACTIONS_FAILED: "GET_SINGLE_TRANSACTIONS_FAILED",

    GET_SINGLE_TRANSACTION: "GET_SINGLE_TRANSACTION",
    GET_SINGLE_TRANSACTION_SUCCESS: "GET_SINGLE_TRANSACTION_SUCCESS",
    GET_SINGLE_TRANSACTION_FAILED: "GET_SINGLE_TRANSACTION_FAILED",

    get_single_transactions: (query) => ({
        type: singleTransactionActions.GET_SINGLE_TRANSACTIONS,
        query,
    }),

    get_single_transaction: (transactionId) => ({
        type: singleTransactionActions.GET_SINGLE_TRANSACTION,
        transactionId,
    }),
};

export default singleTransactionActions;
