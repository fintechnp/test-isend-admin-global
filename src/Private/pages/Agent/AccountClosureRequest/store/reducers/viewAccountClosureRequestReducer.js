import actions from "../actions";

const initialState = {
    is_modal_open: false,
    initial_form_data: undefined,
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.OPEN_B2B_ACCOUNT_CLOSURE_VIEW_MODAL:
            return {
                ...state,
                is_open: true,
                data: action.payload,
            };

        case actions.CLOSE_B2B_ACCOUNT_CLOSURE_VIEW_MODAL:
            return {
                ...state,
                is_open: false,
                data: undefined,
            };
        default:
            return state;
    }
};

export default reducer;
