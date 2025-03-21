import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE:
            return {
                ...state,
                loading: true,
            };
        case actions.DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE_RESET:
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
