import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_COMPLIANCE_COUNT_BY_STATUS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_COMPLIANCE_COUNT_BY_STATUS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.GET_COMPLIANCE_COUNT_BY_STATUS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        default:
            return state;
    }
};

export default reducer;
