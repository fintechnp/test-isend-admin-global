import actions from "../../actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_PARTNER:
            return {
                ...state,
                loading: true,
            };
        case actions.ADD_PARTNER_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.ADD_PARTNER_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: true,
            };
        case actions.ADD_PARTNER_RESET:
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
