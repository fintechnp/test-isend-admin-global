import actions from "../../store/actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CUSTOMERS_BY_PARTNER:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_CUSTOMERS_BY_PARTNER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_CUSTOMERS_BY_PARTNER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.GET_CUSTOMERS_BY_PARTNER_RESET:
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
