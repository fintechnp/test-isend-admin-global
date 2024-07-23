import actions from "../actions.js";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_INDIVIDUAL_STAKEHOLDER:
            return {
                ...state,
                loading: true,
            };
        case actions.ADD_INDIVIDUAL_STAKEHOLDER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.ADD_INDIVIDUAL_STAKEHOLDER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.ADD_INDIVIDUAL_STAKEHOLDER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
