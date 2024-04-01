const actions = {
    GET_ATTACHMENT: "GET_ATTACHMENT",
    GET_ATTACHMENT_SUCCESS: "GET_ATTACHMENT_SUCCESS",
    GET_ATTACHMENT_FAILURE: "GET_ATTACHMENT_FAILURE",
    GET_ATTACHMENT_RESET: "GET_ATTACHMENT_RESET",

    ADD_ATTACHMENT: "ADD_ATTACHMENT",
    ADD_ATTACHMENT_SUCCESS: "ADD_ATTACHMENT_SUCCESS",
    ADD_ATTACHMENT_FAILURE: "ADD_ATTACHMENT_FAILURE",
    ADD_ATTACHMENT_RESET: "ADD_ATTACHMENT_RESET",

    get_all_attachments: (query) => ({ type: actions.GET_ATTACHMENT, query }),

    add_attachment: (data) => ({ type: actions.ADD_ATTACHMENT, data }),
};

export default actions;
