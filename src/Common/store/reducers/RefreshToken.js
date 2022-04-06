import actions from "./../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.REFRESH_TOKEN:
            return {
                ...state,
                loading: true,
            };
        case actions.INVALID_TOKEN:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        case actions.REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.REFRESH_TOKEN_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.REFRESH_TOKEN_RESET:
            return {
                ...state,
                success: false,
                loading: false,
                response: [],
            };
        default:
            return state;
    }
};

export default reducer;
