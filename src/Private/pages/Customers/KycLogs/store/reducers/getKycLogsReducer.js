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
        case actions.GET_KYC_LOGS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_KYC_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                response: { ...action.response },
            };
        case actions.GET_MORE_KYC_LOGS:
            return {
                ...state,
                loadingMore: true,
            };
        case actions.GET_MORE_KYC_LOGS_SUCCESS:
            return {
                ...state,
                loading: false,
                loadingMore: false,
                success: true,
                error: null,
                response: {
                    ...action.response,
                    data: [...state.response.data, ...action.response.data],
                },
            };
        case actions.GET_KYC_LOGS_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case actions.GET_KYC_LOGS_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
