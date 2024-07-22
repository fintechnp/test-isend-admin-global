import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
    isModalOpen: false,
    transactionId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.OPEN_RETURN_ACH_RDFI_TRANSACTION_MODAL:
            return {
                ...initialState,
                isModalOpen: true,
                transactionId: action.id,
            };
        case actions.CLOSE_RETURN_ACH_RDFI_TRANSACTION_MODAL:
            return {
                ...initialState,
                isModalOpen: false,
                transactionId: null,
            };
        case actions.RETURN_ACH_RDFI_TRANSACTION:
            return {
                ...initialState,
                loading: true,
            };
        case actions.RETURN_ACH_RDFI_TRANSACTION_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.RETURN_ACH_RDFI_TRANSACTION_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                response: null,
                error: action.error,
            };
        case actions.RETURN_ACH_RDFI_TRANSACTION_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
