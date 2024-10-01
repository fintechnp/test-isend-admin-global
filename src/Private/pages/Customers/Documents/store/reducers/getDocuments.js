import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_DOCUMENTS:
            return {
                ...initialState,
                loading: true,
            };
        case actions.GET_DOCUMENTS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.GET_DOCUMENTS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                response: [],
                error: action.error,
            };
        case actions.GET_DOCUMENTS_RESET:
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
