const actions = {
    GET_CUSTOMER_COUNT_BY_DEVICE_TYPE: "GET_CUSTOMER_COUNT_BY_DEVICE_TYPE",
    GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_SUCCESS: "GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_SUCCESS",
    GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_FAILED: "GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_FAILED",

    GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_PREVIOUS: "GET_CUSTOMER_COUNT_BY_DEVICE_PREVIOUS",
    GET_CUSTOMER_COUNT_BY_DEVICE_PREVIOUS_SUCCESS: "GET_CUSTOMER_COUNT_BY_DEVICE_PREVIOUS_SUCCESS",
    GET_CUSTOMER_COUNT_BY_DEVICE_PREVIOUS_FAILED: "GET_CUSTOMER_COUNT_BY_DEVICE_PREVIOUS_FAILED",

    GET_CUSTOMER_KYC_COUNT_BY_STATUS: "GET_CUSTOMER_KYC_COUNT_BY_STATUS",
    GET_CUSTOMER_KYC_COUNT_BY_STATUS_SUCCESS: "GET_CUSTOMER_KYC_COUNT_BY_STATUS_SUCCESS",
    GET_CUSTOMER_KYC_COUNT_BY_STATUS_FAILED: "GET_CUSTOMER_KYC_COUNT_BY_STATUS_FAILED",

    GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS: "GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS",
    GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_SUCCESS: "GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_SUCCESS",
    GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_FAILED: "GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_FAILED",

    GET_TRANSACTION_COUNT_BY_STATUS: "GET_TRANSACTION_COUNT_BY_STATUS",
    GET_TRANSACTION_COUNT_BY_STATUS_SUCCESS: "GET_TRANSACTION_COUNT_BY_STATUS_SUCCESS",
    GET_TRANSACTION_COUNT_BY_STATUS_FAILED: "GET_TRANSACTION_COUNT_BY_STATUS_FAILED",

    GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS: "GET-TRANSACTION-COUNT_BY_STATUS_PREVIOUS",
    GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS_SUCCESS: "GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS_SUCCESS",
    GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS_FAILED: "GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS_FAILED",

    GET_TOP_PAYOUT_COUNTRIES: "GET_TOP_PAYOUT_COUNTRIES",
    GET_TOP_PAYOUT_COUNTRIES_SUCCESS: "GET_TOP_PAYOUT_COUNTRIES_SUCCESS",
    GET_TOP_PAYOUT_COUNTRIES_FAILED: "GET_TOP_PAYOUT_COUNTRIES_FAILED",

    GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS: "GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS",
    GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_SUCCESS: "GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_SUCCESS",
    GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_FAILED: "GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_FAILED",

    GET_COMPLIANCE_COUNT_BY_STATUS: "GET_COMPLIANCE_COUNT_BY_STATUS",
    GET_COMPLIANCE_COUNT_BY_STATUS_SUCCESS: "GET_COMPLIANCE_COUNT_BY_STATUS_SUCCESS",
    GET_COMPLIANCE_COUNT_BY_STATUS_FAILED: "GET_COMPLIANCE_COUNT_BY_STATUS_FAILED",

    GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS: "GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS",
    GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS_SUCCESS: "GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS_SUCCESS",
    GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS_FAILED: "GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS_FAILED",

    GET_SUMMARY_DATA: "GET_SUMMARY_DATA",
    GET_SUMMARY_DATA_SUCCESS: "GET_SUMMARY_DATA_SUCCESS",
    GET_SUMMARY_DATA_FAILED: "GET_SUMMARY_DATA_FAILED",

    GET_OVERALL_TRANSACTION_LINEGRAPH: "GET_OVERALL_TRANSACTION_LINEGRAPH",
    GET_OVERALL_TRANSACTION_LINEGRAPH_SUCCESS: "GET_OVERALL_TRANSACTION_LINEGRAPH_SUCCESS",
    GET_OVERALL_TRANSACTION_LINEGRAPH_FAILED: "GET_OVERALL_TRANSACTION_LINEGRAPH_FAILED",

    GET_OVERALL_TRANSACTION_REPORT: "GET_OVERALL_TRANSACTION_REPORT",
    GET_OVERALL_TRANSACTION_REPORT_SUCCESS: "GET_OVERALL_TRANSACTION_REPORT_SUCCESS",
    GET_OVERALL_TRANSACTION_REPORT_FAILED: "GET_OVERALL_TRANSACTION_REPORT_FAILED",

    GET_OVERALL_CUSTOMERS_REPORT: "GET_OVERALL_CUSTOMERS_REPORT",
    GET_OVERALL_CUSTOMERS_REPORT_SUCCESS: "GET_OVERALL_CUSTOMERS_REPORT_SUCCESS",
    GET_OVERALL_CUSTOMERS__REPORT_FAILED: "GET_OVERALL_CUSTOMERS_REPORT_FAILED",

    GET_USER_REGISTRATION_HISTORY: "GET_USER_REGISTRATION_HISTORY",
    GET_USER_REGISTRATION_HISTORY_SUCCESS: "GET_USER_REGISTRATION_HISTORY_SUCCESS",
    GET_USER_REGISTRATION_HISTORY_FAILED: "GET_USER_REGISTRATION_HISTORY_FAILED",

    GET_EXCHANGE_RATE_SUMMARY: "GET_EXCHANGE_RATE_SUMMARY",
    GET_EXCHANGE_RATE_SUMMARY_SUCCESS: "GET_EXCHANGE_RATE_SUMMARY_SUCCESS",
    GET_EXCHANGE_RATE_SUMMARY_FAILED: "GET_EXCHANGE_RATE_SUMMARY_FAILED",

    CHANGE_DASHBOARD_FILTER_PARAMS: "CHANGE_DASHBOARD_FILTER_PARAMS",

    get_customer_count_by_device_type: (query) => ({
        type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE,
        query,
    }),

    get_customer_count_by_device_type_previous: (query) => ({
        type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_PREVIOUS,
        query,
    }),

    get_customer_kyc_count_by_status: (query) => ({
        type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS,
        query,
    }),

    get_customer_kyc_count_by_status_previous: (query) => ({
        type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS,
        query,
    }),

    get_transaction_count_by_status: (query) => ({
        type: actions.GET_TRANSACTION_COUNT_BY_STATUS,
        query,
    }),

    get_transaction_count_by_status_previous: (query) => ({
        type: actions.GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS,
        query,
    }),

    change_dashboard_filter_params: (query) => ({
        type: actions.CHANGE_DASHBOARD_FILTER_PARAMS,
        query,
    }),

    get_top_payout_countries: (query) => ({
        type: actions.GET_TOP_PAYOUT_COUNTRIES,
        query,
    }),

    get_top_transaction_by_agent_and_business: (query) => ({
        type: actions.GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS,
        query,
    }),

    get_compliance_count_by_status: (query) => ({
        type: actions.GET_COMPLIANCE_COUNT_BY_STATUS,
        query,
    }),

    get_compliance_count_by_status_previous: (query) => ({
        type: actions.GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS,
        query,
    }),

    get_overall_transaction_line_graph: () => ({
        type: actions.GET_OVERALL_TRANSACTION_LINEGRAPH,
    }),

    get_summary_data: (query) => ({
        type: actions.GET_SUMMARY_DATA,
        query,
    }),

    get_user_registration_history: (query) => ({
        type: actions.GET_USER_REGISTRATION_HISTORY,
        query,
    }),

    get_exchange_rate_summary: (query) => ({
        type: actions.GET_EXCHANGE_RATE_SUMMARY,
        query,
    }),

    get_overall_transaction_report: () => ({
        type: actions.GET_OVERALL_TRANSACTION_REPORT,
    }),

    get_overall_customers_report: () => ({
        type: actions.GET_OVERALL_CUSTOMERS_REPORT,
    }),
};

export default actions;
