import actions from "../actions";

const initialState = {
    loading: false,
    success: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.REFERRAL_REPORT:
            return {
                ...state,
                loading: true,
            };
        case actions.REFERRAL_REPORT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.REFERRAL_REPORT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.REFERRAL_REPORT_RESET:
            return {
                ...initialState,
            };

        default:
            return state;
    }
};

export default reducer;
