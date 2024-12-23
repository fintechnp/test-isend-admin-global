import actions from "../actions";

const initialState = {
    loading: false,
    success: false,
    response: [],
    error: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_SUMMARY_DATA:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_SUMMARY_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response,
                error: null,
            };
        case actions.GET_SUMMARY_DATA_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
