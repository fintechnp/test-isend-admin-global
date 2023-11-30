import batchTransactionActions from "./batchTransactionActions";

const getBatchTransactionsState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getBatchTransactionsReducer = (state = getBatchTransactionsState, action) => {
    switch (action.type) {
        case batchTransactionActions.GET_BATCH_TRANSACTIONS:
            return {
                ...state,
                loading: true,
            };
        case batchTransactionActions.GET_BATCH_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case batchTransactionActions.GET_BATCH_TRANSACTIONS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

const getBatchTransactionInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getBatchTransactionReducer = (state = getBatchTransactionInitialState, action) => {
    switch (action.type) {
        case batchTransactionActions.GET_BATCH_TRANSACTION:
            return {
                ...state,
                loading: true,
            };
        case batchTransactionActions.GET_BATCH_TRANSACTION_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case batchTransactionActions.GET_BATCH_TRANSACTION_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export { getBatchTransactionReducer, getBatchTransactionsReducer };
