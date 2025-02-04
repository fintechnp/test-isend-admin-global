import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    loadingMore: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_KYC_LOG_GREEN_ID:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_KYC_LOG_GREEN_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                response: { ...action.response },
            };
        case actions.GET_KYC_LOG_GREEN_ID_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
                response: null,
            };
        case actions.GET_KYC_LOG_GREEN_ID_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
