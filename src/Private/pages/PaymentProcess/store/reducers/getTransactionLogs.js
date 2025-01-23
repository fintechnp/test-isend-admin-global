import actions from "../actions";

const initialState = {
    isOpen: false,
    initial_form_data: undefined,
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.OPEN_TRANSACTIONS_LOGS_MODAL:
            return {
                ...state,
                isOpen: true,
                initial_form_data: action.payload,
            };
        case actions.CLOSE_TRANSACTIONS_LOGS_MODAL:
            return {
                ...state,
                isOpen: false,
            };
        default:
            return state;
    }
};

export default reducer;
