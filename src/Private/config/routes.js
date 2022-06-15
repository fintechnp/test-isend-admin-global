import { lazy } from "react";

//Dashboard
const Dashboard = lazy(() => import("../pages/Dashboard"));

//users
const Accounts = lazy(() => import("../pages/Users/Accounts"));
const Menu = lazy(() => import("../pages/Users/Menu"));
const SubMenu = lazy(() => import("../pages/Users/SubMenu"));

//users permission
const UserPermission = lazy(() => import("../pages/Users/UserPermission"));

//setup
const DeliveryOption = lazy(() => import("../pages/Setup/DeliveryOption"));
const DeliveryRoute = lazy(() => import("../pages/Setup/DeliveryRoute"));
const ExchangeRate = lazy(() => import("../pages/Setup/ExchangeRate"));
const ExchangeRateList = lazy(() =>
    import("../pages/Setup/ExchangeRate/ExchangeRateList")
);
const AddUpdateExchangeRate = lazy(() =>
    import("../pages/Setup/ExchangeRate/AddUpdateExchangeRate")
);
const ExchangeRateDetails = lazy(() =>
    import("../pages/Setup/ExchangeRate/ExchangeRateDetails")
);
const Partner = lazy(() => import("../pages/Setup/Partner"));
const AddUpdatePartner = lazy(() =>
    import("../pages/Setup/Partner/AddUpdatePartner")
);
const PartnerDetails = lazy(() =>
    import("../pages/Setup/Partner/PartnerDetails")
);
const Corridor = lazy(() => import("../pages/Setup/Partner/Corridor"));
const PartnerBank = lazy(() => import("../pages/Setup/PartnerBank"));
const MapBank = lazy(() => import("../pages/Setup/PartnerBank/MapBank"));
const PayoutLocation = lazy(() => import("../pages/Setup/PayoutLocation"));
const Reference = lazy(() => import("../pages/Setup/Reference"));
const ReferenceData = lazy(() =>
    import("../pages/Setup/Reference/ReferenceData")
);
const ServiceCharge = lazy(() => import("../pages/Setup/ServiceCharge"));
const ServiceChargeList = lazy(() =>
    import("../pages/Setup/ServiceCharge/ServiceChargeList")
);
const AddUpdateServiceCharge = lazy(() =>
    import("../pages/Setup/ServiceCharge/AddUpdateServiceCharge")
);
const ServiceChargeDetails = lazy(() =>
    import("../pages/Setup/ServiceCharge/ServiceChargeDetails")
);

//Customers
const CustomerSearch = lazy(() => import("../pages/Customers/Search"));
const CreateCustomer = lazy(() => import("../pages/Customers/CreateCustomer"));
const CustomerDetails = lazy(() =>
    import("../pages/Customers/CustomerDetails")
);
const AllBeneficiary = lazy(() => import("../pages/Customers/Beneficiary"));

//Transactions
const CreateTransactions = lazy(() => import("../pages/Transactions/Create"));
const DailyTransactions = lazy(() =>
    import("../pages/Transactions/DailyTransactions")
);
const SearchTransactions = lazy(() => import("../pages/Transactions/Search"));

//Reports
const ReportsCountrywise = lazy(() => import("../pages/Reports/Countrywise"));
const ReportsSummary = lazy(() => import("../pages/Reports/Summary"));

//PaymentProcess
const PendingPayment = lazy(() =>
    import("../pages/PaymentProcess/PendingPayment")
);
const PendingTransactions = lazy(() =>
    import("../pages/PaymentProcess/PendingTransactions")
);
const BlockedTransactions = lazy(() =>
    import("../pages/PaymentProcess/BlockedTransactions")
);
const Search = lazy(() => import("../pages/PaymentProcess/Search"));
const AmlSupicious = lazy(() => import("../pages/PaymentProcess/AmlSupicious"));
const ExceptionTransactions = lazy(() =>
    import("../pages/PaymentProcess/ExceptionTransactions")
);
const TransactionsDetails = lazy(() =>
    import("../pages/PaymentProcess/Details")
);

//Utilities
const Sms = lazy(() => import("../pages/Utilities/Sms"));
const Email = lazy(() => import("../pages/Utilities/Email"));
const Fcm = lazy(() => import("../pages/Utilities/Fcm"));

//Compliance
const SanctionList = lazy(() => import("../pages/Compliance/SanctionList"));
const CompliancePaymentRules = lazy(() =>
    import("../pages/Compliance/PaymentRules")
);
const ComplianceReport = lazy(() => import("../pages/Compliance/Report"));

