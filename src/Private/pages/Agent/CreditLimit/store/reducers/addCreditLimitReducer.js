import actions from "../actions.js";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_CREDIT_LIMIT:
            return {
                ...state,
                loading: true,
            };
        case actions.ADD_CREDIT_LIMIT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.ADD_CREDIT_LIMIT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.ADD_CREDIT_LIMIT_RESET:
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

export default reducer;
