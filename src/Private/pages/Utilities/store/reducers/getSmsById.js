import actions from "../actions";

const initialState = {
    success: false,
    is_modal_open: false,
    initial_form_state: undefined,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_SMS_BYID:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_SMS_BYID_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };

        case actions.OPEN_GET_SMS_BYID_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_state: action.payload,
                loading: false,
                success: false,
                error: null,
                response: [],
            };
        default:
            return state;
    }
};

export default reducer;
