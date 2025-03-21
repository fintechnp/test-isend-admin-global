import Report from "@mui/icons-material/Report";
import Payment from "@mui/icons-material/Payment";
import Settings from "@mui/icons-material/Settings";
import GroupAdd from "@mui/icons-material/GroupAdd";
import Dashboard from "@mui/icons-material/Dashboard";
import GroupWork from "@mui/icons-material/GroupWork";
import AccountBox from "@mui/icons-material/AccountBox";
import TrendingUp from "@mui/icons-material/TrendingUp";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import roles from "App/global/roles";
import routePaths from "Private/config/routePaths";

export const drawerItems = [
    {
        path: "/",
        key: "dashboard",
        text: "Dashboard",
        sub: false,
        icon: <Dashboard />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER],
    },

    //User
    {
        key: "user",
        text: "Users",
        sub: true,
        icon: <GroupAdd />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER, roles.USER],
        children: [
            {
                path: "/user/accounts",
                key: "user-accounts",
                text: "Accounts",
                sub: false,
            },
            {
                path: routePaths.users.listProfileSetup,
                key: "list-profile-setup",
                text: "User Profile Setup",
                sub: false,
            },
        ],
    },

    //Setup
    {
        key: "setup",
        text: "Setup",
        sub: true,
        icon: <Settings />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER],
        children: [
            {
                path: "/setup/delivery-option",
                key: "setup-delivery-option",
                text: "Delivery Options",
                sub: false,
            },
            {
                path: "/setup/delivery-route",
                key: "setup-delivery-option-route",
                text: "Delivery Routes",
                sub: false,
            },
            {
                path: "/setup/exchange-rate",
                key: "setup-exchange-rate",
                text: "Exchange Rate",
                sub: false,
            },
            {
                path: "/setup/partner",
                key: "setup-partner",
                text: "Partner",
                sub: false,
            },
            {
                path: "/setup/partner-bank",
                key: "setup-partner-bank",
                text: "Partner Bank",
                sub: false,
            },
            {
                path: "/setup/payout-location",
                key: "setup-payout",
                text: "Payout Location",
                sub: false,
            },
            {
                path: "/setup/reference",
                key: "setup-reference",
                text: "References",
                sub: false,
            },
            {
                path: "/setup/service-charge",
                key: "setup-service-charge",
                text: "Service Charge",
                sub: false,
            },
            {
                path: "/setup/promo-setup",
                key: "setup-promo",
                text: "Promo Setup",
                sub: false,
            },
            {
                path: "/setup/api-configuration",
                key: "api-configuration",
                text: "API Configuration",
                sub: false,
            },
            {
                path: "/setup/banners",
                key: "banners",
                text: "Banners",
                sub: false,
            },

            {
                path: routePaths.countries.index,
                key: "countries",
                text: "Countries",
                sub: false,
            },
            {
                path: routePaths.documentAcceptance.index,
                key: "Document Acceptance",
                text: "Document Acceptance",
                sub: false,
            },
            {
                path: routePaths.countryStates.index,
                key: "country-states",
                text: "Country States",
                sub: false,
            },
            {
                path: routePaths.fundingSources.index,
                key: "funding sources",
                text: "Funding Sources",
                sub: false,
            },
            {
                path: routePaths.setup.language,
                key: "language setup",
                text: "Language Setup",
                sub: false,
            },
            {
                path: routePaths.setup.languageCountry,
                key: "language country",
                text: "Language Country",
                sub: false,
            },
            {
                path: routePaths.setup.addLanguage,
                key: "Localization",
                text: "Localization",
                sub: false,
            },
            {
                path: routePaths.setup.streetType,
                key: "Street Type",
                text: " Street Type",
                sub: false,
            },
            {
                path: "/setup/email-template",
                key: "email-template",
                text: "Email Template",
                sub: true,
            },
            {
                path: routePaths.promoCode.create,
                key: "promo-code",
                text: "Promo Code",
                sub: true,
            },
        ],
    },

    //Customers
    {
        key: "customer",
        text: "Customers",
        sub: true,
        icon: <AccountBox />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER, roles.USER],
        children: [
            {
                path: "/customer/search",
                key: "customer-search",
                text: "Search",
                sub: false,
            },
            {
                path: "/customer/create",
                key: "customer-create",
                text: "Create New",
                sub: false,
            },
            {
                path: routePaths.customer.allBank,
                key: "all-bank",
                text: "Bank List",
                sub: false,
            },
            {
                path: routePaths.customer.deleteList,
                key: "delete_list",
                text: "Account Delete Requests",
                sub: false,
            },
        ],
    },

    //Transactions
    {
        key: "transaction",
        text: "Transactions",
        sub: true,
        icon: <TrendingUp />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER, roles.USER],
        children: [
            {
                path: "/transaction/search",
                key: "search-transaction",
                text: "Search",
                sub: false,
            },
            {
                path: "/transaction/new",
                key: "new-transaction",
                text: "Create New",
                sub: false,
            },
            {
                path: "/transaction/daily",
                key: "daily-transaction",
                text: "Daily Transactions",
                sub: false,
            },
            // {
            //     path: routePaths.transaction.achTransaction,
            //     key: "ach-transaction",
            //     text: "ACH Transactions",
            //     sub: false,
            // },
        ],
    },

    //Payment Process
    {
        key: "payment",
        text: "Payment Processing",
        sub: true,
        icon: <Payment />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER, roles.USER],
        children: [
            {
                path: "/payment/search",
                key: "payment-search",
                text: "Refund / Block",
                sub: false,
            },
            {
                path: "/payment/pending",
                key: "pending-payment",
                text: "Payment Pending",
                sub: false,
            },
            {
                path: "/payment/pending-transactions",
                key: "pending-transactions",
                text: "Pending Transactions",
                sub: false,
            },
            {
                path: "/payment/block-list",
                key: "blocksetup",
                text: "Blocked Transactions",
                sub: false,
            },
            {
                path: "/payment/aml-suspicious",
                key: "amlsuspicioius",
                text: "Aml Suspicious",
                sub: false,
            },
            {
                path: "/payment/exception-transactions",
                key: "exception",
                text: "Exception Transactions",
                sub: false,
            },
            {
                path: routePaths.transaction.zaiTransaction,
                key: "zai-australia-payment",
                text: "Zai Australia Payment",
                sub: false,
            },
        ],
    },

    //Report Pannel
    {
        key: "report",
        text: "Generate Reports",
        sub: true,
        icon: <Report />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER, roles.USER],
        children: [
            {
                path: "/report/customer",
                key: "report-customer",
                text: "Customers",
                sub: false,
            },
            {
                path: "/report/beneficiary",
                key: "report-beneficiary",
                text: "Beneficiary",
                sub: false,
            },
            {
                path: "/report/transaction-summary",
                key: "report-transactions-summary",
                text: "Transactions Summary",
                sub: false,
            },
            {
                path: "/report/cancelled-transactions",
                key: "report-cancelled-transactions",
                text: "Cancelled Transactions",
                sub: false,
            },
            {
                path: "/report/yearly-transactions",
                key: "report-yearly-transactions",
                text: "Yearly Transactions",
                sub: false,
            },
            {
                path: "/report/suspicious-transactions",
                key: "report-suspicious-transactions",
                text: "Suspicious Transactions",
                sub: false,
            },
            {
                path: routePaths.reports.userIpWhitelist,
                key: "report-user-ip-whitelist",
                text: "User IP Whitelist",
                sub: false,
            },
            {
                path: routePaths.reports.icnResponse,
                key: "report-icn-response",
                text: "ICN Response",
                sub: false,
            },
            {
                path: routePaths.reports.achEntries,
                key: "report-ach-entries",
                text: "ACH Entries",
                sub: false,
            },
            {
                path: routePaths.reports.incompleteRegistration,
                key: "incomplete-registration",
                text: "Incomplete Registation",
                sub: false,
            },
            {
                path: routePaths.reports.onfidoReport,
                key: "onfidoReport",
                text: "Onfido Report",
                sub: false,
            },
        ],
    },

    //Utilities pannel
    {
        key: "utilities",
        text: "Utilities",
        sub: true,
        icon: <ForwardToInboxIcon />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER],
        children: [
            {
                path: "/utilities/sms",
                key: "sms",
                text: "Sms",
                sub: false,
            },
            {
                path: "/utilities/email",
                key: "utilities-email",
                text: "Email",
                sub: false,
            },
            {
                path: "/utilities/fcm",
                key: "utilities-fcm",
                text: "Fcm",
                sub: false,
            },
            {
                path: routePaths.bulkEmails.index,
                key: "bulk-email",
                text: "Bulk Email",
                sub: false,
            },
        ],
    },

    //Compiliance pannel
    {
        key: "compliance",
        text: "Compliance",
        sub: true,
        icon: <GroupWork />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER],
        children: [
            {
                path: "/compliance/payment-rules",
                key: "paymentsetup",
                text: "Payment Rules",
                sub: false,
            },
            {
                path: "/compliance/sanction-list",
                key: "sanction-compliance",
                text: "Sanction List",
                sub: false,
            },
        ],
    },

    //Market Maker
    {
        key: "agent",
        text: "Agent",
        sub: true,
        icon: <AccountBox />,
        permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER, roles.USER],
        children: [
            {
                path: routePaths.agent.listMarketMaker,
                key: "market-maker",
                text: "Agents",
                sub: false,
            },
            {
                path: routePaths.agent.listBusiness,
                key: "business",
                text: "Businesses",
                sub: false,
            },
            {
                path: routePaths.agent.listB2bAccount,
                key: "market-maker",
                text: "Balance Accounts",
                sub: false,
            },
            {
                path: routePaths.agent.listBalanceRequest,
                key: "balance-request",
                text: "Balance Requests",
                sub: false,
            },
            {
                path: routePaths.agent.creditLimit,
                key: "credit-limit",
                text: "Credit Limits",
                sub: false,
            },

            {
                path: routePaths.agent.listSingleTransactions,
                key: "single-transactions",
                text: "Single Transactions",
                sub: false,
            },
            {
                path: routePaths.agent.listBatchTransactions,
                key: "batch-transactions",
                text: "Batch Transactions",
                sub: false,
            },
            {
                path: routePaths.agent.getAllB2bBeneficiary,
                key: "beneficiary",
                text: "Beneficiaries",
                sub: false,
            },
            {
                path: routePaths.agent.listKycUser,
                key: "kyc-user",
                text: "Users KYC",
                sub: false,
            },
            {
                path: routePaths.agent.listBusinessServiceCharge,
                key: "business-service-charge",
                text: "Business Service Charges",
                sub: false,
            },
            {
                path: routePaths.agent.listAccounts,
                key: "market-maker",
                text: "Legder Accounts",
                sub: false,
            },
            {
                path: routePaths.agent.listLedger,
                key: "ledger",
                text: "Ledgers",
                sub: false,
            },
        ],
    },
];
