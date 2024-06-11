import actions from "../../store/actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
    isFilterOpen: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_CUSTOMERS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null
            };
        case actions.GET_CUSTOMERS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                response: null,
                error: action.error,
            };
        case actions.GET_CUSTOMERS_RESET:
            return {
                ...initialState,
            };

        case actions.OPEN_FILTER:
            return {
                ...state,
                isFilterOpen: true,
            };

        case actions.CLOSE_FILTER:
            return {
                ...state,
                isFilterOpen: false,
            };
        default:
            return state;
    }
};

export default reducer;
