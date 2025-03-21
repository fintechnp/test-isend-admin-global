const actions = {
    GET_ACH_RDFI_WEBHOOKS: "GET_ACH_RDFI_WEBHOOKS",
    GET_ACH_RDFI_WEBHOOKS_SUCCESS: "GET_ACH_RDFI_WEBHOOKS_SUCCESS",
    GET_ACH_RDFI_WEBHOOKS_FAILED: "GET_ACH_RDFI_WEBHOOKS_FAILED",
    GET_ACH_RDFI_WEBHOOKS_RESET: "GET_ACH_RDFI_WEBHOOKS_RESET",

    GET_ACH_CIR_WEBHOOKS: "GET_ACH_CIR_WEBHOOKS",
    GET_ACH_CIR_WEBHOOKS_SUCCESS: "GET_ACH_CIR_WEBHOOKS_SUCCESS",
    GET_ACH_CIR_WEBHOOKS_FAILED: "GET_ACH_CIR_WEBHOOKS_FAILED",
    GET_ACH_CIR_WEBHOOKS_RESET: "GET_ACH_CIR_WEBHOOKS_RESET",

    GET_ACH_RETURN_WEBHOOKS: "GET_ACH_RETURN_WEBHOOKS",
    GET_ACH_RETURN_WEBHOOKS_SUCCESS: "GET_ACH_RETURN_WEBHOOKS_SUCCESS",
    GET_ACH_RETURN_WEBHOOKS_FAILED: "GET_ACH_RETURN_WEBHOOKS_FAILED",
    GET_ACH_RETURN_WEBHOOKS_RESET: "GET_ACH_RETURN_WEBHOOKS_RESET",

    GET_ACH_REJECT_WEBHOOKS: "GET_ACH_REJECT_WEBHOOKS",
    GET_ACH_REJECT_WEBHOOKS_SUCCESS: "GET_ACH_REJECT_WEBHOOKS_SUCCESS",
    GET_ACH_REJECT_WEBHOOKS_FAILED: "GET_ACH_REJECT_WEBHOOKS_FAILED",
    GET_ACH_REJECT_WEBHOOKS_RESET: "GET_ACH_REJECT_WEBHOOKS_RESET",

    OPEN_RETURN_ACH_RDFI_TRANSACTION_MODAL: "OPEN_RETURN_ACH_RDFI_TRANSACTION_MODAL",
    CLOSE_RETURN_ACH_RDFI_TRANSACTION_MODAL: "CLOSE_RETURN_ACH_RDFI_TRANSACTION_MODAL",
    RETURN_ACH_RDFI_TRANSACTION: "RETURN_ACH_RDFI_TRANSACTION",
    RETURN_ACH_RDFI_TRANSACTION_SUCCESS: "RETURN_ACH_RDFI_TRANSACTION_SUCCESS",
    RETURN_ACH_RDFI_TRANSACTION_FAILED: "RETURN_ACH_RDFI_TRANSACTION_FAILED",
    RETURN_ACH_RDFI_TRANSACTION_RESET: "RETURN_ACH_RDFI_TRANSACTION_RESET",

    // ODFI Webhooks
    GET_ACH_ODFI_WEBHOOKS: "GET_ACH_ODFI_WEBHOOKS",
    GET_ACH_ODFI_WEBHOOKS_SUCCESS: "GET_ACH_ODFI_WEBHOOKS_SUCCESS",
    GET_ACH_ODFI_WEBHOOKS_FAILED: "GET_ACH_ODFI_WEBHOOKS_FAILED",
    GET_ACH_ODFI_WEBHOOKS_RESET: "GET_ACH_ODFI_WEBHOOKS_RESET",

    // ODFI Webhooks
    GET_ACH_NOC_WEBHOOKS: "GET_ACH_NOC_WEBHOOKS",
    GET_ACH_NOC_WEBHOOKS_SUCCESS: "GET_ACH_NOC_WEBHOOKS_SUCCESS",
    GET_ACH_NOC_WEBHOOKS_FAILED: "GET_ACH_NOC_WEBHOOKS_FAILED",
    GET_ACH_NOC_WEBHOOKS_RESET: "GET_ACH_NOC_WEBHOOKS_RESET",

    get_ach_rdfi_webhooks: (query) => ({
        type: actions.GET_ACH_RDFI_WEBHOOKS,
        query,
    }),

    get_ach_cir_webhooks: (query) => ({
        type: actions.GET_ACH_CIR_WEBHOOKS,
        query,
    }),

    get_ach_return_webhooks: (query) => ({
        type: actions.GET_ACH_RETURN_WEBHOOKS,
        query,
    }),

    get_ach_reject_webhooks: (query) => ({
        type: actions.GET_ACH_REJECT_WEBHOOKS,
        query,
    }),

    open_return_ach_rdfi_transaction_modal: (id) => ({
        type: actions.OPEN_RETURN_ACH_RDFI_TRANSACTION_MODAL,
        id,
    }),

    close_return_ach_rdfi_transaction_modal: () => ({
        type: actions.CLOSE_RETURN_ACH_RDFI_TRANSACTION_MODAL,
    }),

    return_ach_rdfi_transaction: (id, data) => ({
        type: actions.RETURN_ACH_RDFI_TRANSACTION,
        id,
        data,
    }),

    return_ach_rdfi_transaction_reset: () => ({
        type: actions.RETURN_ACH_RDFI_TRANSACTION_RESET,
    }),

    get_ach_odfi_webhooks: (query) => ({
        type: actions.GET_ACH_ODFI_WEBHOOKS,
        query,
    }),

    get_ach_noc_webhooks: (query) => ({
        type: actions.GET_ACH_NOC_WEBHOOKS,
        query,
    }),
};

export default actions;
