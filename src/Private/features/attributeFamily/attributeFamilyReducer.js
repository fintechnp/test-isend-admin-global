import attributeFamilyActions from "./attributeFamilyActions";

const getAttributeFamilyInitialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const getAttributeFamilyReducer = (state = getAttributeFamilyInitialState, action) => {
    switch (action.type) {
        case attributeFamilyActions.GET_ATTRIBUTE_FAMILY_LIST:
            return {
                ...state,
                loading: true,
            };
        case attributeFamilyActions.GET_ATTRIBUTE_FAMILY_LIST_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                error: null,
                response: action.response,
            };
        case attributeFamilyActions.GET_ATTRIBUTE_FAMILY_LIST_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        default:
            return state;
    }
};

const addAttributeFamilyInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addAttributeFamilyReducer = (state = addAttributeFamilyInitialState, action) => {
    switch (action.type) {
        case attributeFamilyActions.ADD_ATTRIBUTE_FAMILY:
            return {
                ...state,
                loading: true,
            };
        case attributeFamilyActions.ADD_ATTRIBUTE_FAMILY_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case attributeFamilyActions.ADD_ATTRIBUTE_FAMILY_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case attributeFamilyActions.ADD_ATTRIBUTE_FAMILY_RESET:
            return addAttributeFamilyInitialState;
        case attributeFamilyActions.OPEN_ADD_ATTRIBUTE_FAMILY_MODAL:
            return {
                ...state,
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case attributeFamilyActions.CLOSE_ADD_ATTRIBUTE_FAMILY_MODAL:
            return {
                ...state,
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

const updateAttributeFamilyInitialState = {
    is_modal_open: false,
    initial_form_data: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateAttributeFamilyReducer = (state = updateAttributeFamilyInitialState, action) => {
    switch (action.type) {
        case attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY:
            return {
                ...state,
                loading: true,
            };
        case attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_data: undefined,
                success: true,
                loading: false,
                error: null,
                response: action.response,
            };
        case attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case attributeFamilyActions.OPEN_UPDATE_ATTRIBUTE_FAMILY_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_data: action.data,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case attributeFamilyActions.CLOSE_UPDATE_ATTRIBUTE_FAMILY_MODAL:
            return {
                ...state,
                is_modal_open: false,
                initial_form_data: undefined,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY_RESET:
            return updateAttributeFamilyInitialState;
        default:
            return state;
    }
};

const deleteAttributeFamilyInitialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const deleteAttributeFamilyReducer = (state = deleteAttributeFamilyInitialState, action) => {
    switch (action.type) {
        case attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY:
            return {
                ...state,
                loading: true,
            };
        case attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: null,
            };
        default:
            return state;
    }
};

export {
    addAttributeFamilyReducer,
    getAttributeFamilyReducer,
    updateAttributeFamilyReducer,
    deleteAttributeFamilyReducer,
};
