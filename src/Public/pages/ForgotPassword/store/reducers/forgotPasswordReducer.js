import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.FORGOT_PASSWORD_INIT:
            return {
                ...initialState,
                loading: true,
            };
        case actions.FORGOT_PASSWORD_SUCCESS:
            return {
                ...initialState,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.FORGOT_PASSWORD_FAILED:
            return {
                ...initialState,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.FORGOT_PASSWORD_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
