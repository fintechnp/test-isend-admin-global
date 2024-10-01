import emailTemplateActions from "../emailTemplateActions";

const getEmailElementInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getEmailElementReducer = (state = getEmailElementInitialState, action) => {
    switch (action.type) {
        case emailTemplateActions.GET_EMAIL_ELEMENT:
            return {
                ...state,
                loading: true,
            };
        case emailTemplateActions.GET_EMAIL_ELEMENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case emailTemplateActions.GET_EMAIL_ELEMENT_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

const addEmailElementInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addEmailElementReducer = (state = addEmailElementInitialState, action) => {
    switch (action.type) {
        case emailTemplateActions.ADD_EMAIL_ELEMENT:
            return {
                ...state,
                loading: true,
            };
        case emailTemplateActions.ADD_EMAIL_ELEMENT_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case emailTemplateActions.ADD_EMAIL_ELEMENT_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case emailTemplateActions.ADD_EMAIL_ELEMENT_RESET:
            return {
                ...addEmailElementInitialState,
            };
        case emailTemplateActions.OPEN_ADD_EMAIL_ELEMENT_MODAL:
            return {
                ...state,
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case emailTemplateActions.CLOSE_ADD_EMAIL_ELEMENT_MODAL:
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

const updateEmailElementInitialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateEmailElementReducer = (state = updateEmailElementInitialState, action) => {
    switch (action.type) {
        case emailTemplateActions.UPDATE_EMAIL_ELEMENT:
            return {
                ...state,
                loading: true,
            };
        case emailTemplateActions.UPDATE_EMAIL_ELEMENT_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case emailTemplateActions.UPDATE_EMAIL_ELEMENT_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case emailTemplateActions.UPDATE_EMAIL_ELEMENT_RESET:
            return {
                ...updateEmailElementInitialState,
            };
        case emailTemplateActions.OPEN_UPDATE_EMAIL_ELEMENT_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case emailTemplateActions.CLOSE_UPDATE_EMAIL_ELEMENT_MODAL:
            return {
                ...state,
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

export { getEmailElementReducer, addEmailElementReducer, updateEmailElementReducer };
