import actions from "../actions";

const initialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_HELP_CENTER:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_HELP_CENTER_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                loading: false,
                success: true,
                response: action.response,
                error: null,
            };
        case actions.UPDATE_HELP_CENTER_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                response: null,
                error: action.error,
            };
        case actions.UPDATE_HELP_CENTER_RESET:
            return {
                ...initialState,
            };
        case actions.OPEN_UPDATE_HELP_CENTER_MODAL:
            return {
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: null,
            };
        case actions.CLOSE_UPDATE_HELP_CENTER_MODAL:
            return {
                is_modal_open: false,
                initial_form_state: undefined,
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