//Settings
const Settings = lazy(() => import("../pages/Settings"));

//Messages
const Messages = lazy(() => import("../pages/Messages"));

//My Account
const MyAccount = lazy(() => import("../pages/MyAccount"));

const privateRoutes = [
    { path: "/", component: <Dashboard /> },
    { path: "/user/accounts", component: <Accounts /> },
    { path: "/user/permission/:id", component: <UserPermission /> },
    { path: "/user/menu", component: <Menu /> },
    { path: "/user/menu/sub/:name/:id", component: <SubMenu /> },

    //Setup routes
    { path: "/setup/delivery-option", component: <DeliveryOption /> },
    { path: "/setup/delivery-route", component: <DeliveryRoute /> },
    { path: "/setup/exchange-rate", component: <ExchangeRate /> },
    {
        path: "/setup/exchange-rate/:name/:sending_currency/:id",
        component: <ExchangeRateList />,
    },
    {
        path: "/setup/exchange-rate/create/:currency/:agent_id",
        component: <AddUpdateExchangeRate />,
    },
    {
        path: "/setup/exchange-rate/update/:id",
        component: <AddUpdateExchangeRate />,
    },
    {
        path: "/setup/exchange-rate/details/:id",
        component: <ExchangeRateDetails />,
    },
    { path: "/setup/partner", component: <Partner /> },
    { path: "/setup/partner/create", component: <AddUpdatePartner /> },
    { path: "/setup/partner/update/:id", component: <AddUpdatePartner /> },
    { path: "/setup/partner/details/:id", component: <PartnerDetails /> },
    { path: "/setup/partner/corridor/:id", component: <Corridor /> },
    { path: "/setup/partner-bank", component: <PartnerBank /> },
    {
        path: "/setup/partner-bank/map/:payment/:country/:currency/:id",
        component: <MapBank />,
    },
    { path: "/setup/payout-location", component: <PayoutLocation /> },
    { path: "/setup/reference", component: <Reference /> },
    { path: "/setup/reference/data/:name/:id", component: <ReferenceData /> },
    { path: "/setup/service-charge", component: <ServiceCharge /> },
    {
        path: "/setup/service-charge/:name/:id",
        component: <ServiceChargeList />,
    },
    {
        path: "/setup/service-charge/:agent_id/create",
        component: <AddUpdateServiceCharge />,
    },
    {
        path: "/setup/service-charge/update/:id",
        component: <AddUpdateServiceCharge />,
    },
    {
        path: "/setup/service-charge/details/:id",
        component: <ServiceChargeDetails />,
    },

    //Customers
    { path: "/customer/search", component: <CustomerSearch /> },
    { path: "/customer/create", component: <CreateCustomer /> },
    { path: "/customer/update/:id", component: <CreateCustomer /> },
    { path: "/customer/details/:id", component: <CustomerDetails /> },
    { path: "/customer/all-beneficiary/:id", component: <AllBeneficiary /> },

    //Transactions
    { path: "/transaction/new", component: <CreateTransactions /> },
    { path: "/transaction/daily", component: <DailyTransactions /> },
    { path: "/transaction/search", component: <SearchTransactions /> },

    //Reports
    { path: "/report/country-wise-report", component: <ReportsCountrywise /> },
    { path: "/report/summary", component: <ReportsSummary /> },

    //PaymentProcess
    { path: "/payment/pending", component: <PendingPayment /> },
    {
        path: "/payment/pending-transactions",
        component: <PendingTransactions />,
    },
    { path: "/payment/block-list", component: <BlockedTransactions /> },
    { path: "/payment/search", component: <Search /> },
    { path: "/payment/aml-suspicious", component: <AmlSupicious /> },
    {
        path: "/payment/exception-transactions",
        component: <ExceptionTransactions />,
    },
    {
        path: "/transactions/details/:id",
        component: <TransactionsDetails />,
    },

    //Utilities
    { path: "/utilities/sms", component: <Sms /> },
    { path: "/utilities/email", component: <Email /> },
    { path: "/utilities/fcm", component: <Fcm /> },

    //Compliance
    { path: "/compliance/sanction-list", component: <SanctionList /> },
    {
        path: "/compliance/payment-rules",
        component: <CompliancePaymentRules />,
    },
    { path: "/compliance/report", component: <ComplianceReport /> },

    //Settings
    { path: "/settings", component: <Settings /> },

    //Messages
    { path: "/messages", component: <Messages /> },

    //MyAccount
    { path: "/account", component: <MyAccount /> },
];

export default privateRoutes;
