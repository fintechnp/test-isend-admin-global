import actions from "../actions";

const initialState = {
    is_open: false,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_PARTNER_BANK_BYID:
            return {
                ...state,
                loading: true,
                is_open: true,
            };
        case actions.GET_PARTNER_BANK_BYID_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_PARTNER_BANK_BYID_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.OPEN_GET_PARTNER_BANK_BYID_MODAL:
            return {
                ...state,
                is_open: true,
            };
        case actions.CLOSE_GET_PARTNER_BANK_BYID_MODAL:
            return {
                ...state,
                is_open: false,
            };
        default:
            return state;
    }
};

export default reducer;
