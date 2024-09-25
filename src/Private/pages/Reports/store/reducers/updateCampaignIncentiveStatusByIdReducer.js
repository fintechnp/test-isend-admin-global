import actions from "../actions";

const initialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CAMPAIGN_INCENTIVE_REPORT_STATUS:
            return {
                ...state,
                loading: true,
            };
        case actions.CAMPAIGN_INCENTIVE_REPORT_STATUS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
                is_modal_open: false,
                initial_form_state: undefined,
            };
        case actions.CAMPAIGN_INCENTIVE_REPORT_STATUS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.CAMPAIGN_INCENTIVE_REPORT_RESET:
            return {
                ...initialState,
            };
        case actions.OPEN_CAMPAIGN_INCENTIVE_REPORT_MODAL:
            return {
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        case actions.CLOSE_CAMPAIGN_INCENTIVE_REPORT_MODAL:
            return {
                is_modal_open: false,
                initial_form_state: undefined,
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
