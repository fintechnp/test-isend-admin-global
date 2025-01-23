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
        case actions.UPDATE_DOCUMENT_FILE:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_DOCUMENT_FILE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.UPDATE_DOCUMENT_FILE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.UPDATE_DOCUMENT_FILE_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };

        case actions.OPEN_UPDATE_DOCUMENT_FILE_MODAL:
            return {
                ...state,
                is_modal_open: true,
            };

        case actions.CLOSE_UPDATE_DOCUMENT_FILE_MODAL:
            return {
                ...state,
                is_modal_open: false,
            };

        default:
            return state;
    }
};

export default reducer;
