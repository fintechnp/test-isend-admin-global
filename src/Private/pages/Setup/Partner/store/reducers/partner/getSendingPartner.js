import actions from "../../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_SENDING_PARTNER:
            return {
                ...state,
                query: action.query,
                loading: true,
            };
        case actions.GET_SENDING_PARTNER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.GET_SENDING_PARTNER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
                query: null,
            };
        case actions.GET_SENDING_PARTNER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
