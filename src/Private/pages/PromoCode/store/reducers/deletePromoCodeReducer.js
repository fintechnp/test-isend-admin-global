import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.DELETE_PROMO_CODE:
            return {
                ...state,
                loading: true,
            };
        case actions.DELETE_PROMO_CODE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.DELETE_PROMO_CODE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.DELETE_PROMO_CODE_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
