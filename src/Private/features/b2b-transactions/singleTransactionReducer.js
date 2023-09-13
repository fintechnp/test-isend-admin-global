import singleTransactionActions from "./singleTransactionActions";

const getSingleTransactionsState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getSingleTransactionsReducer = (state = getSingleTransactionsState, action) => {
    switch (action.type) {
        case singleTransactionActions.GET_SINGLE_TRANSACTIONS:
            return {
                ...state,
                loading: true,
            };
        case singleTransactionActions.GET_SINGLE_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case singleTransactionActions.GET_SINGLE_TRANSACTIONS_FAILED:
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

const getSingleTransactionInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getSingleTransactionReducer = (state = getSingleTransactionInitialState, action) => {
    switch (action.type) {
        case singleTransactionActions.GET_SINGLE_TRANSACTION:
            return {
                ...state,
                loading: true,
            };
        case singleTransactionActions.GET_SINGLE_TRANSACTION_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case singleTransactionActions.GET_SINGLE_TRANSACTION_FAILED:
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

export { getSingleTransactionReducer, getSingleTransactionsReducer };
