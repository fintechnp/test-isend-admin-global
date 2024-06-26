import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_INDIVIDUAL_STAKEHOLDER:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_INDIVIDUAL_STAKEHOLDER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.UPDATE_INDIVIDUAL_STAKEHOLDER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.UPDATE_INDIVIDUAL_STAKEHOLDER_RESET:
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

export default reducer;
