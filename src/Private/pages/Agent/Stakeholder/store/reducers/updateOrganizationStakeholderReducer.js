import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.UPDATE_ORGANIZATION_STAKEHOLDER:
            return {
                ...state,
                loading: true,
            };
        case actions.UPDATE_ORGANIZATION_STAKEHOLDER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.UPDATE_ORGANIZATION_STAKEHOLDER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.UPDATE_ORGANIZATION_STAKEHOLDER_RESET:
            return initialState;
        default:
            return state;
    }
};

export default reducer;
