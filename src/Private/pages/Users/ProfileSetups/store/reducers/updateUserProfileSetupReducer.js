import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const updateUserProfileSetupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_USER_PROFILE_SETUP:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_USER_PROFILE_SETUP_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.UPDATE_USER_PROFILE_SETUP_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.UPDATE_USER_PROFILE_SETUP_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: null,
            };
        default:
            return state;
    }
};

export default updateUserProfileSetupReducer;
