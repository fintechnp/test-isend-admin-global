import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_BENEFICIARY:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_BENEFICIARY_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_BENEFICIARY_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                response: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
