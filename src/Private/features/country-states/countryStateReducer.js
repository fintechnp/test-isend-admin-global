import countryStateActions from "./countryStateActions";

const getCountryStatesState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
    country: null,
};

const getCountryStatesReducer = (state = getCountryStatesState, action) => {
    switch (action.type) {
        case countryStateActions.GET_COUNTRY_STATES:
            return {
                ...getCountryStatesState,
                country: action.country,
                loading: true,
            };
        case countryStateActions.GET_COUNTRY_STATES_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
                error: null,
            };
        case countryStateActions.GET_COUNTRY_STATES_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
                response: null,
            };
        default:
            return state;
    }
};

const addCountryStateInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addCountryStateReducer = (state = addCountryStateInitialState, action) => {
    switch (action.type) {
        case countryStateActions.ADD_COUNTRY_STATE:
            return {
                ...state,
                loading: true,
            };
        case countryStateActions.ADD_COUNTRY_STATE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case countryStateActions.ADD_COUNTRY_STATE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case countryStateActions.ADD_COUNTRY_STATE_RESET:
            return {
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case countryStateActions.OPEN_ADD_COUNTRY_STATE_MODAL:
            return {
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case countryStateActions.CLOSE_ADD_COUNTRY_STATE_MODAL:
            return {
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        default:
            return state;
    }
};

const updateCountryStateInitialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateCountryStateReducer = (state = updateCountryStateInitialState, action) => {
    switch (action.type) {
        case countryStateActions.UPDATE_COUNTRY_STATE:
            return {
                ...state,
                loading: true,
            };
        case countryStateActions.UPDATE_COUNTRY_STATE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case countryStateActions.UPDATE_COUNTRY_STATE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case countryStateActions.UPDATE_COUNTRY_STATE_RESET:
            return {
                is_modal_open: false,
                initial_form_state: undefined,
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        case countryStateActions.OPEN_UPDATE_COUNTRY_STATE_MODAL:
            return {
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case countryStateActions.CLOSE_UPDATE_COUNTRY_STATE_MODAL:
            return {
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

const deleteCountryStateInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const deleteCountryStateReducer = (state = deleteCountryStateInitialState, action) => {
    switch (action.type) {
        case countryStateActions.DELETE_COUNTRY_STATE:
            return {
                ...state,
                loading: true,
            };
        case countryStateActions.DELETE_COUNTRY_STATE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case countryStateActions.DELETE_COUNTRY_STATE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case countryStateActions.DELETE_COUNTRY_STATE_RESET:
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

export { addCountryStateReducer, getCountryStatesReducer, updateCountryStateReducer, deleteCountryStateReducer };
