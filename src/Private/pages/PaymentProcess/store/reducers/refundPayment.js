import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    webhookId: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.REFUND_PAYMENT:
            return {
                ...state,
                webhookId: action.data.webhookId,
                loading: true,
            };
        case actions.REFUND_PAYMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                response: action.response,
            };
        case actions.REFUND_PAYMENT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.REFUND_PAYMENT_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
