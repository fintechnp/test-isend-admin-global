import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_HELP_CENTERS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_HELP_CENTERS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response,
                error: null,
            };
        case actions.GET_HELP_CENTERS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                response: null,
                error: action.error,
            };
        case actions.GET_HELP_CENTERS_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
