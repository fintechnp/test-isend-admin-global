import actions from "../actions";

const initialState = {
    params: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CHANGE_DASHBOARD_FILTER_PARAMS:
            return {
                params: action.query,
            };
        default:
            return state;
    }
};

export default reducer;
