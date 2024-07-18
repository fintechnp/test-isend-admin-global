import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    country: null,
    error: null,
    response: null,
};

const getCountryValidationRulesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_COUNTRY_VALIDATION_RULES:
            return {
                ...initialState,
                loading: true,
                country: action.country,
            };
        case actions.GET_COUNTRY_VALIDATION_RULES_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case actions.GET_COUNTRY_VALIDATION_RULES_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        case actions.GET_COUNTRY_VALIDATION_RULES_RESET:
            return initialState;
        default:
            return state;
    }
};

export default getCountryValidationRulesReducer;
