const documentAcceptanceActions = {
    GET_DOCUMENT_ACCEPTANCE_LIST: "GET_DOCUMENT_ACCEPTANCE_LIST",
    GET_DOCUMENT_ACCEPTANCE_LIST_SUCCESS: "GET_DOCUMENT_ACCEPTANCE_LIST_SUCCESS",
    GET_DOCUMENT_ACCEPTANCE_LIST_FAILURE: "GET_DOCUMENT_ACCEPTANCE_LIST_FAILURE",
    GET_DOCUMENT_ACCEPTANCE_LIST_RESET: "GET_DOCUMENT_ACCEPTANCE_LIST_RESET",

    ADD_DOCUMENT_ACCEPTANCE: "ADD_DOCUMENT_ACCEPTANCE",
    ADD_DOCUMENT_ACCEPTANCE_SUCCESS: "ADD_DOCUMENT_ACCEPTANCE_SUCCESS",
    ADD_DOCUMENT_ACCEPTANCE_FAILURE: "ADD_DOCUMENT_ACCEPTANCE_FAILURE",
    ADD_DOCUMENT_ACCEPTANCE_RESET: "ADD_DOCUMENT_ACCEPTANCE_RESET",
    OPEN_ADD_DOCUMENT_ACCEPTANCE_MODAL: "OPEN_ADD_DOCUMENT_ACCEPTANCE_MODAL",
    CLOSE_ADD_DOCUMENT_ACCEPTANCE_MODAL: "CLOSE_ADD_DOCUMENT_ACCEPTANCE_MODAL",

    UPDATE_DOCUMENT_ACCEPTANCE: "UPDATE_DOCUMENT_ACCEPTANCE",
    UPDATE_DOCUMENT_ACCEPTANCE_SUCCESS: "UPDATE_DOCUMENT_ACCEPTANCE_SUCCESS",
    UPDATE_DOCUMENT_ACCEPTANCE_FAILURE: "UPDATE_DOCUMENT_ACCEPTANCE_FAILURE",
    UPDATE_DOCUMENT_ACCEPTANCE_RESET: "UPDATE_DOCUMENT_ACCEPTANCE_RESET",
    OPEN_UPDATE_DOCUMENT_ACCEPTANCE_MODAL: "OPEN_UPDATE_DOCUMENT_ACCEPTANCE_MODAL",
    CLOSE_UPDATE_DOCUMENT_ACCEPTANCE_MODAL: "CLOSE_UPDATE_DOCUMENT_ACCEPTANCE_MODAL",

    get_document_acceptance_list: (query) => ({
        type: documentAcceptanceActions.GET_DOCUMENT_ACCEPTANCE_LIST,
        query,
    }),

    get_document_acceptance_list_reset: () => ({
        type: documentAcceptanceActions.GET_DOCUMENT_ACCEPTANCE_LIST_RESET,
    }),

    add_document_acceptance: (data) => ({
        type: documentAcceptanceActions.ADD_DOCUMENT_ACCEPTANCE,
        data,
    }),

    add_document_acceptance_reset: () => ({
        type: documentAcceptanceActions.ADD_DOCUMENT_ACCEPTANCE_RESET,
    }),

    update_document_acceptance: (id, data) => ({
        type: documentAcceptanceActions.UPDATE_DOCUMENT_ACCEPTANCE,
        data,
        id,
    }),

    update_document_acceptance_reset: () => ({
        type: documentAcceptanceActions.UPDATE_DOCUMENT_ACCEPTANCE_RESET,
    }),

    open_add_modal: () => ({
        type: documentAcceptanceActions.OPEN_ADD_DOCUMENT_ACCEPTANCE_MODAL,
    }),

    close_add_modal: () => ({
        type: documentAcceptanceActions.CLOSE_ADD_DOCUMENT_ACCEPTANCE_MODAL,
    }),

    open_update_modal: (payload) => ({
        type: documentAcceptanceActions.OPEN_UPDATE_DOCUMENT_ACCEPTANCE_MODAL,
        payload,
    }),

    close_update_modal: () => ({
        type: documentAcceptanceActions.CLOSE_UPDATE_DOCUMENT_ACCEPTANCE_MODAL,
    }),
};
export default documentAcceptanceActions;
