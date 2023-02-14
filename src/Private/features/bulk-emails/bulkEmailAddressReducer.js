import bulkEmailAddressAction from "./bulkEmailAddressAction";

const getBulkEmailAddressesState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getBulkEmailAddressesReducer = (state = getBulkEmailAddressesState, action) => {
    switch (action.type) {
        case bulkEmailAddressAction.GET_BULK_EMAIL_ADDRESSES:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailAddressAction.GET_BULK_EMAIL_ADDRESSES_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailAddressAction.GET_BULK_EMAIL_ADDRESSES_FAILED:
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

const addBulkEmailAddressInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addBulkEmailAddressReducer = (state = addBulkEmailAddressInitialState, action) => {
    switch (action.type) {
        case bulkEmailAddressAction.ADD_BULK_EMAIL_ADDRESS:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailAddressAction.ADD_BULK_EMAIL_ADDRESS_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailAddressAction.ADD_BULK_EMAIL_ADDRESS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailAddressAction.ADD_BULK_EMAIL_ADDRESS_RESET:
            return addBulkEmailAddressInitialState;
        case bulkEmailAddressAction.OPEN_ADD_BULK_EMAIL_ADDRESS_MODAL:
            return {
                ...state,
                is_modal_open: true,
            };
        case bulkEmailAddressAction.CLOSE_ADD_BULK_EMAIL_ADDRESS_MODAL:
            return addBulkEmailAddressInitialState;
        default:
            return state;
    }
};

const updateBulkEmailAddressInitialState = {
    is_modal_open: false,
    bulk_email_address_id: undefined,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateBulkEmailAddressReducer = (state = updateBulkEmailAddressInitialState, action) => {
    switch (action.type) {
        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS:
            return {
                ...state,
                loading: true,
            };

        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };

        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS_RESET:
            return updateBulkEmailAddressInitialState;

        case bulkEmailAddressAction.OPEN_UPDATE_BULK_EMAIL_ADDRESS_MODAL:
            return {
                ...state,
                is_modal_open: true,
                bulk_email_address_id: action.bulk_email_address_id,
                initial_form_state: action.initial_form_state,
            };

        case bulkEmailAddressAction.CLOSE_UPDATE_BULK_EMAIL_ADDRESS_MODAL:
            return updateBulkEmailAddressInitialState;

        default:
            return state;
    }
};

const updateBulkEmailAddressStatusInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateBulkEmailAddressStatusReducer = (state = updateBulkEmailAddressStatusInitialState, action) => {
    switch (action.type) {
        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS_STATUS:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS_STATUS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS_STATUS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailAddressAction.UPDATE_BULK_EMAIL_ADDRESS_STATUS_RESET:
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

const deleteBulkEmailAddressInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const deleteBulkEmailAddressReducer = (state = deleteBulkEmailAddressInitialState, action) => {
    switch (action.type) {
        case bulkEmailAddressAction.DELETE_BULK_EMAIL_ADDRESS:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailAddressAction.DELETE_BULK_EMAIL_ADDRESS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailAddressAction.DELETE_BULK_EMAIL_ADDRESS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailAddressAction.DELETE_BULK_EMAIL_ADDRESS_RESET:
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

const importBulkEmailAddressInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const importBulkEmailAddressReducer = (state = importBulkEmailAddressInitialState, action) => {
    switch (action.type) {
        case bulkEmailAddressAction.IMPORT_BULK_EMAIL_ADDRESS:
            return {
                ...state,
                loading: true,
            };

        case bulkEmailAddressAction.IMPORT_BULK_EMAIL_ADDRESS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };

        case bulkEmailAddressAction.IMPORT_BULK_EMAIL_ADDRESS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case bulkEmailAddressAction.IMPORT_BULK_EMAIL_ADDRESS_RESET:
            return updateBulkEmailAddressInitialState;

        case bulkEmailAddressAction.OPEN_IMPORT_BULK_EMAIL_ADDRESS_MODAL:
            return {
                ...state,
                is_modal_open: true,
            };

        case bulkEmailAddressAction.CLOSE_IMPORT_BULK_EMAIL_ADDRESS_MODAL:
            return updateBulkEmailAddressInitialState;

        case bulkEmailAddressAction.RESET_IMPORT_BULK_EMAIL_ADDRESS_VALIDATE:
            return {
                ...state,
                success: false,
                response: undefined,
            };

        default:
            return state;
    }
};

const importConfirmBulkEmailAddressInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const importConfirmBulkEmailAddressReducer = (state = importConfirmBulkEmailAddressInitialState, action) => {
    switch (action.type) {
        case bulkEmailAddressAction.IMPORT_CONFIRM_BULK_EMAIL_ADDRESS:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailAddressAction.IMPORT_CONFIRM_BULK_EMAIL_ADDRESS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailAddressAction.IMPORT_CONFIRM_BULK_EMAIL_ADDRESS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailAddressAction.IMPORT_CONFIRM_BULK_EMAIL_ADDRESS_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

export {
    addBulkEmailAddressReducer,
    getBulkEmailAddressesReducer,
    updateBulkEmailAddressReducer,
    deleteBulkEmailAddressReducer,
    importBulkEmailAddressReducer,
    importConfirmBulkEmailAddressReducer,
    updateBulkEmailAddressStatusReducer,
};
