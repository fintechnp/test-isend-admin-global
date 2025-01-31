import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const editEmailConfig = (state = initialState, action) => {
    switch (action.type) {
        case actions.EDIT_EMAIL_CONFIG:
            return {
                ...state,
                loading: true,
            };
        case actions.EDIT_EMAIL_CONFIG_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response,
            };
        case actions.EDIT_EMAIL_CONFIG_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case actions.EDIT_EMAIL_CONFIG_RESET:
            return {
                ...state,
                success: false,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default editEmailConfig;
