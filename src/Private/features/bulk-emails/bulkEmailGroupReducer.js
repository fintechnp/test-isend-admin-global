import bulkEmailGroupActions from "./bulkEmailGroupActions";

const getBulkEmailGroupsState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getBulkEmailGroupsReducer = (state = getBulkEmailGroupsState, action) => {
    switch (action.type) {
        case bulkEmailGroupActions.GET_BULK_EMAIL_GROUPS:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailGroupActions.GET_BULK_EMAIL_GROUPS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailGroupActions.GET_BULK_EMAIL_GROUPS_FAILED:
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

const addBulkEmailGroupInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addBulkEmailGroupReducer = (state = addBulkEmailGroupInitialState, action) => {
    switch (action.type) {
        case bulkEmailGroupActions.ADD_BULK_EMAIL_GROUP:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailGroupActions.ADD_BULK_EMAIL_GROUP_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailGroupActions.ADD_BULK_EMAIL_GROUP_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailGroupActions.ADD_BULK_EMAIL_GROUP_RESET:
            return {
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case bulkEmailGroupActions.OPEN_ADD_BULK_EMAIL_GROUP_MODAL:
            return {
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case bulkEmailGroupActions.CLOSE_ADD_BULK_EMAIL_GROUP_MODAL:
            return {
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

const updateBulkEmailGroupInitialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateBulkEmailGroupReducer = (state = updateBulkEmailGroupInitialState, action) => {
    switch (action.type) {
        case bulkEmailGroupActions.UPDATE_BULK_EMAIL_GROUP:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailGroupActions.UPDATE_BULK_EMAIL_GROUP_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailGroupActions.UPDATE_BULK_EMAIL_GROUP_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailGroupActions.UPDATE_BULK_EMAIL_GROUP_RESET:
            return {
                is_modal_open: false,
                initial_form_state: undefined,
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        case bulkEmailGroupActions.OPEN_UPDATE_BULK_EMAIL_GROUP_MODAL:
            return {
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case bulkEmailGroupActions.CLOSE_UPDATE_BULK_EMAIL_GROUP_MODAL:
            return {
                is_modal_open: false,
                initial_form_state: undefined,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

const deleteBulkEmailGroupInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const deleteBulkEmailGroupReducer = (state = deleteBulkEmailGroupInitialState, action) => {
    switch (action.type) {
        case bulkEmailGroupActions.DELETE_BULK_EMAIL_GROUP:
            return {
                ...state,
                loading: true,
            };
        case bulkEmailGroupActions.DELETE_BULK_EMAIL_GROUP_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case bulkEmailGroupActions.DELETE_BULK_EMAIL_GROUP_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case bulkEmailGroupActions.DELETE_BULK_EMAIL_GROUP_RESET:
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
    addBulkEmailGroupReducer,
    getBulkEmailGroupsReducer,
    updateBulkEmailGroupReducer,
    deleteBulkEmailGroupReducer,
};
