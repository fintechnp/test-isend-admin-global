const actions = {
    GET_B2B_ACCOUNT_CLOSURE_REQUESTS: "GET_B2B_ACCOUNT_CLOSURE_REQUESTS",
    GET_B2B_ACCOUNT_CLOSURE_REQUESTS_SUCCESS: "GET_B2B_ACCOUNT_CLOSURE_REQUESTS_SUCCESS",
    GET_B2B_ACCOUNT_CLOSURE_REQUESTS_FAILED: "GET_B2B_ACCOUNT_CLOSURE_REQUESTS_FAILED",
    GET_B2B_ACCOUNT_CLOSURE_REQUESTS_RESET: "GET_B2B_ACCOUNT_CLOSURE_REQUESTS_RESET",

    OPEN_B2B_ACCOUNT_CLOSURE_VIEW_MODAL: "OPEN_B2B_ACCOUNT_CLOSURE_VIEW_MODAL",
    CLOSE_B2B_ACCOUNT_CLOSURE_VIEW_MODAL: "CLOSE_B2B_ACCOUNT_CLOSURE_VIEW_MODAL",

    ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST: "ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST",
    ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_SUCCESS: "ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_SUCCESS",
    ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_FAILED: "ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_FAILED",
    ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_RESET: "ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_RESET",

    get_account_closure_request: (query) => ({
        type: actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS,
        query,
    }),

    open_account_closure_view_modal: (payload) => ({
        type: actions.OPEN_B2B_ACCOUNT_CLOSURE_VIEW_MODAL,
        payload,
    }),

    close_account_closure_view_modal: () => ({
        type: actions.CLOSE_B2B_ACCOUNT_CLOSURE_VIEW_MODAL,
    }),

    accept_reject_account_closure_request: (id, data) => ({
        type: actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST,
        id,
        data,
    }),

    accept_reject_account_closure_request_reset: () => ({
        type: actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_RESET,
    }),
};

export default actions;
