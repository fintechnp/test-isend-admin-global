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
        case actions.KYC_VERIFICATION_LIMIT:
            return {
                ...state,
                loading: true,
            };

        case actions.KYC_VERIFICATION_LIMIT_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.KYC_VERIFICATION_LIMIT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };

        case actions.KYC_VERIFICATION_LIMIT_RESET:
            return {
                ...state,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };

        case actions.OPEN_KYC_VERIFICATION_LIMIT_MODAL:
            return {
                ...state,
                is_modal_open: true,
                loading: false,
                success: false,
                error: null,
                response: undefined,
            };
        case actions.CLOSE_KYC_VERIFICATION_LIMIT_MODAL:
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
