import actions from "../actions";

const initialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CREATE_HELP_CENTER:
            return {
                ...state,
                loading: true,
            };
        case actions.CREATE_HELP_CENTER_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                loading: false,
                success: true,
                response: action.response,
                error: null,
            };
        case actions.CREATE_HELP_CENTER_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                response: null,
                error: action.error,
            };
        case actions.CREATE_HELP_CENTER_RESET:
            return {
                ...initialState,
            };
        case actions.OPEN_ADD_HELP_CENTER_MODAL:
            return {
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: null,
            };
        case actions.CLOSE_ADD_HELP_CENTER_MODAL:
            return {
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: null,
            };
        default:
            return state;
    }
};

export default reducer;
