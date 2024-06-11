import emailTemplateActions from "../emailTemplateActions";

const getEmailTemplateState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getEmailTemplateReducer = (state = getEmailTemplateState, action) => {
    switch (action.type) {
        case emailTemplateActions.GET_EMAIL_TEMPLATE:
            return {
                ...state,
                loading: true,
            };
        case emailTemplateActions.GET_EMAIL_TEMPLATE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case emailTemplateActions.GET_EMAIL_TEMPLATE_FAILURE:
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

const getEmailTemplateTagState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getEmailTemplateTagReducer = (state = getEmailTemplateTagState, action) => {
    switch (action.type) {
        case emailTemplateActions.GET_EMAIL_TEMPLATE_TAG:
            return {
                ...state,
                loading: true,
            };
        case emailTemplateActions.GET_EMAIL_TEMPLATE_TAG_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };

        case emailTemplateActions.GET_EMAIL_TEMPLATE_TAG_FAILURE:
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

const addEmailTemplateInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addEmailTemplateReducer = (state = addEmailTemplateInitialState, action) => {
    switch (action.type) {
        case emailTemplateActions.ADD_EMAIL_TEMPLATE:
            return {
                ...state,
                loading: true,
            };
        case emailTemplateActions.ADD_EMAIL_TEMPLATE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case emailTemplateActions.ADD_EMAIL_TEMPLATE_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case emailTemplateActions.ADD_EMAIL_TEMPLATE_RESET:
            return {
                ...addCEmailTemplateInitialState,
            };
        case emailTemplateActions.OPEN_ADD_EMAIL_TEMPLATE_MODAL:
            return {
                ...state,
                is_modal_open: true,
                loading: false,
                success: false,
                error: null,
                response: undefined,
            };
        case emailTemplateActions.CLOSE_ADD_EMAIL_TEMPLATE_MODAL:
            return {
                ...state,
                is_modal_open: false,
                loading: false,
                success: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

const updateEmailTemplateReducerInitialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateEmailTemplateReducer = (state = updateEmailTemplateReducerInitialState, action) => {
    switch (action.type) {
        case emailTemplateActions.UPDATE_EMAIL_TEMPLATE:
            return {
                ...state,
                loading: true,
            };
        case emailTemplateActions.UPDATE_EMAIL_TEMPLATE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case emailTemplateActions.UPDATE_EMAIL_TEMPLATE_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case emailTemplateActions.UPDATE_EMAIL_TEMPLATE_RESET:
            return {
                ...updateEmailTemplateReducer,
            };
        case emailTemplateActions.OPEN_UPDATE_EMAIL_TEMPLATE_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case emailTemplateActions.CLOSE_UPDATE_EMAIL_TEMPLATE_MODAL:
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

export { addEmailTemplateReducer, getEmailTemplateTagReducer, getEmailTemplateReducer, updateEmailTemplateReducer };
