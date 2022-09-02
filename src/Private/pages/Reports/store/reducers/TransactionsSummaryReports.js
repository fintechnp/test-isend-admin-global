import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.TRANSACTIONS_SUMMARY_REPORT:
            return {
                ...state,
                loading: true,
            };
        case actions.TRANSACTIONS_SUMMARY_REPORT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.TRANSACTIONS_SUMMARY_REPORT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.TRANSACTIONS_SUMMARY_REPORT_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        default:
            return state;
    }
};

export default reducer;
