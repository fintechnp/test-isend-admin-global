import actions from "../actions";

const initialState = {
    webhookId: null,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.MAKE_PAYMENT:
            return {
                ...state,
                webhookId: action.data.webhookId,
                loading: true,
            };
        case actions.MAKE_PAYMENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.MAKE_PAYMENT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.MAKE_PAYMENT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
