import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPLOAD_ATTACHMENT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };

        case actions.UPLOAD_ATTACHMENT_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.UPLOAD_ATTACHMENT_RESET:
            return {
                ...state,
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        default:
            return state;
    }
};

export default reducer;
