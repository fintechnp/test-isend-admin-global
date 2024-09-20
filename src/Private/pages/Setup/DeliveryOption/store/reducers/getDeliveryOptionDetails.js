import actions from "../actions";

const initialState = {
    is_open: false,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_DELIVERY_OPTION_DETAILS:
            return {
                ...state,
                loading: true,
                is_open: true,
            };
        case actions.GET_DELIVERY_OPTION_DETAILS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_DELIVERY_OPTION_DETAILS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.OPEN_DELIVERY_OPTION_DETAILS_MODAL:
            return {
                ...state,
                is_open: true,
            };
        case actions.CLOSE_DELIVERY_OPTION_DETAILS_MODAL:
            return {
                ...state,
                is_open: false,
            };
        default:
            return state;
    }
};

export default reducer;
