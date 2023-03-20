import actions from "./../actions";

const initialState = {
    mode: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_THEME:
            return {
                ...state,
                mode: action.mode,
            };
        default:
            return state;
    }
};

export default reducer;
