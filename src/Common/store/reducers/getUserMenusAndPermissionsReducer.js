import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const getUserMenusAndPermissionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_USER_MENUS_AND_PERMISSIONS:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_USER_MENUS_AND_PERMISSIONS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_USER_MENUS_AND_PERMISSIONS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.GET_USER_MENUS_AND_PERMISSIONS_RESET:
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

export default getUserMenusAndPermissionsReducer;
