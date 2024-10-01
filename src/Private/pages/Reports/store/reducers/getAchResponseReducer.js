import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const getAchResponseReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ACH_ENTRIES_REPORT:
            return {
                ...state,
                loading: true,
            };
        case actions.ACH_ENTRIES_REPORT_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.ACH_ENTRIES_REPORT_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.ACH_ENTRIES_REPORT_RESET:
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

export default getAchResponseReducer;
