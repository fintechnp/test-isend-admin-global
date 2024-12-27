import actions from "../actions";

const initialState = {
    loading: false,
    success: false,
    response: null,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_OVERALL_CUSTOMERS_REPORT:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_OVERALL_CUSTOMERS_REPORT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response,
                error: null,
            };
        case actions.GET_OVERALL_CUSTOMERS__REPORT_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                response: null,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
