import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const getIncompleteRegistrationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.INCOMPLETE_REGISTRATION_REPORT:
            return {
                ...state,
                loading: true,
            };
        case actions.INCOMPLETE_REGISTRATION_REPORT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.INCOMPLETE_REGISTRATION_REPORT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.INCOMPLETE_REGISTRATION_REPORT_RESET:
            return {
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        default:
            return state;
    }
};

export default getIncompleteRegistrationReducer;
