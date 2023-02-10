import customerActions from "./customerActions";

const updateCustomerInitialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

export const updateCustomerAccountReducer = (state = updateCustomerInitialState, action) => {
    switch (action.type) {
        case customerActions.UPDATE_CUSTOMER_ACCOUNT:
            return {
                ...state,
                loading: true,
            };
        case customerActions.UPDATE_CUSTOMER_ACCOUNT_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case customerActions.UPDATE_CUSTOMER_ACCOUNT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case customerActions.UPDATE_CUSTOMER_ACCOUNT_RESET:
            return {
                ...updateCustomerInitialState,
            };
        case customerActions.OPEN_UPDATE_CUSTOMER_ACCOUNT_MODAL:
            return {
                is_modal_open: true,
                initial_form_state: action.data,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case customerActions.CLOSE_UPDATE_CUSTOMER_ACCOUNT_MODAL:
            return {
                ...updateCustomerInitialState,
            };
        default:
            return state;
    }
};
