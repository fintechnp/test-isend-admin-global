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
} from "@mui/icons-material";
import roles from "../../global/roles";
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

            //Tracker pannel
            {
                key: "customer",
                text: "Customer",
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
                        path: "/customer/report",
                        key: "customer-report",
                        text: "Report",
                        sub: false,
                    },
                ],
            },

            //Transaction
            {
                key: "transaction",
                text: "Transaction",
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
                        text: "Daily Transaction",
                        sub: false,
                    },
                    {
                        path: "/transaction/pending",
                        key: "pending-transaction",
                        text: "Pending Transaction",
                        sub: false,
                    },
                ],
            },

            //Report Pannel
            {
                key: "report",
                text: "Report",
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
                        path: "/report/summary",
                        key: "report-summary",
                        text: "Summary",
                        sub: false,
                    },
                    {
                        path: "/report/country-wise-report",
                        key: "country-wise-report",
                        text: "Countrywise",
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
                        path: "/compliance/hold-list",
                        key: "hold-compliance",
                        text: "Hold List",
                        sub: false,
                    },
                    {
                        path: "/compliance/block",
                        key: "blocksetup",
                        text: "Block List",
                        sub: false,
                    },
                    {
                        path: "/compliance/payment-rules",
                        key: "paymentsetup",
                        text: "Payment Rules",
                        sub: false,
                    },
                    {
                        path: "/compliance/report",
                        key: "report-compliance",
                        text: "Report",
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
