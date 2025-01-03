import actions from "../actions";

const initialState = {
    initial_form_state: [],
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case actions.OPEN_GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_state: action.payload,
            };

        case actions.CLOSE_GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE_MODAL:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: [],
            };

        default:
            return state;
    }
};

export default reducer;
