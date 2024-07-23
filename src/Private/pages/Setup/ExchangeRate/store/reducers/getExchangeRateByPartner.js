import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_EXCHANGE_RATE_BY_PARTNER:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_EXCHANGE_RATE_BY_PARTNER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_EXCHANGE_RATE_BY_PARTNER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
