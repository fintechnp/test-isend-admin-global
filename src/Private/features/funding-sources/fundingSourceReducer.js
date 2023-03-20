import fundingSourceActions from "./fundingSourceActions";

const getFundingSourcesState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const getFundingSourcesReducer = (state = getFundingSourcesState, action) => {
    switch (action.type) {
        case fundingSourceActions.GET_FUNDING_SOURCES:
            return {
                ...state,
                loading: true,
            };
        case fundingSourceActions.GET_FUNDING_SOURCES_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case fundingSourceActions.GET_FUNDING_SOURCES_FAILED:
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

const addFundingSourceInitialState = {
    is_modal_open: false,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const addFundingSourceReducer = (state = addFundingSourceInitialState, action) => {
    switch (action.type) {
        case fundingSourceActions.ADD_FUNDING_SOURCE:
            return {
                ...state,
                loading: true,
            };
        case fundingSourceActions.ADD_FUNDING_SOURCE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                success: true,
                loading: false,
                response: action.response,
            };
        case fundingSourceActions.ADD_FUNDING_SOURCE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case fundingSourceActions.ADD_FUNDING_SOURCE_RESET:
            return {
                is_modal_open: false,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case fundingSourceActions.OPEN_ADD_FUNDING_SOURCE_MODAL:
            return {
                is_modal_open: true,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case fundingSourceActions.CLOSE_ADD_FUNDING_SOURCE_MODAL:
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

const updateFundingSourceInitialState = {
    is_modal_open: false,
    initial_form_state: undefined,
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateFundingSourceReducer = (state = updateFundingSourceInitialState, action) => {
    switch (action.type) {
        case fundingSourceActions.UPDATE_FUNDING_SOURCE:
            return {
                ...state,
                loading: true,
            };
        case fundingSourceActions.UPDATE_FUNDING_SOURCE_SUCCESS:
            return {
                ...state,
                is_modal_open: false,
                initial_form_state: undefined,
                success: true,
                loading: false,
                response: action.response,
            };
        case fundingSourceActions.UPDATE_FUNDING_SOURCE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case fundingSourceActions.UPDATE_FUNDING_SOURCE_RESET:
            return {
                is_modal_open: false,
                initial_form_state: undefined,
                success: false,
                loading: false,
                error: null,
                response: [],
            };
        case fundingSourceActions.OPEN_UPDATE_FUNDING_SOURCE_MODAL:
            return {
                is_modal_open: true,
                initial_form_state: action.payload,
                success: false,
                loading: false,
                error: null,
                response: undefined,
            };
        case fundingSourceActions.CLOSE_UPDATE_FUNDING_SOURCE_MODAL:
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

const updateFundingSourceStatusInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const updateFundingSourceStatusReducer = (state = updateFundingSourceStatusInitialState, action) => {
    switch (action.type) {
        case fundingSourceActions.UPDATE_FUNDING_SOURCE_STATUS:
            return {
                ...state,
                loading: true,
            };
        case fundingSourceActions.UPDATE_FUNDING_SOURCE_STATUS_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case fundingSourceActions.UPDATE_FUNDING_SOURCE_STATUS_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case fundingSourceActions.UPDATE_FUNDING_SOURCE_STATUS_RESET:
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

const deleteFundingSourceInitialState = {
    success: false,
    loading: false,
    error: null,
    response: undefined,
};

const deleteFundingSourceReducer = (state = deleteFundingSourceInitialState, action) => {
    switch (action.type) {
        case fundingSourceActions.DELETE_FUNDING_SOURCE:
            return {
                ...state,
                loading: true,
            };
        case fundingSourceActions.DELETE_FUNDING_SOURCE_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case fundingSourceActions.DELETE_FUNDING_SOURCE_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case fundingSourceActions.DELETE_FUNDING_SOURCE_RESET:
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

export {
    getFundingSourcesReducer,
    addFundingSourceReducer,
    updateFundingSourceReducer,
    deleteFundingSourceReducer,
    updateFundingSourceStatusReducer,
};
