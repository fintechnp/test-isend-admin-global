import countryActions from "./countryActions";

// Initial state for getCountryReducer
const getCountryState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

// Reducer to handle getting countries
const getCountryReducer = (state = getCountryState, action) => {
    switch (action.type) {
        case countryActions.GET_COUNTRIES:
            return {
                ...state,
                loading: true,
            };
        case countryActions.GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case countryActions.GET_COUNTRIES_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        default:
            return state;
    }
};

// Initial state for addCountryReducer
const addCountryInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

// Reducer to handle adding countries
const addCountryReducer = (state = addCountryInitialState, action) => {
    switch (action.type) {
        case countryActions.ADD_COUNTRY:
            return {
                ...state,
                loading: true,
            };
        case countryActions.ADD_COUNTRY_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case countryActions.ADD_COUNTRY_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.error,
            };
        case countryActions.ADD_COUNTRY_RESET:
            return {
                ...addCountryInitialState,
            };
        case countryActions.OPEN_ADD_COUNTRY_MODAL:
            return {
                ...state,
                is_modal_open: true,
                loading: false,
                success: false,
                error: null,
                response: undefined,
            };
        case countryActions.CLOSE_ADD_COUNTRY_MODAL:
            return {
                ...state,
                is_modal_open: false,
                loading: false,
                success: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

// Initial state for updateCountryReducer
const updateCountryReducerInitialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

// Reducer to handle updating countries
const updateCountryReducer = (state = updateCountryReducerInitialState, action) => {
    switch (action.type) {
        case countryActions.UPDATE_COUNTRY:
            return {
                ...state,
                loading: true,
            };
        case countryActions.UPDATE_COUNTRY_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case countryActions.UPDATE_COUNTRY_FAILURE:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case countryActions.UPDATE_COUNTRY_RESET:
            return {
                ...updateCountryReducerInitialState,
            };
        case countryActions.OPEN_UPDATE_COUNTRY_MODAL:
            return {
                ...state,
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case countryActions.CLOSE_UPDATE_COUNTRY_MODAL:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

export { getCountryReducer, addCountryReducer, updateCountryReducer };
