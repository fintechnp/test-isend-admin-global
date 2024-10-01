import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.REFERRAL_REPORT_BY_ID:
            return {
                ...state,
                loading: true,
            };
        case actions.REFERRAL_REPORT_BY_ID_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.REFERRAL_REPORT_BY_ID_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action?.error,
            };
        case actions.REFERRAL_REPORT_BY_ID_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
