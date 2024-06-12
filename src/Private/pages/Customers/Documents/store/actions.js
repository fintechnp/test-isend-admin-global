const actions = {
    GET_DOCUMENTS: "GET_DOCUMENTS",
    GET_DOCUMENTS_SUCCESS: "GET_DOCUMENTS_SUCCESS",
    GET_DOCUMENTS_FAILED: "GET_DOCUMENTS_FAILED",
    GET_DOCUMENTS_RESET: "GET_DOCUMENTS_RESET",

    GET_DOCUMENTS_BYID: "GET_DOCUMENTS_BYID",
    GET_DOCUMENTS_BYID_SUCCESS: "GET_DOCUMENTS_BYID_SUCCESS",
    GET_DOCUMENTS_BYID_FAILED: "GET_DOCUMENTS_BYID_FAILED",
    GET_DOCUMENTS_BYID_RESET: "GET_DOCUMENTS_BYID_RESET",

    UPLOAD_DOCUMENTS: "UPLOAD_DOCUMENTS",
    UPLOAD_DOCUMENTS_SUCCESS: "UPLOAD_DOCUMENTS_SUCCESS",
    UPLOAD_DOCUMENTS_FAILED: "UPLOAD_DOCUMENTS_FAILED",
    UPLOAD_DOCUMENTS_RESET: "UPLOAD_DOCUMENTS_RESET",

    DELETE_DOCUMENTS: "DELETE_DOCUMENTS",
    DELETE_DOCUMENTS_SUCCESS: "DELETE_DOCUMENTS_SUCCESS",
    DELETE_DOCUMENTS_FAILED: "DELETE_DOCUMENTS_FAILED",
    DELETE_DOCUMENTS_RESET: "DELETE_DOCUMENTS_RESET",

    UPDATE_KYC: "UPDATE_KYC",
    UPDATE_KYC_SUCCESS: "UPDATE_KYC_SUCCESS",
    UPDATE_KYC_FAILED: "UPDATE_KYC_FAILED",
    UPDATE_KYC_RESET: "UPDATE_KYC_RESET",

    RESET_KYC_VERIFICATION: "RESET_KYC_VERIFICATION",
    RESET_KYC_VERIFICATION_SUCCESS: "RESET_KYC_VERIFICATION_SUCCESS",
    RESET_KYC_VERIFICATION_FAILED: "RESET_KYC_VERIFICATION_FAILED",
    OPEN_RESET_KYC_VERIFICATION_MODAL: "OPEN_RESET_KYC_VERIFICATION_MODAL",
    CLOSE_RESET_KYC_VERIFICATION_MODAL: "CLOSE_RESET_KYC_VERIFICATION_MODAL",

    get_documents: (customer_id, query) => ({
        type: actions.GET_DOCUMENTS,
        customer_id,
        query,
    }),

    get_documents_byid: (id) => ({
        type: actions.GET_DOCUMENTS_BYID,
        id,
    }),

    upload_documents: (customer_id, data) => ({
        type: actions.UPLOAD_DOCUMENTS,
        customer_id,
        data,
    }),

    delete_documents: (customer_id, id) => ({
        type: actions.DELETE_DOCUMENTS,
        customer_id,
        id,
    }),

    update_kyc: (customer_id, data) => ({
        type: actions.UPDATE_KYC,
        customer_id,
        data,
    }),

    reset_kyc_verification: (customerId) => ({
        type: actions.RESET_KYC_VERIFICATION,
        data: { customer_id: customerId },
    }),
};

export default actions;
