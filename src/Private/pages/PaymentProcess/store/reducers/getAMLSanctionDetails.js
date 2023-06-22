import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_SANCTION_DETAILS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_SANCTION_DETAILS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_SANCTION_DETAILS_FAILED:
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
