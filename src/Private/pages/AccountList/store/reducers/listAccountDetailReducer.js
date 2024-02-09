import actions from "../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_Account_Balance_By_ID:
            return {
                ...state,
                loading: true,
            };
        case actions.GET_Account_Balance_By_ID_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.GET_Account_Balance_By_ID_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                response: [],
                error: action.error,
            };
        default:
            return state;
    }
};

export default reducer;
