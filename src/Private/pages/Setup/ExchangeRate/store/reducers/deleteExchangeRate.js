import actions from '../actions';

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch ((action).type) {
        case actions.DELETE_EXCHANGE_RATE:
            return {
                ...state,
                loading: true
            };
        case actions.DELETE_EXCHANGE_RATE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response
            };
        case actions.DELETE_EXCHANGE_RATE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default reducer;