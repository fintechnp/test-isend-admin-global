import actions from "../actions";

const initialState = {
    success: false,
    error: null,
    loading: false,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPLOAD_PROFILE_PICTURE:
            return {
                ...state,
                loading: true,
            };
        case actions.UPLOAD_PROFILE_PICTURE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.UPLOAD_PROFILE_PICTURE_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.UPLOAD_PROFILE_PICTURE_RESET:
            return {
                ...initialState,
            };
        default:
            return state;
    }
};

export default reducer;
