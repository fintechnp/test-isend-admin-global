import documentAcceptanceActions from "./documentAcceptanceActions";

const getDocumentAcceptanceInitialState = () => ({
    success: false,
    loading: false,
    error: null,
    response: undefined,
});

const getDocumentAcceptanceReducer = (state = getDocumentAcceptanceInitialState, action) => {
    switch (action.type) {
        case documentAcceptanceActions.GET_DOCUMENT_ACCEPTANCE_LIST:
            return {
                ...state,
                loading: true,
            };
        case documentAcceptanceActions.GET_DOCUMENT_ACCEPTANCE_LIST_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case documentAcceptanceActions.GET_DOCUMENT_ACCEPTANCE_LIST_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case documentAcceptanceActions.GET_DOCUMENT_ACCEPTANCE_LIST_RESET: {
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        }
        default:
            return state;
    }
};

const addDocumentAcceptanceInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addDocumentAcceptanceReducer = (state = addDocumentAcceptanceInitialState, action) => {
    switch (action.type) {
        case documentAcceptanceActions.ADD_DOCUMENT_ACCEPTANCE:
            return {
                ...state,
                loading: true,
            };
        case documentAcceptanceActions.ADD_DOCUMENT_ACCEPTANCE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.payload,
            };
        case documentAcceptanceActions.ADD_DOCUMENT_ACCEPTANCE_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case documentAcceptanceActions.ADD_DOCUMENT_ACCEPTANCE_RESET:
            return {
                ...addDocumentAcceptanceInitialState,
            };
        case documentAcceptanceActions.CLOSE_ADD_DOCUMENT_ACCEPTANCE_MODAL:
            return {
                ...state,
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case documentAcceptanceActions.OPEN_ADD_DOCUMENT_ACCEPTANCE_MODAL:
            return {
                ...state,
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

const updateDocumentAcceptanceInitialState = {
    is_modal_open: false,
    initial_form_data: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateDocumentAcceptanceReducer = (state = updateDocumentAcceptanceInitialState, action) => {
    switch (action.type) {
        case documentAcceptanceActions.UPDATE_DOCUMENT_ACCEPTANCE:
            return {
                ...state,
                loading: true,
            };
        case documentAcceptanceActions.UPDATE_DOCUMENT_ACCEPTANCE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_data: undefined,
                success: true,
                loading: false,
                response: action.payload,
            };
        case documentAcceptanceActions.UPDATE_DOCUMENT_ACCEPTANCE_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case documentAcceptanceActions.UPDATE_DOCUMENT_ACCEPTANCE_RESET:
            return {
                ...updateDocumentAcceptanceInitialState,
            };
        case documentAcceptanceActions.OPEN_UPDATE_DOCUMENT_ACCEPTANCE_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_data: action.payload,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case documentAcceptanceActions.CLOSE_UPDATE_DOCUMENT_ACCEPTANCE_MODAL:
            return {
                ...state,
                is_modal_open: false,
                initial_form_data: undefined,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

export { getDocumentAcceptanceReducer, addDocumentAcceptanceReducer, updateDocumentAcceptanceReducer };
