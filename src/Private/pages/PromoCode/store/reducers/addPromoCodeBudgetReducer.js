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
        case actions.ADD_PROMO_CODE_BUDGET:
            return {
                ...state,
                loading: true,
            };
        case actions.ADD_PROMO_CODE_BUDGET_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_data: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.ADD_PROMO_CODE_BUDGET_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.ADD_PROMO_CODE_BUDGET_RESET:
            return {
                ...initialState,
            };

        case actions.OPEN_PROMO_CODE_BUDGET_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_data: action.payload,
                success: false,
                loading: false,
                error: null,
                response: [],
            };

        case actions.CLOSE_PROMO_CODE_BUDGET_MODAL:
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
