import actions from "../actions.js";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_BUSINESS:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_BUSINESS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.UPDATE_BUSINESS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.UPDATE_BUSINESS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
