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
        case actions.OPEN_VIEW_SMS_MODAL:
            return {
                ...state,
                is_open: true,
                data: action.payload,
            };

        case actions.CLOSE_VIEW_SMS_MODAL:
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
