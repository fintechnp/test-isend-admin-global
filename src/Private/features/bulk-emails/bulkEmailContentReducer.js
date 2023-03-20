import bulkEmailContentAction from "./bulkEmailContentAction";

const getBulkEmailContentsState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getBulkEmailContentsReducer = (state = getBulkEmailContentsState, action) => {
    switch (action.type) {
        case bulkEmailContentAction.GET_BULK_EMAIL_CONTENTS:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailContentAction.GET_BULK_EMAIL_CONTENTS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailContentAction.GET_BULK_EMAIL_CONTENTS_FAILED:
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

const addBulkEmailContentInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addBulkEmailContentReducer = (state = addBulkEmailContentInitialState, action) => {
    switch (action.type) {
        case bulkEmailContentAction.ADD_BULK_EMAIL_CONTENT:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailContentAction.ADD_BULK_EMAIL_CONTENT_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailContentAction.ADD_BULK_EMAIL_CONTENT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailContentAction.ADD_BULK_EMAIL_CONTENT_RESET:
            return addBulkEmailContentInitialState;
        case bulkEmailContentAction.OPEN_ADD_BULK_EMAIL_CONTENT_MODAL:
            return {
                ...state,
                is_modal_open: true,
            };
        case bulkEmailContentAction.CLOSE_ADD_BULK_EMAIL_CONTENT_MODAL:
            return addBulkEmailContentInitialState;
        default:
            return state;
    }
};

const updateBulkEmailContentInitialState = {
    is_modal_open: false,
    bulk_email_content_id: undefined,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateBulkEmailContentReducer = (state = updateBulkEmailContentInitialState, action) => {
    switch (action.type) {
        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT:
            return {
                ...state,
                loading: true,
            };

        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };

        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT_RESET:
            return updateBulkEmailContentInitialState;

        case bulkEmailContentAction.OPEN_UPDATE_BULK_EMAIL_CONTENT_MODAL:
            return {
                ...state,
                is_modal_open: true,
                bulk_email_content_id: action.bulk_email_content_id,
                initial_form_state: action.initial_form_state,
            };

        case bulkEmailContentAction.CLOSE_UPDATE_BULK_EMAIL_CONTENT_MODAL:
            return updateBulkEmailContentInitialState;

        default:
            return state;
    }
};

const updateBulkEmailContentStatusInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateBulkEmailContentStatusReducer = (state = updateBulkEmailContentStatusInitialState, action) => {
    switch (action.type) {
        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT_STATUS:
            return {
                ...state,
                loading: true,
            };

        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT_STATUS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };

        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT_STATUS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case bulkEmailContentAction.UPDATE_BULK_EMAIL_CONTENT_STATUS_RESET:
            return updateBulkEmailContentStatusInitialState;

        default:
            return state;
    }
};

const deleteBulkEmailContentInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const deleteBulkEmailContentReducer = (state = deleteBulkEmailContentInitialState, action) => {
    switch (action.type) {
        case bulkEmailContentAction.DELETE_BULK_EMAIL_CONTENT:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailContentAction.DELETE_BULK_EMAIL_CONTENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailContentAction.DELETE_BULK_EMAIL_CONTENT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailContentAction.DELETE_BULK_EMAIL_CONTENT_RESET:
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

const viewBulkEmailContentInitialState = {
    is_modal_open: false,
    bulk_email_content_id: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const viewBulkEmailContentReducer = (state = viewBulkEmailContentInitialState, action) => {
    switch (action.type) {
        case bulkEmailContentAction.VIEW_BULK_EMAIL_CONTENT:
            return {
                ...state,
                loading: true,
            };

        case bulkEmailContentAction.VIEW_BULK_EMAIL_CONTENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };

        case bulkEmailContentAction.VIEW_BULK_EMAIL_CONTENT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case bulkEmailContentAction.VIEW_BULK_EMAIL_CONTENT_RESET:
            return viewBulkEmailContentInitialState;

        case bulkEmailContentAction.OPEN_VIEW_BULK_EMAIL_CONTENT_MODAL:
            return {
                ...state,
                is_modal_open: true,
                bulk_email_content_id: action.bulk_email_content_id,
            };

        case bulkEmailContentAction.CLOSE_VIEW_BULK_EMAIL_CONTENT_MODAL:
            return viewBulkEmailContentInitialState;

        default:
            return state;
    }
};

const sendBulkEmailContentInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const sendBulkEmailContentReducer = (state = sendBulkEmailContentInitialState, action) => {
    switch (action.type) {
        case bulkEmailContentAction.SEND_BULK_EMAIL_CONTENT:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailContentAction.SEND_BULK_EMAIL_CONTENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailContentAction.SEND_BULK_EMAIL_CONTENT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailContentAction.SEND_BULK_EMAIL_CONTENT_RESET:
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

export {
    addBulkEmailContentReducer,
    getBulkEmailContentsReducer,
    updateBulkEmailContentReducer,
    deleteBulkEmailContentReducer,
    updateBulkEmailContentStatusReducer,
    viewBulkEmailContentReducer,
    sendBulkEmailContentReducer,
};
