import React, { Suspense } from "react";
import Drawer from "../../components/Drawer";
import {
    Dashboard,
    Settings,
    AccountBox,
    TrendingUp,
    Report,
    GroupWork,
    Receipt,
    GroupAdd,
    Payment,
} from "@mui/icons-material";
import roles from "../../global/roles";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import Loading from "./../../../App/components/Loading";

const PrivateLayout = ({ children }) => {
    const getMainItems = () => {
        return [
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
                permission: [
                    roles.SUPER_ADMIN,
                    roles.ADMIN,
                    roles.MANAGER,
                    roles.USER,
                ],
                children: [
                    {
                        path: "/user/accounts",
                        key: "user-accounts",
                        text: "Accounts",
                        sub: false,
                    },
                    {
                        path: "/user/menu",
                        key: "user-menu",
                        text: "Menu",
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
                ],
            },

            //Customers
            {
                key: "customer",
                text: "Customers",
                sub: true,
                icon: <AccountBox />,
                permission: [
                    roles.SUPER_ADMIN,
                    roles.ADMIN,
                    roles.MANAGER,
                    roles.USER,
                ],
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
                ],
            },

            //Transactions
            {
                key: "transaction",
                text: "Transactions",
                sub: true,
                icon: <TrendingUp />,
                permission: [
                    roles.SUPER_ADMIN,
                    roles.ADMIN,
                    roles.MANAGER,
                    roles.USER,
                ],
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
                ],
            },

            //Payment Process
            {
                key: "payment",
                text: "Payment Processing",
                sub: true,
                icon: <Payment />,
                permission: [
                    roles.SUPER_ADMIN,
                    roles.ADMIN,
                    roles.MANAGER,
                    roles.USER,
                ],
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
                ],
            },

            //Report Pannel
            {
                key: "report",
                text: "Generate Reports",
                sub: true,
                icon: <Report />,
                permission: [
                    roles.SUPER_ADMIN,
                    roles.ADMIN,
                    roles.MANAGER,
                    roles.USER,
                ],
                children: [
                    {
                        path: "/report/customer",
                        key: "report-customer",
                        text: "Customer",
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
                ],
            },

            //Utilities pannel
            {
                key: "utilites",
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
                    {
                        path: "/compliance/report",
                        key: "report-compliance",
                        text: "Suspicious Reports",
                        sub: false,
                    },
                ],
            },

            //Account
            {
                path: "/accounting",
                key: "accounting",
                text: "Accounting",
                sub: false,
                icon: <Receipt />,
                permission: [roles.SUPER_ADMIN, roles.ADMIN, roles.MANAGER],
            },
        ];
    };

    return (
        <Drawer menus={getMainItems}>
            <Suspense fallback={<Loading loading={true} />}>
                {children}
            </Suspense>
        </Drawer>
    );
};

export default PrivateLayout;
