import actions from "../actions";

const initialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };

        case actions.OPEN_UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        case actions.CLOSE_UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_MODAL:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
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
