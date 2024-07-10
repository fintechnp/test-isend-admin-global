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
        case actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                loading: false,
                success: true,
                response: action.response,
                error: null,
            };
        case actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                response: null,
                error: action.error,
            };
        case actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_RESET:
            return {
                ...initialState,
            };

        default:
            return state;
    }
};

export default reducer;
