const emailTemplateActions = {
    GET_EMAIL_TEMPLATE: "GET_EMAIL_TEMPLATE",
    GET_EMAIL_TEMPLATE_SUCCESS: "GET_EMAIL_TEMPLATE_SUCCESS",
    GET_EMAIL_TEMPLATE_FAILURE: "GET_EMAIL_TEMPLATE_FAILURE",

    GET_EMAIL_TEMPLATE_TAG: "GET_EMAIL_TEMPLATE_TAG",
    GET_EMAIL_TEMPLATE_TAG_SUCCESS: "GET_EMAIL_TEMPLATE_TAG_SUCCESS",
    GET_EMAIL_TEMPLATE_TAG_FAILURE: "GET_EMAIL_TEMPLATE_TAG_FAILURE",

    ADD_EMAIL_TEMPLATE: "ADD_EMAIL_TEMPLATE",
    ADD_EMAIL_TEMPLATE_SUCCESS: "ADD_EMAIL_TEMPLATE_SUCCESS",
    ADD_EMAIL_TEMPLATE_FAILURE: "ADD_EMAIL_TEMPLATE_FAILURE",
    ADD_EMAIL_TEMPLATE_RESET: "ADD_EMAIL_TEMPLATE_RESET",
    OPEN_ADD_EMAIL_TEMPLATE_MODAL: "OPEN_ADD_EMAIL_TEMPLATE_MODAL",
    CLOSE_ADD_EMAIL_TEMPLATE_MODAL: "CLOSE_ADD_EMAIL_TEMPLATE_MODAL",

    UPDATE_EMAIL_TEMPLATE: "UPDATE_EMAIL_TEMPLATE",
    UPDATE_EMAIL_TEMPLATE_SUCCESS: "UPDATE_EMAIL_TEMPLATE_SUCCESS",
    UPDATE_EMAIL_TEMPLATE_FAILURE: "UPDATE_EMAIL_TEMPLATE_FAILURE",
    UPDATE_EMAIL_TEMPLATE_RESET: "UPDATE_EMAIL_TEMPLATE_RESET",

    OPEN_UPDATE_EMAIL_TEMPLATE_MODAL: "OPEN_UPDATE_EMAIL_TEMPLATE_MODAL",
    CLOSE_UPDATE_EMAIL_TEMPLATE_MODAL: "CLOSE_UPDATE_EMAIL_TEMPLATE_MODAL",

    GET_EMAIL_ELEMENT: "GET_EMAIL_ELEMENT",
    GET_EMAIL_ELEMENT_SUCCESS: "GET_EMAIL_ELEMENT_SUCCESS",
    GET_EMAIL_ELEMENT_FAILURE: "GET_EMAIL_ELEMENT_FAILURE",

    ADD_EMAIL_ELEMENT: "ADD_EMAIL_ELEMENT",
    ADD_EMAIL_ELEMENT_SUCCESS: "ADD_EMAIL_ELEMENT_SUCCESS",
    ADD_EMAIL_ELEMENT_FAILURE: "ADD_EMAIL_ELEMENT_FAILURE",
    OPEN_ADD_EMAIL_ELEMENT_MODAL: "OPEN_ADD_EMAIL_ELEMENT_MODAL",
    CLOSE_ADD_EMAIL_ELEMENT_MODAL: "CLOSE_ADD_EMAIL_ELEMENT_MODAL",
    ADD_EMAIL_ELEMENT_RESET: "ADD_EMAIL_ELEMENT_RESET",

    UPDATE_EMAIL_ELEMENT: "UPDATE_EMAIL_ELEMENT",
    UPDATE_EMAIL_ELEMENT_SUCCESS: "UPDATE_EMAIL_ELEMENT_SUCCESS",
    UPDATE_EMAIL_ELEMENT_FAILURE: "UPDATE_EMAIL_ELEMENT_FAILURE",
    UPDATE_EMAIL_ELEMENT_RESET: "UPDATE_EMAIL_ELEMENT_RESET",
    OPEN_UPDATE_EMAIL_ELEMENT_MODAL: "OPEN_UPDATE_EMAIL_ELEMENT_MODAL",
    CLOSE_UPDATE_EMAIL_ELEMENT_MODAL: "CLOSE_UPDATE_EMAIL_ELEMENT_MODAL",

    get_email_templates: (query) => ({
        type: emailTemplateActions.GET_EMAIL_TEMPLATE,
        query,
    }),

    get_email_template_tags: (query) => ({
        type: emailTemplateActions.GET_EMAIL_TEMPLATE_TAG,
        query,
    }),

    add_email_template: (data) => ({
        type: emailTemplateActions.ADD_EMAIL_TEMPLATE,
        data,
    }),

    update_email_template: (id, data) => ({
        type: emailTemplateActions.UPDATE_EMAIL_TEMPLATE,
        data,
        id,
    }),

    get_email_element: (query) => ({
        type: emailTemplateActions.GET_EMAIL_ELEMENT,
        query,
    }),

    add_email_element: (data) => ({
        type: emailTemplateActions.ADD_EMAIL_ELEMENT,
        data,
    }),

    update_email_element: (id, data) => ({
        type: emailTemplateActions.UPDATE_EMAIL_ELEMENT,
        data,
        id,
    }),
};

export default emailTemplateActions;
