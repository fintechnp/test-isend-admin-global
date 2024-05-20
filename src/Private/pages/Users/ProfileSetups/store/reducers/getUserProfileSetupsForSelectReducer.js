import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const getUserProfileSetupsForSelectReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LIST_USER_PROFILE_SETUP_FOR_SELECT:
            return {
                ...state,
                loading: true,
            };
        case actions.LIST_USER_PROFILE_SETUP_FOR_SELECT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.LIST_USER_PROFILE_SETUP_FOR_SELECT_FAILED:
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

export default getUserProfileSetupsForSelectReducer;
