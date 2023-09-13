const batchTransactionActions = {
    GET_BATCH_TRANSACTIONS: "GET_BATCH_TRANSACTIONS",
    GET_BATCH_TRANSACTIONS_SUCCESS: "GET_BATCH_TRANSACTIONS_SUCCESS",
    GET_BATCH_TRANSACTIONS_FAILED: "GET_BATCH_TRANSACTIONS_FAILED",

    GET_BATCH_TRANSACTION: "GET_BATCH_TRANSACTION",
    GET_BATCH_TRANSACTION_SUCCESS: "GET_BATCH_TRANSACTION_SUCCESS",
    GET_BATCH_TRANSACTION_FAILED: "GET_BATCH_TRANSACTION_FAILED",

    get_batch_transactions: (query) => ({
        type: batchTransactionActions.GET_BATCH_TRANSACTIONS,
        query,
    }),

    get_batch_transaction: (batchTransactionId, query) => ({
        type: batchTransactionActions.GET_BATCH_TRANSACTION,
        batchTransactionId,
        query,
    }),
};

export default batchTransactionActions;
