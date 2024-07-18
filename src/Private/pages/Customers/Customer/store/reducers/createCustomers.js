import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CREATE_CUSTOMER:
            return {
                ...state,
                loading: true,
            };
        case actions.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.CREATE_CUSTOMER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.CREATE_CUSTOMER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
