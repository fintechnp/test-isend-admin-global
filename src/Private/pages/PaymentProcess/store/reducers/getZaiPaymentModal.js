import actions from "../actions";

const initialState = {
    is_modal_open: false,
    initial_form_data: undefined,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.OPEN_ZAI_PAYMENT_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_data: action.payload,
                success: false,
                loading: false,
                error: null,
                response: [],
            };

        case actions.CLOSE_PAYMENT_MODAL_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_data: undefined,
                success: false,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export default reducer;
