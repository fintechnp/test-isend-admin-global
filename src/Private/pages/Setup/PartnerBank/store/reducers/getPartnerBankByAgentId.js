import actions from '../actions';

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch ((action).type) {
        case actions.GET_PARTNER_BANK_AGENT_ID:
            return {
                ...state,
                loading: true
            };
        case actions.GET_PARTNER_BANK_AGENT_ID_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response
            };
        case actions.GET_PARTNER_BANK_AGENT_ID_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error
            };
        case actions.GET_PARTNER_BANK_AGENT_ID_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        default:
            return state;
    }
}

export default reducer;