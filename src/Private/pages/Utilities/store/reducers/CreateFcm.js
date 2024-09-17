import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CREATE_FCM:
            return {
                ...state,
                loading: true,
            };
        case actions.CREATE_FCM_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.CREATE_FCM_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.CREATE_FCM_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };

        case actions.OPEN_ADD_FCM_MODAL:
            return {
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case actions.CLOSE_ADD_FCM_MODAL:
            return {
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };

        default:
            return state;
    }
};

export default reducer;
