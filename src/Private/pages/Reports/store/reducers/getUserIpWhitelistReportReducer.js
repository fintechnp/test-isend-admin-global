import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const getUserIpWhitelistReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.USER_IP_WHITELIST_REPORT:
            return {
                ...state,
                loading: true,
            };
        case actions.USER_IP_WHITELIST_REPORT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.USER_IP_WHITELIST_REPORT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.USER_IP_WHITELIST_REPORT_RESET:
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

export default getUserIpWhitelistReportReducer;
