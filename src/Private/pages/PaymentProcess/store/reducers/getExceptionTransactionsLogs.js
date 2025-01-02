import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_EXCEPTION_TRANSACTIONS_LOGS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_EXCEPTION_TRANSACTIONS_LOGS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.GET_EXCEPTION_TRANSACTIONS_LOGS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
                response: null,
            };
        case actions.GET_EXCEPTION_TRANSACTIONS_LOGS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
