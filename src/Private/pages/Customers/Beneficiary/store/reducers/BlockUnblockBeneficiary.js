import actions from "../../store/actions";

const initialState = {
    success: false,
    loading: false,
    error: null,
    response: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.BLOCK_UNBLOCK_BENEFICIARY:
            return {
                ...state,
                loading: true,
            };
        case actions.BLOCK_UNBLOCK_BENEFICIARY_SUCCESS:
            return {
                ...state,
                success: true,
                loading: false,
                response: action.response,
            };
        case actions.BLOCK_UNBLOCK_BENEFICIARY_FAILED:
            return {
                ...state,
                success: false,
                loading: false,
                error: action.error,
            };
        case actions.BLOCK_UNBLOCK_BENEFICIARY_RESET:
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
