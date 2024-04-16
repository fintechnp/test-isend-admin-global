import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_COMMENT:
            return {
                ...state,
                loading: true,
            };
        case actions.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.ADD_COMMENT_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.ADD_COMMENT_RESET:
            return {
                ...state,
                success: false,
                loading: false,
                error: false,
                response :[]
            };
        default:
            return state;
    }
};

export default reducer;
