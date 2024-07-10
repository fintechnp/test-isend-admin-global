import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                error: null,
                response: action.response,
            };
        case actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action?.error,
                response: null,
            };
        case actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
