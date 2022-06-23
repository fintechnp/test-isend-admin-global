const actions = {
    GET_BENEFICIARY_BY_CUSTOMER: "GET_BENEFICIARY_BY_CUSTOMER",
    GET_BENEFICIARY_BY_CUSTOMER_SUCCESS: "GET_BENEFICIARY_BY_CUSTOMER_SUCCESS",
    GET_BENEFICIARY_BY_CUSTOMER_FAILED: "GET_BENEFICIARY_BY_CUSTOMER_FAILED",

    GET_BENEFICIARY_BYID: "GET_BENEFICIARY_BYID",
    GET_BENEFICIARY_BYID_SUCCESS: "GET_BENEFICIARY_BYID_SUCCESS",
    GET_BENEFICIARY_BYID_FAILED: "GET_BENEFICIARY_BYID_FAILED",
    GET_BENEFICIARY_BYID_RESET: "GET_BENEFICIARY_BYID_RESET",

    CREATE_BENEFICIARY: "CREATE_BENEFICIARY",
    CREATE_BENEFICIARY_SUCCESS: "CREATE_BENEFICIARY_SUCCESS",
    CREATE_BENEFICIARY_FAILED: "CREATE_BENEFICIARY_FAILED",
    CREATE_BENEFICIARY_RESET: "CREATE_BENEFICIARY_RESET",

    UPDATE_BENEFICIARY: "UPDATE_BENEFICIARY",
    UPDATE_BENEFICIARY_SUCCESS: "UPDATE_BENEFICIARY_SUCCESS",
    UPDATE_BENEFICIARY_FAILED: "UPDATE_BENEFICIARY_FAILED",
    UPDATE_BENEFICIARY_RESET: "UPDATE_BENEFICIARY_RESET",

    BLOCK_UNBLOCK_BENEFICIARY: "BLOCK_UNBLOCK_BENEFICIARY",
    BLOCK_UNBLOCK_BENEFICIARY_SUCCESS: "BLOCK_UNBLOCK_BENEFICIARY_SUCCESS",
    BLOCK_UNBLOCK_BENEFICIARY_FAILED: "BLOCK_UNBLOCK_BENEFICIARY_FAILED",
    BLOCK_UNBLOCK_BENEFICIARY_RESET: "BLOCK_UNBLOCK_BENEFICIARY_RESET",

    get_beneficiary_by_customer: (id, query) => ({
        type: actions.GET_BENEFICIARY_BY_CUSTOMER,
        query,
        id,
    }),

    get_beneficiary_byid: (id) => ({
        type: actions.GET_BENEFICIARY_BYID,
        id,
    }),

    create_beneficiary: (data) => ({
        type: actions.CREATE_BENEFICIARY,
        data,
    }),

    update_beneficiary: (id, data) => ({
        type: actions.UPDATE_BENEFICIARY,
        data,
        id,
    }),

    block_unblock_beneficiary: (id, query) => ({
        type: actions.BLOCK_UNBLOCK_BENEFICIARY,
        id,
        query,
    }),
};

export default actions;
