import actions from "../actions.js";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_BUSINESS_STATUS:
            return {
                ...state,
                loading: true,
            };
        case actions.CHANGE_BUSINESS_STATUS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.CHANGE_BUSINESS_STATUS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.CHANGE_BUSINESS_STATUS_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
