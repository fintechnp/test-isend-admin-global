const actions = {
    GET_TRANSACTION_DETAILS: "GET_TRANSACTION_DETAILS",
    GET_TRANSACTION_DETAILS_SUCCESS: "GET_TRANSACTION_DETAILS_SUCCESS",
    GET_TRANSACTION_DETAILS_FAILED: "GET_TRANSACTION_DETAILS_FAILED",
    GET_TRANSACTION_DETAILS_RESET: "GET_TRANSACTION_DETAILS_RESET",

    GET_TRANSACTION_REFUND_BLOCK: "GET_TRANSACTION_REFUND_BLOCK",
    GET_TRANSACTION_REFUND_BLOCK_SUCCESS: "GET_TRANSACTION_REFUND_BLOCK_SUCCESS",
    GET_TRANSACTION_REFUND_BLOCK_FAILED: "GET_TRANSACTION_REFUND_BLOCK_FAILED",
    GET_TRANSACTION_REFUND_BLOCK_RESET: "GET_TRANSACTION_REFUND_BLOCK_RESET",

    GET_PENDING_PAYMENT: "GET_PENDING_PAYMENT",
    GET_PENDING_PAYMENT_SUCCESS: "GET_PENDING_PAYMENT_SUCCESS",
    GET_PENDING_PAYMENT_FAILED: "GET_PENDING_PAYMENT_FAILED",

    RELEASE_PENDING_PAYMENT: "RELEASE_PENDING_PAYMENT",
    RELEASE_PENDING_PAYMENT_SUCCESS: "RELEASE_PENDING_PAYMENT_SUCCESS",
    RELEASE_PENDING_PAYMENT_FAILED: "RELEASE_PENDING_PAYMENT_FAILED",
    RELEASE_PENDING_PAYMENT_RESET: "RELEASE_PENDING_PAYMENT_RESET",

    GET_PENDING_TRANSACTIONS: "GET_PENDING_TRANSACTIONS",
    GET_PENDING_TRANSACTIONS_SUCCESS: "GET_PENDING_TRANSACTIONS_SUCCESS",
    GET_PENDING_TRANSACTIONS_FAILED: "GET_PENDING_TRANSACTIONS_FAILED",

    GET_BLOCKED_TRANSACTIONS: "GET_BLOCKED_TRANSACTIONS",
    GET_BLOCKED_TRANSACTIONS_SUCCESS: "GET_BLOCKED_TRANSACTIONS_SUCCESS",
    GET_BLOCKED_TRANSACTIONS_FAILED: "GET_BLOCKED_TRANSACTIONS_FAILED",

    BLOCK_TRANSACTIONS: "BLOCK_TRANSACTIONS",
    BLOCK_TRANSACTIONS_SUCCESS: "BLOCK_TRANSACTIONS_SUCCESS",
    BLOCK_TRANSACTIONS_FAILED: "BLOCK_TRANSACTIONS_FAILED",
    BLOCK_TRANSACTIONS_RESET: "BLOCK_TRANSACTIONS_RESET",

    REFUND_TRANSACTIONS: "REFUND_TRANSACTIONS",
    REFUND_TRANSACTIONS_SUCCESS: "REFUND_TRANSACTIONS_SUCCESS",
    REFUND_TRANSACTIONS_FAILED: "REFUND_TRANSACTIONS_FAILED",
    REFUND_TRANSACTIONS_RESET: "REFUND_TRANSACTIONS_RESET",

    RELEASE_BLOCKED_TRANSACTIONS: "RELEASE_BLOCKED_TRANSACTIONS",
    RELEASE_BLOCKED_TRANSACTIONS_SUCCESS: "RELEASE_BLOCKED_TRANSACTIONS_SUCCESS",
    RELEASE_BLOCKED_TRANSACTIONS_FAILED: "RELEASE_BLOCKED_TRANSACTIONS_FAILED",
    RELEASE_BLOCKED_TRANSACTIONS_RESET: "RELEASE_BLOCKED_TRANSACTIONS_RESET",

    GET_AML_SUSPICIOUS: "GET_AML_SUSPICIOUS",
    GET_AML_SUSPICIOUS_SUCCESS: "GET_AML_SUSPICIOUS_SUCCESS",
    GET_AML_SUSPICIOUS_FAILED: "GET_AML_SUSPICIOUS_FAILED",

    GET_AML_SUSPICIOUS_DETAILS: "GET_AML_SUSPICIOUS_DETAILS",
    GET_AML_SUSPICIOUS_DETAILS_SUCCESS: "GET_AML_SUSPICIOUS_DETAILS_SUCCESS",
    GET_AML_SUSPICIOUS_DETAILS_FAILED: "GET_AML_SUSPICIOUS_DETAILS_FAILED",

    RELEASE_AML_SUSPICIOUS: "RELEASE_AML_SUSPICIOUS",
    RELEASE_AML_SUSPICIOUS_SUCCESS: "RELEASE_AML_SUSPICIOUS_SUCCESS",
    RELEASE_AML_SUSPICIOUS_FAILED: "RELEASE_AML_SUSPICIOUS_FAILED",
    RELEASE_AML_SUSPICIOUS_RESET: "RELEASE_AML_SUSPICIOUS_RESET",

    GET_EXCEPTION_TRANSACTIONS: "GET_EXCEPTION_TRANSACTIONS",
    GET_EXCEPTION_TRANSACTIONS_SUCCESS: "GET_EXCEPTION_TRANSACTIONS_SUCCESS",
    GET_EXCEPTION_TRANSACTIONS_FAILED: "GET_EXCEPTION_TRANSACTIONS_FAILED",

    RELEASE_EXCEPTION_TRANSACTIONS: "RELEASE_EXCEPTION_TRANSACTIONS",
    RELEASE_EXCEPTION_TRANSACTIONS_SUCCESS: "RELEASE_EXCEPTION_TRANSACTIONS_SUCCESS",
    RELEASE_EXCEPTION_TRANSACTIONS_FAILED: "RELEASE_EXCEPTION_TRANSACTIONS_FAILED",
    RELEASE_EXCEPTION_TRANSACTIONS_RESET: "RELEASE_EXCEPTION_TRANSACTIONS_RESET",

    GET_ZAI_AUSTRALIA_PAYMENT: "GET_ZAI_AUSTRALIA_PAYMENT",
    GET_ZAI_AUSTRALIA_PAYMENT_SUCCESS: "GET_ZAI_AUSTRALIA_PAYMENT_SUCCESS",
    GET_ZAI_AUSTRALIA_PAYMENT_FAILED: "GET_ZAI_AUSTRALIA_PAYMENT_FAILED",
    GET_ZAI_AUSTRALIA_PAYMENT_RESET: "GET_ZAI_AUSTRALIA_PAYMENT_RESET",

    CHECK_BALANCE_DETAILS: "CHECK_BALANCE_DETAILS",
    CHECK_BALANCE_DETAILS_SUCCESS: "CHECK_BALANCE_DETAILS_SUCCESS",
    CHECK_BALANCE_DETAILS_FAILED: "CHECK_BALANCE_DETAILS_FAILED",
    CHECK_BALANCE_DETAILS_RESET: "CHECK_BALANCE_DETAILS_RESET",

    GET_ZAI_LOGS: "GET_ZAI_LOGS",
    GET_ZAI_LOGS_SUCCESS: "GET_ZAI_LOGS_SUCCESS",
    GET_ZAI_LOGS_FAILED: "GET_ZAI_LOGS_FAILED",
    GET_ZAI_LOGS_RESET: "GET_ZAI_LOGS_RESET",

    MAKE_PAYMENT: "MAKE_PAYMENT",
    MAKE_PAYMENT_SUCCESS: "MAKE_PAYMENT_SUCCESS",
    MAKE_PAYMENT_FAILED: "MAKE_PAYMENT_FAILED",
    MAKE_PAYMENT_RESET: "MAKE_PAYMENT_RESET",

    REFUND_PAYMENT: "REFUND_PAYMENT",
    REFUND_PAYMENT_SUCCESS: "REFUND_PAYMENT_SUCCESS",
    REFUND_PAYMENT_FAILED: "REFUND_PAYMENT_FAILED",
    REFUND_PAYMENT_RESET: "REFUND_PAYMENT_RESET",

    GET_ZAI_REFUND_LOGS: "GET_ZAI_REFUND_LOGS",
    GET_ZAI_REFUND_LOGS_SUCCESS: "GET_ZAI_REFUND_LOGS_SUCCESS",
    GET_ZAI_REFUND_LOGS_FAILED: "GET_ZAI_REFUND_LOGS_FAILED",
    GET_ZAI_REFUND_LOGS_RESET: "GET_ZAI_REFUND_LOGS_RESET",

    /////////////////////////  TRANSACTION DOCUMENTS  /////////////////////////

    GET_TRANSACTION_DOCUMENTS: "GET_TRANSACTION_DOCUMENTS",
    GET_TRANSACTION_DOCUMENTS_SUCCESS: "GET_TRANSACTION_DOCUMENTS_SUCCESS",
    GET_TRANSACTION_DOCUMENTS_FAILED: "GET_TRANSACTION_DOCUMENTS_FAILED",

    /////////////////////////  SANCTION DETAILS  /////////////////////////

    GET_SANCTION_DETAILS: "GET_SANCTION_DETAILS",
    GET_SANCTION_DETAILS_SUCCESS: "GET_SANCTION_DETAILS_SUCCESS",
    GET_SANCTION_DETAILS_FAILED: "GET_SANCTION_DETAILS_FAILED",

    DOWNLOAD_TRANSACTION_PDF: "DOWNLOAD_TRANSACTION_PDF",
    DOWNLOAD_TRANSACTION_PDF_SUCCESS: "DOWNLOAD_TRANSACTION_PDF_SUCCESS",
    DOWNLOAD_TRANSACTION_PDF_FAILED: "DOWNLOAD_TRANSACTION_PDF_FAILED",

    SEND_MAIL_TRANSACTION: "SEND_MAIL_TRANSACTION",
    SEND_MAIL_TRANSACTION_SUCCESS: "SEND_MAIL_TRANSACTION_SUCCESS",
    SEND_MAIL_TRANSACTION_FAILED: "SEND_MAIL_TRANSACTION_FAILED",
    SEND_MAIL_TRANSACTION_RESET: "SEND_MAIL_TRANSACTION_RESET",

    //FETCH
    get_transaction_details: (id, query) => ({
        type: actions.GET_TRANSACTION_DETAILS,
        id,
        query,
    }),

    get_transaction_refund_block: (query) => ({
        type: actions.GET_TRANSACTION_REFUND_BLOCK,
        query,
    }),

    get_payment_pending: (query) => ({
        type: actions.GET_PENDING_PAYMENT,
        query,
    }),

    get_pending_transactions: (query) => ({
        type: actions.GET_PENDING_TRANSACTIONS,
        query,
    }),

    get_blocked_transactions: (query) => ({
        type: actions.GET_BLOCKED_TRANSACTIONS,
        query,
    }),

    get_aml_suspicious: (query) => ({
        type: actions.GET_AML_SUSPICIOUS,
        query,
    }),

    get_aml_suspicious_details: (transaction_id) => ({
        type: actions.GET_AML_SUSPICIOUS_DETAILS,
        transaction_id,
    }),

    get_exception_transactions: (query) => ({
        type: actions.GET_EXCEPTION_TRANSACTIONS,
        query,
    }),

    get_zai_australia_payment_details: (query) => ({
        type: actions.GET_ZAI_AUSTRALIA_PAYMENT,
        query,
    }),

    get_zai_logs: (query) => ({
        type: actions.GET_ZAI_LOGS,
        query,
    }),

    get_balance_details: (id) => ({
        type: actions.CHECK_BALANCE_DETAILS,
        id,
    }),

    get_zai_refund_logs: (query) => ({
        type: actions.GET_ZAI_REFUND_LOGS,
        query,
    }),

    //create

    make_payment: (data) => ({
        type: actions.MAKE_PAYMENT,
        data,
    }),

    make_payment_reset: (data) => ({
        type: actions.MAKE_PAYMENT_RESET,
        data,
    }),

    refund_payment: (data) => ({
        type: actions.REFUND_PAYMENT,
        data,
    }),

    refund_payment_reset: (data) => ({
        type: actions.REFUND_PAYMENT_RESET,
    }),

    //update
    update_payment_pending: (id, data) => ({
        type: actions.RELEASE_PENDING_PAYMENT,
        data,
        id,
    }),
    block_transactions: (id, data) => ({
        type: actions.BLOCK_TRANSACTIONS,
        data,
        id,
    }),
    refund_transactions: (id, data) => ({
        type: actions.REFUND_TRANSACTIONS,
        data,
        id,
    }),
    update_blocked_transactions: (id, data) => ({
        type: actions.RELEASE_BLOCKED_TRANSACTIONS,
        data,
        id,
    }),
    update_aml_suspicious: (id, data) => ({
        type: actions.RELEASE_AML_SUSPICIOUS,
        data,
        id,
    }),
    update_exception_transactions: (id, data) => ({
        type: actions.RELEASE_EXCEPTION_TRANSACTIONS,
        data,
        id,
    }),

    get_transaction_documents: (payload) => ({
        type: actions.GET_TRANSACTION_DOCUMENTS,
        payload,
    }),

    get_sanction_details: (payload) => ({
        type: actions.GET_SANCTION_DETAILS,
        payload,
    }),

    download_transaction_pdf: (query) => ({
        type: actions.DOWNLOAD_TRANSACTION_PDF,
        query,
    }),

    send_mail_transaction: (data) => ({
        type: actions.SEND_MAIL_TRANSACTION,
        data,
    }),
};

export default actions;
