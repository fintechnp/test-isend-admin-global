import actions from '../actions';

const initialState = {
    response: [],
};

const reducer = (state = initialState, action) => {
    switch ((action).type) {
        case actions.SET_TOAST_DATA:
            return {
                ...state,
                response: action.response
            };
        case actions.RESET_TOAST_DATA:
            return {
                response: [],
            };
        default:
            return state;
    }
}

export default reducer;