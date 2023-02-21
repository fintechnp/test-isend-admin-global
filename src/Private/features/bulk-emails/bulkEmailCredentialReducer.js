import bulkEmailCredentialAction from "./bulkEmailCredentialAction";

const getBulkEmailCredentialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getBulkEmailCredentialReducer = (state = getBulkEmailCredentialState, action) => {
    switch (action.type) {
        case bulkEmailCredentialAction.GET_BULK_EMAIL_CREDENTIAL:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailCredentialAction.GET_BULK_EMAIL_CREDENTIAL_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailCredentialAction.GET_BULK_EMAIL_CREDENTIAL_FAILED:
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

const updateBulkEmailCredentialInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateBulkEmailCredentialReducer = (state = updateBulkEmailCredentialInitialState, action) => {
    switch (action.type) {
        case bulkEmailCredentialAction.UPDATE_BULK_EMAIL_CREDENTIAL:
            return {
                ...state,
                loading: true,
            };

        case bulkEmailCredentialAction.UPDATE_BULK_EMAIL_CREDENTIAL_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };

        case bulkEmailCredentialAction.UPDATE_BULK_EMAIL_CREDENTIAL_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case bulkEmailCredentialAction.UPDATE_BULK_EMAIL_CREDENTIAL_RESET:
            return updateBulkEmailCredentialInitialState;

        default:
            return state;
    }
};

export { getBulkEmailCredentialReducer, updateBulkEmailCredentialReducer };
