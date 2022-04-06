import actions from './../actions';

const initialState = {
    dark: false,
};

const reducer = (state = initialState, action) => {
    switch ((action).type) {
        case actions.SET_THEME:
            return {
                ...state,
                dark: action.dark
            };
        default:
            return state;
    }
}

export default reducer;