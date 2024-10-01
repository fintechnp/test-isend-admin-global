import actions from "../actions";

const initialState = {
    loading: false,
    success: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CAMPAIGN_REPORT_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case actions.CAMPAIGN_REPORT_DETAILS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.CAMPAIGN_REPORT_DETAILS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.CAMPAIGN_REPORT_DETAILS_RESET:
            return {
                ...initialState,
            };

        default:
            return state;
    }
};

export default reducer;
