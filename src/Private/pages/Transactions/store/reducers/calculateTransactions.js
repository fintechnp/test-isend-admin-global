import actions from "../../../Customers/Search/store/actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CALCULATE_TRANSACTIONS:
            return {
                ...state,
                loading: true,
            };
        case actions.CALCULATE_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.CALCULATE_TRANSACTIONS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.CALCULATE_TRANSACTIONS_RESET:
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
