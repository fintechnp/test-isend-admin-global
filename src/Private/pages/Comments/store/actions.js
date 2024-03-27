const actions = {
    GET_COMMENT: "GET_COMMENT",
    GET_COMMENT_SUCCESS: "GET_COMMENT_SUCCESS",
    GET_COMMENT_FAILURE: "GET_COMMENT_FAILURE",
    GET_COMMENT_RESET: "GET_COMMENT_RESET",

    ADD_COMMENT: "ADD_COMMENT",
    ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
    ADD_COMMENT_FAILURE: "ADD_COMMENT_FAILURE",
    ADD_COMMENT_RESET: "ADD_COMMENT_RESET",

    get_all_comments: () => ({ type: actions.GET_COMMENT, query }),

    add_comment: (data) => ({ type: actions.ADD_COMMENT, data }),
};

export default actions;