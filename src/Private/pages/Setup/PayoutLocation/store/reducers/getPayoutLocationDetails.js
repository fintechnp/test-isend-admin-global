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
        case actions.GET_PAYOUT_LOCATION_DETAILS:
            return {
                ...state,
                loading: true,
                is_open: true,
            };
        case actions.GET_PAYOUT_LOCATION_DETAILS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_PAYOUT_LOCATION_DETAILS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.OPEN_GET_PAYOUT_LOCATION_DETAILS_MODAL:
            return {
                ...state,
                is_open: true,
            };
        case actions.CLOSE_GET_PAYOUT_LOCATION_DETAILS_MODAL:
            return {
                ...state,
                is_open: false,
            };
        case actions.GET_PAYOUT_LOCATION_DETAILS_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
