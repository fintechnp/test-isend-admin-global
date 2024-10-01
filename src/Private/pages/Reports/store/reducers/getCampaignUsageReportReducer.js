import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PROMO_CODE_USAGE_REPORT:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_PROMO_CODE_USAGE_REPORT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_PROMO_CODE_USAGE_REPORT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.GET_PROMO_CODE_USAGE_REPORT_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
