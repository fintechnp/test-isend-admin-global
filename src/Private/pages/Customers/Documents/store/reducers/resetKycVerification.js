import actions from "../actions";

const initialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.RESET_KYC_VERIFICATION:
            return {
                ...state,
                loading: true,
            };

        case actions.RESET_KYC_VERIFICATION_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.RESET_KYC_VERIFICATION_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case actions.OPEN_RESET_KYC_VERIFICATION_MODAL:
            return {
                ...state,
                is_modal_open: true,
                loading: false,
                success: false,
                error: null,
                response: undefined,
            };
        case actions.CLOSE_RESET_KYC_VERIFICATION_MODAL:
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

export default reducer;
