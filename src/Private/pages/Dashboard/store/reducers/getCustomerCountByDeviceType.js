import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_FAILED:
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
