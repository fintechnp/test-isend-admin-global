const actions = {
    CUSTOMER_REPORT: "CUSTOMER_REPORT",
    CUSTOMER_REPORT_SUCCESS: "CUSTOMER_REPORT_SUCCESS",
    CUSTOMER_REPORT_FAILED: "CUSTOMER_REPORT_FAILED",
    CUSTOMER_REPORT_RESET: "CUSTOMER_REPORT_RESET",

    DOWNLOAD_CUSTOMER_REPORT: "DOWNLOAD_CUSTOMER_REPORT",
    DOWNLOAD_CUSTOMER_REPORT_SUCCESS: "DOWNLOAD_CUSTOMER_REPORT_SUCCESS",
    DOWNLOAD_CUSTOMER_REPORT_FAILED: "DOWNLOAD_CUSTOMER_REPORT_FAILED",
    DOWNLOAD_CUSTOMER_REPORT_RESET: "DOWNLOAD_CUSTOMER_REPORT_RESET",

    BENEFICIARY_REPORT: "BENEFICIARY_REPORT",
    BENEFICIARY_REPORT_SUCCESS: "BENEFICIARY_REPORT_SUCCESS",
    BENEFICIARY_REPORT_FAILED: "BENEFICIARY_REPORT_FAILED",
    BENEFICIARY_REPORT_RESET: "BENEFICIARY_REPORT_RESET",

    TRANSACTIONS_SUMMARY_REPORT: "TRANSACTIONS_SUMMARY_REPORT",
    TRANSACTIONS_SUMMARY_REPORT_SUCCESS: "TRANSACTIONS_SUMMARY_REPORT_SUCCESS",
    TRANSACTIONS_SUMMARY_REPORT_FAILED: "TRANSACTIONS_SUMMARY_REPORT_FAILED",
    TRANSACTIONS_SUMMARY_REPORT_RESET: "TRANSACTIONS_SUMMARY_REPORT_RESET",

    YEARLY_TRANSACTIONS_REPORT: "YEARLY_TRANSACTIONS_REPORT",
    YEARLY_TRANSACTIONS_REPORT_SUCCESS: "YEARLY_TRANSACTIONS_REPORT_SUCCESS",
    YEARLY_TRANSACTIONS_REPORT_FAILED: "YEARLY_TRANSACTIONS_REPORT_FAILED",
    YEARLY_TRANSACTIONS_REPORT_RESET: "YEARLY_TRANSACTIONS_REPORT_RESET",

    SUSPICIOUS_TRANSACTIONS_REPORT: "SUSPICIOUS_TRANSACTIONS_REPORT",
    SUSPICIOUS_TRANSACTIONS_REPORT_SUCCESS:
        "SUSPICIOUS_TRANSACTIONS_REPORT_SUCCESS",
    SUSPICIOUS_TRANSACTIONS_REPORT_FAILED:
        "SUSPICIOUS_TRANSACTIONS_REPORT_FAILED",
    SUSPICIOUS_TRANSACTIONS_REPORT_RESET:
        "SUSPICIOUS_TRANSACTIONS_REPORT_RESET",

    CANCELLED_TRANSACTIONS_REPORT: "CANCELLED_TRANSACTIONS_REPORT",
    CANCELLED_TRANSACTIONS_REPORT_SUCCESS:
        "CANCELLED_TRANSACTIONS_REPORT_SUCCESS",
    CANCELLED_TRANSACTIONS_REPORT_FAILED:
        "CANCELLED_TRANSACTIONS_REPORT_FAILED",
    CANCELLED_TRANSACTIONS_REPORT_RESET: "CANCELLED_TRANSACTIONS_REPORT_RESET",

    //FETCH
    get_customer_report: (query) => ({
        type: actions.CUSTOMER_REPORT,
        query,
    }),

    download_customer_report: (query) => ({
        type: actions.DOWNLOAD_CUSTOMER_REPORT,
        query,
    }),

    get_beneficiary_report: (query) => ({
        type: actions.BENEFICIARY_REPORT,
        query,
    }),

    get_transactions_summary_report: (query) => ({
        type: actions.TRANSACTIONS_SUMMARY_REPORT,
        query,
    }),

    get_yearly_transactions_report: (query) => ({
        type: actions.YEARLY_TRANSACTIONS_REPORT,
        query,
    }),

    get_cancelled_report: (query) => ({
        type: actions.CANCELLED_TRANSACTIONS_REPORT,
        query,
    }),

    get_suspicious_transactions_report: (query) => ({
        type: actions.SUSPICIOUS_TRANSACTIONS_REPORT,
        query,
    }),
};

export default actions;
