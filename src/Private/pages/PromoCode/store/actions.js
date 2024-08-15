const actions = {
    GET_PROMO_CODE: "GET_PROMO_CODE",
    GET_PROMO_CODE_SUCCESS: "GET_PROMO_CODE_SUCCESS",
    GET_PROMO_CODE_FAILED: "GET_PROMO_CODE_FAILED",
    GET_PROMO_CODE_RESET: "GET_PROMO_CODE_RESET",

    GET_PROMO_CODE_BY_ID: "GET_PROMO_CODE_BY_ID",
    GET_PROMO_CODE_BY_ID_SUCCESS: "GET_PROMO_CODE_BY_ID_SUCCESS",
    GET_PROMO_CODE_BY_ID_FAILED: "GET_PROMO_CODE_BY_ID_FAILED",
    GET_PROMO_CODE_BY_ID_RESET: "GET_PROMO_CODE_BY_ID_RESET",

    ADD_PROMO_CODE: "ADD_PROMO_CODE",
    ADD_PROMO_CODE_SUCCESS: "ADD_PROMO_CODE_SUCCESS",
    ADD_PROMO_CODE_FAILED: "ADD_PROMO_CODE_FAILED",
    ADD_PROMO_CODE_RESET: "ADD_PROMO_CODE_RESET",

    UPDATE_PROMO_CODE: "UPDATE_PROMO_CODE",
    UPDATE_PROMO_CODE_SUCCESS: "UPDATE_PROMO_CODE_SUCCESS",
    UPDATE_PROMO_CODE_FAILED: "UPDATE_PROMO_CODE_FAILED",
    UPDATE_PROMO_CODE_RESET: "UPDATE_PROMO_CODE_RESET",

    DELETE_PROMO_CODE: "DELETE_PROMO_CODE",
    DELETE_PROMO_CODE_SUCCESS: "DELETE_PROMO_CODE_SUCCESS",
    DELETE_PROMO_CODE_FAILED: "DELETE_PROMO_CODE_FAILED",
    DELETE_PROMO_CODE_RESET: "DELETE_PROMO_CODE_RESET",

    UPDATE_PROMO_CODE_STATUS: "UPDATE_PROMO_CODE_STATUS",
    UPDATE_PROMO_CODE_STATUS_SUCCESS: "UPDATE_PROMO_CODE_STATUS_SUCCESS",
    UPDATE_PROMO_CODE_STATUS_FAILED: "UPDATE_PROMO_CODE_STATUS_FAILED",
    UPDATE_PROMO_CODE_STATUS_RESET: "UPDATE_PROMO_CODE_STATUS_RESET",

    ADD_PROMO_CODE_BUDGET: "ADD_PROMO_CODE_BUDGET",
    ADD_PROMO_CODE_BUDGET_SUCCESS: "ADD_PROMO_CODE_BUDGET_SUCCESS",
    ADD_PROMO_CODE_BUDGET_FAILED: "ADD_PROMO_CODE_BUDGET_FAILED",
    ADD_PROMO_CODE_BUDGET_RESET: "ADD_PROMO_CODE_BUDGET_RESET",
    OPEN_PROMO_CODE_BUDGET_MODAL: "OPEN_PROMO_CODE_BUDGET_MODAL",
    CLOSE_PROMO_CODE_BUDGET_MODAL: "CLOSE_PROMO_CODE_BUDGET_MODAL",

    get_promo_codes: (query) => ({
        type: actions.GET_PROMO_CODE,
        query,
    }),

    get_promo_code_by_id: (id) => ({
        type: actions.GET_PROMO_CODE_BY_ID,
        id,
    }),

    add_promo_code: (data) => ({
        type: actions.ADD_PROMO_CODE,
        data,
    }),

    add_promo_code_reset: (data) => ({
        type: actions.ADD_PROMO_CODE_RESET,
        data,
    }),

    add_promo_code_budget: (data) => ({
        type: actions.ADD_PROMO_CODE_BUDGET,
        data,
    }),

    open_add_promo_code_budget_modal: () => ({
        type: actions.OPEN_PROMO_CODE_BUDGET_MODAL,
    }),

    close_add_promo_code_budget_modal: () => ({
        type: actions.CLOSE_PROMO_CODE_BUDGET_MODAL,
    }),

    open_update_promo_code_budget_modal: (payload) => ({
        type: actions.OPEN_PROMO_CODE_BUDGET_MODAL,
        payload,
    }),

    close_update_promo_code_budget_modal: () => ({
        type: actions.CLOSE_PROMO_CODE_BUDGET_MODAL,
    }),

    delete_promo_code: (promo_code_id) => ({
        type: actions.DELETE_PROMO_CODE,
        promo_code_id,
    }),

    update_promo_code_status: (data) => ({
        type: actions.UPDATE_PROMO_CODE_STATUS,
        data,
    }),
};

export default actions;
