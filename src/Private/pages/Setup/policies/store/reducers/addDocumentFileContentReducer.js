import actions from "../actions";

const initialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE:
            return {
                ...state,
                loading: true,
            };
        case actions.CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        case actions.OPEN_ADD_CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE:
            return {
                ...state,
                is_modal_open: true,
            };
        case actions.CLOSE_ADD_CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE:
            return {
                ...state,
                is_modal_open: false,
            };

        default:
            return state;
    }
};

export default reducer;
