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
        case actions.GET_DELIVERY_ROUTE_BY_ID:
            return {
                ...state,
                loading: true,
                is_open: true,
            };
        case actions.GET_DELIVERY_ROUTE_BY_ID_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_DELIVERY_ROUTE_BY_ID_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.OPEN_DELIVERY_ROUTE_BY_ID_MODAL:
            return {
                ...state,
                is_open: true,
            };
        case actions.CLOSE_DELIVERY_ROUTE_BY_ID_MODAL:
            return {
                ...state,
                is_open: false,
            };
        default:
            return state;
    }
};

export default reducer;
