import actions from "../actions";

const initialState = {
    loading: false,
    success: false,
    response: null,
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS:
            return {
                ...state,
                loading: true,
            };

        case actions.GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response,
                error: null,
            };
        case actions.GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
                response: null,
            };
        default:
            return state;
    }
};

export default reducer;
