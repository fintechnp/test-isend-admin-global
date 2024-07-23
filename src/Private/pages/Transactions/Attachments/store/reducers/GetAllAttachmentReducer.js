import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_ATTACHMENT:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_ATTACHMENT_SUCCESS: {
            return {
                ...state,
                loading: false,
                success: true,
                response: action.response,
            };
        }
        case actions.GET_ATTACHMENT_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
