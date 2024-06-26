export const permissions = {
    // region: Dashboard
    DASHBOARD: "DASHBOARD",

    // region: Users
    READ_USER: "READ_USER",
    CREATE_USER: "CREATE_USER",
    EDIT_USER: "EDIT_USER",
    DELETE_USER: "DELETE_USER",
    RESET_USER_PASSWORD: "RESET_USER_PASSWORD",

    READ_USER_KYC: "READ_USER_KYC",
    CREATE_USER_KYC: "CREATE_USER_KYC",
    EDIT_USER_KYC: "EDIT_USER_KYC",

    READ_USER_PROFILE_SETUP: "READ_USER_PROFILE_SETUP",
    CREATE_USER_PROFILE_SETUP: "CREATE_USER_PROFILE_SETUP",
    EDIT_USER_PROFILE_SETUP: "EDIT_USER_PROFILE_SETUP",

    // region: Setup
    READ_DELIVERY_OPTION: "READ_DELIVERY_OPTION",
    CREATE_DELIVERY_OPTION: "CREATE_DELIVERY_OPTION",
    EDIT_DELIVERY_OPTION: "EDIT_DELIVERY_OPTION",
    DELETE_DELIVERY_OPTION: "DELETE_DELIVERY_OPTION",

    READ_DELIVERY_ROUTE: "READ_DELIVERY_ROUTE",
    CREATE_DELIVERY_ROUTE: "CREATE_DELIVERY_ROUTE",
    EDIT_DELIVERY_ROUTE: "EDIT_DELIVERY_ROUTE",
    DELETE_DELIVERY_ROUTE: "DELETE_DELIVERY_ROUTE",

    READ_EXCHANGE_RATE: "READ_EXCHANGE_RATE",
    CREATE_EXCHANGE_RATE: "CREATE_EXCHANGE_RATE",
    EDIT_EXCHANGE_RATE: "EDIT_EXCHANGE_RATE",
    DELETE_EXCHANGE_RATE: "DELETE_EXCHANGE_RATE",
    PULL_EXCHANGE_RATE_FROM_IPAY: "PULL_EXCHANGE_RATE_FROM_IPAY",

    READ_EMAIL_CREDENTIAL: "READ_EMAIL_CREDENTIAL",
    CREATE_EMAIL_CREDENTIAL: "CREATE_EMAIL_CREDENTIAL",
    EDIT_EMAIL_CREDENTIAL: "EDIT_EMAIL_CREDENTIAL",

    READ_PARTNER: "READ_PARTNER",
    CREATE_PARTNER: "CREATE_PARTNER",
    EDIT_PARTNER: "EDIT_PARTNER",
    DELETE_PARTNER: "DELETE_PARTNER",

    READ_PARTNER_CORRIDOR: "READ_PARTNER_CORRIDOR",
    CREATE_PARTNER_CORRIDOR: "CREATE_PARTNER_CORRIDOR",
    EDIT_PARTNER_CORRIDOR: "EDIT_PARTNER_CORRIDOR",
    DELETE_PARTNER_CORRIDOR: "DELETE_PARTNER_CORRIDOR",

    READ_PARTNER_BRANCH: "READ_PARTNER_BRANCH",
    CREATE_PARTNER_BRANCH: "CREATE_PARTNER_BRANCH",
    EDIT_PARTNER_BRANCH: "EDIT_PARTNER_BRANCH",
    DELETE_PARTNER_BRANCH: "DELETE_PARTNER_BRANCH",

    READ_PARTNER_BANK: "READ_PARTNER_BANK",
    CREATE_PARTNER_BANK: "CREATE_PARTNER_BANK",
    EDIT_PARTNER_BANK: "EDIT_PARTNER_BANK",

    READ_PAYOUT_LOCATION: "READ_PAYOUT_LOCATION",
    CREATE_PAYOUT_LOCATION: "CREATE_PAYOUT_LOCATION",
    EDIT_PAYOUT_LOCATION: "EDIT_PAYOUT_LOCATION",
    DELETE_PAYOUT_LOCATION: "DELETE_PAYOUT_LOCATION",

    READ_REFERENCE_TYPE: "READ_REFERENCE_TYPE",
    CREATE_REFERENCE_TYPE: "CREATE_REFERENCE_TYPE",
    EDIT_REFERENCE_TYPE: "EDIT_REFERENCE_TYPE",

    READ_REFERENCE_DATA: "READ_REFERENCE_DATA",
    CREATE_REFERENCE_DATA: "CREATE_REFERENCE_DATA",
    EDIT_REFERENCE_DATA: "EDIT_REFERENCE_DATA",
    DELETE_REFERENCE_DATA: "DELETE_REFERENCE_DATA",

    READ_SERVICE_CHARGE: "READ_SERVICE_CHARGE",
    CREATE_SERVICE_CHARGE: "CREATE_SERVICE_CHARGE",
    EDIT_SERVICE_CHARGE: "EDIT_SERVICE_CHARGE",

    READ_API_CONFIGURATION: "READ_API_CONFIGURATION",
    CREATE_API_CONFIGURATION: "CREATE_API_CONFIGURATION",
    EDIT_API_CONFIGURATION: "EDIT_API_CONFIGURATION",

    READ_BANNER: "READ_BANNER",
    CREATE_BANNER: "CREATE_BANNER",
    EDIT_BANNER: "EDIT_BANNER",
    DELETE_BANNER: "DELETE_BANNER",

    READ_COUNTRY_STATE: "READ_COUNTRY_STATE",
    CREATE_COUNTRY_STATE: "CREATE_COUNTRY_STATE",
    EDIT_COUNTRY_STATE: "EDIT_COUNTRY_STATE",
    DELETE_COUNTRY_STATE: "DELETE_COUNTRY_STATE",

    READ_FUNDING_SOURCE: "READ_FUNDING_SOURCE",
    CREATE_FUNDING_SOURCE: "CREATE_FUNDING_SOURCE",
    EDIT_FUNDING_SOURCE: "EDIT_FUNDING_SOURCE",
    DELETE_FUNDING_SOURCE: "DELETE_FUNDING_SOURCE",

    READ_LANGUAGE_SETUP: "READ_LANGUAGE_SETUP",
    CREATE_LANGUAGE_SETUP: "CREATE_LANGUAGE_SETUP",
    EDIT_LANGUAGE_SETUP: "EDIT_LANGUAGE_SETUP",
    DELETE_LANGUAGE_SETUP: "DELETE_LANGUAGE_SETUP",

    READ_LANGUAGE_COUNTRY: "READ_LANGUAGE_COUNTRY",
    CREATE_LANGUAGE_COUNTRY: "CREATE_LANGUAGE_COUNTRY",
    EDIT_LANGUAGE_COUNTRY: "EDIT_LANGUAGE_COUNTRY",
    DELETE_LANGUAGE_COUNTRY: "DELETE_LANGUAGE_COUNTRY",

    READ_LOCALIZATION: "READ_LOCALIZATION",
    CREATE_LOCALIZATION: "CREATE_LOCALIZATION",
    EDIT_LOCALIZATION: "EDIT_LOCALIZATION",
    DELETE_LOCALIZATION: "DELETE_LOCALIZATION",

    READ_STREET_TYPE: "READ_STREET_TYPE",
    CREATE_STREET_TYPE: "CREATE_STREET_TYPE",
    EDIT_STREET_TYPE: "EDIT_STREET_TYPE",
    DELETE_STREET_TYPE: "DELETE_STREET_TYPE",

    READ_COUNTRY_SETUP: "READ_COUNTRY_SETUP",
    CREATE_COUNTRY_SETUP: "CREATE_COUNTRY_SETUP",
    EDIT_COUNTRY_SETUP: "EDIT_COUNTRY_SETUP",

    READ_EMAIL_TEMPLATE: "READ_EMAIL_TEMPLATE_SETUP",
    CREATE_EMAIL_TEMPLATE: "CREATE_EMAIL_TEMPLATE_SETUP",
    EDIT_EMAIL_TEMPLATE: "EDIT_EMAIL_TEMPLATE_SETUP",

    READ_KYC_DOCUMENT_SETUP: "READ_KYC_DOCUMENT_SETUP",
    CREATE_KYC_DOCUMENT_SETUP: "CREATE_KYC_DOCUMENT_SETUP",
    EDIT_KYC_DOCUMENT_SETUP: "EDIT_KYC_DOCUMENT_SETUP",

    // region: Customers
    READ_CUSTOMER: "READ_CUSTOMER",
    CREATE_CUSTOMER: "CREATE_CUSTOMER",
    EDIT_CUSTOMER: "EDIT_CUSTOMER",
    BLOCK_CUSTOMER: "BLOCK_CUSTOMER",

    READ_CUSTOMER_BANK: "READ_CUSTOMER_BANK",
    CREATE_CUSTOMER_BANK: "CREATE_CUSTOMER_BANK",
    EDIT_CUSTOMER_BANK: "EDIT_CUSTOMER_BANK",

    READ_CUSTOMER_DELETE_REQUEST: "READ_CUSTOMER_DELETE_REQUEST",
    CREATE_CUSTOMER_DELETE_REQUEST: "CREATE_CUSTOMER_DELETE_REQUEST",
    EDIT_CUSTOMER_DELETE_REQUEST: "EDIT_CUSTOMER_DELETE_REQUEST",

    // region: Transactions
    READ_TRANSACTION: "READ_TRANSACTION",
    SEARCH_TRANSACTION: "SEARCH_TRANSACTION",
    READ_DAILY_TRANSACTION: "READ_DAILY_TRANSACTION",

    // region: Payment Processing
    PAYMENT_PROCESSING: "PAYMENT_PROCESSING",

    READ_REFUND_TRANSACTION: "READ_REFUND_TRANSACTION",
    REFUND_TRANSACTION: "REFUND_TRANSACTION",
    BLOCK_TRANSACTION: "BLOCK_TRANSACTION",

    READ_PENDING_TRANSACTION: "READ_PENDING_TRANSACTION",

    READ_PAYMENT_PENDING_TRANSACTION: "READ_PAYMENT_PENDING_TRANSACTION",
    RELEASE_PAYMENT_PENDING_TRANSACTION: "RELEASE_PAYMENT_PENDING_TRANSACTION",

    READ_BLOCKED_TRANSACTION: "READ_BLOCKED_TRANSACTION",
    RELEASE_BLOCKED_TRANSACTION: "RELEASE_BLOCKED_TRANSACTION",

    READ_AML_SUSPICIOUS_TRANSACTION: "READ_AML_SUSPICIOUS_TRANSACTION",
    RELEASE_AML_SUSPICIOUS_TRANSACTION: "RELEASE_AML_SUSPICIOUS_TRANSACTION",

    READ_EXCEPTION_TRANSACTION: "READ_EXCEPTION_TRANSACTION",
    RELEASE_EXCEPTION_TRANSACTION: "RELEASE_EXCEPTION_TRANSACTION",

    // region: Generate Reports
    GENERATE_REPORT: "GENERATE_REPORT",
    GENERATE_CUSTOMER_REPORT: "GENERATE_CUSTOMER_REPORT",
    GENERATE_BENEFICIARY_REPORT: "GENERATE_BENEFICIARY_REPORT",
    GENERATE_TRANSACTION_REPORT: "GENERATE_TRANSACTION_REPORT",
    GENERATE_CANCELLED_TRANSACTION_REPORT: "GENERATE_CANCELLED_TRANSACTION_REPORT",
    GENERATE_YEARLY_TRANSACTION_REPORT: "GENERATE_YEARLY_TRANSACTION_REPORT",
    GENERATE_SUSPICIOUS_TRANSACTION_REPORT: "GENERATE_SUSPICIOUS_TRANSACTION_REPORT",
    GENERATE_USER_IP_WHITELIST_REPORT: "GENERATE_USER_IP_WHITELIST_REPORT",
    GENERATE_ICN_RESPONSE_REPORT: "GENERATE_ICN_RESPONSE_REPORT",
    GENERATE_ACH_ENTRIES_REPORT: "GENERATE_ACH_ENTRIES_REPORT",
    GENERATE_INCOMPLETE_REGISTRATION_REPORT: "GENERATE_INCOMPLETE_REGISTRATION_REPORT",
    GENERATE_ONFIDO_REPORT: "GENERATE_ONFIDO_REPORT",

    // region: Utilities
    READ_SMS: "READ_SMS",
    CREATE_SMS: "CREATE_SMS",
    DELETE_SMS: "DELETE_SMS",
    RESEND_SMS: "RESEND_SMS",

    READ_EMAIL: "READ_EMAIL",
    CREATE_EMAIL: "CREATE_EMAIL",
    EDIT_EMAIL: "EDIT_EMAIL",
    DELETE_EMAIL: "DELETE_EMAIL",
    RESEND_EMAIL: "RESEND_EMAIL",

    READ_FCM: "READ_FCM",
    CREATE_FCM: "CREATE_FCM",
    EDIT_FCM: "EDIT_FCM",
    DELETE_FCM: "DELETE_FCM",
    RESEND_FCM: "RESEND_FCM",

    // region: Compliance
    READ_PAYMENT_RULE: "READ_PAYMENT_RULE",
    CREATE_PAYMENT_RULE: "CREATE_PAYMENT_RULE",
    EDIT_PAYMENT_RULE: "UPDATE_PAYMENT_RULE",
    DELETE_PAYMENT_RULE: "DELETE_PAYMENT_RULE",

    READ_SANCTION: "READ_SANCTION_LIST",
    CREATE_SANCTION: "CREATE_SANCTION_LIST",
    EDIT_SANCTION: "EDIT_SANCTION_LIST",
    DELETE_SANCTION: "DELETE_SANCTION_LIST",

    // region B2B - Business
    READ_B2B_BUSINESS: "READ_B2B_BUSINESS",
    CREATE_B2B_BUSINESS: "CREATE_B2B_BUSINESS",
    EDIT_B2B_BUSINESS: "EDIT_B2B_BUSINESS",
  
};
