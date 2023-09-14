import { lazy } from "react";
import routePaths from "./routePaths";

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
const ExchangeRateList = lazy(() => import("../pages/Setup/ExchangeRate/ExchangeRateList"));
const AddUpdateExchangeRate = lazy(() => import("../pages/Setup/ExchangeRate/AddUpdateExchangeRate"));
const ExchangeRateDetails = lazy(() => import("../pages/Setup/ExchangeRate/ExchangeRateDetails"));
const Partner = lazy(() => import("../pages/Setup/Partner"));
const AddUpdatePartner = lazy(() => import("../pages/Setup/Partner/AddUpdatePartner"));
const PartnerDetails = lazy(() => import("../pages/Setup/Partner/PartnerDetails"));
const Corridor = lazy(() => import("../pages/Setup/Partner/Corridor"));
const PartnerBranch = lazy(() => import("../pages/Setup/Partner/PartnerBranch"));
const AddPartnerBranch = lazy(() => import("../pages/Setup/Partner/PartnerBranch/AddBranch"));
const PartnerBank = lazy(() => import("../pages/Setup/PartnerBank"));
const MapBank = lazy(() => import("../pages/Setup/PartnerBank/MapBank"));
const PayoutLocation = lazy(() => import("../pages/Setup/PayoutLocation"));
const Reference = lazy(() => import("../pages/Setup/Reference"));
const ReferenceData = lazy(() => import("../pages/Setup/Reference/ReferenceData"));
const ServiceCharge = lazy(() => import("../pages/Setup/ServiceCharge"));
const ServiceChargeList = lazy(() => import("../pages/Setup/ServiceCharge/ServiceChargeList"));
const AddUpdateServiceCharge = lazy(() => import("../pages/Setup/ServiceCharge/AddUpdateServiceCharge"));
const ServiceChargeDetails = lazy(() => import("../pages/Setup/ServiceCharge/ServiceChargeDetails"));
const PromoSetup = lazy(() => import("../pages/Setup/PromoSetup"));
const PromoCode = lazy(() => import("../pages/Setup/PromoSetup/PromoCode"));
const ApiConfiguration = lazy(() => import("../pages/Setup/ApiConfiguration"));
const LanguageSetup = lazy(() => import("../pages/Setup/LanguageSetup/LanguageSetup"));
const LanguageCountry = lazy(() => import("../pages/Setup/LanguageCountry/LanguageCountry"));
const AddLanguage = lazy(() => import("../pages/Setup/AddLanguage/AddLanguage"));
const LocalizationDetails = lazy(() => import("../pages/Setup/LocalizationDetails/LocalizationDetails"));
const StreetType = lazy(() => import("../pages/Setup/StreetType/StreetType"));

//Customers
const CustomerSearch = lazy(() => import("../pages/Customers/Search"));
const CreateCustomer = lazy(() => import("../pages/Customers/CreateCustomer"));
const CustomerDetails = lazy(() => import("../pages/Customers/CustomerDetails"));
const AllBeneficiary = lazy(() => import("../pages/Customers/Beneficiary"));
const AddBeneficiary = lazy(() => import("../pages/Customers/Beneficiary/AddUpdateBeneficiary"));
const BeneficiaryDetails = lazy(() => import("../pages/Customers/Beneficiary/Details"));
const CustomerTransactions = lazy(() => import("../pages/Customers/Transactions"));
const CustomerBanks = lazy(() => import("../pages/Customers/Banks/Banks"));
const AllBanks = lazy(() => import("./../pages/Customers/AllBanks/BankList"));

//Documents
const Documents = lazy(() => import("../pages/Customers/Documents"));

//remarks
const CustomerRemarks = lazy(() => import("../pages/Customers/Remarks"));

//Transactions
const CreateTransactions = lazy(() => import("../pages/Transactions/Create"));
const DailyTransactions = lazy(() => import("../pages/Transactions/DailyTransactions"));
const SearchTransactions = lazy(() => import("../pages/Transactions/Search"));
const TransactionRemarks = lazy(() => import("../pages/Transactions/Remarks"));

//Reports
const CustomerReport = lazy(() => import("../pages/Reports/Customer"));
const BeneficiaryReport = lazy(() => import("../pages/Reports/Beneficiary"));
const YearlyTransactions = lazy(() => import("../pages/Reports/YearlyTransactions"));
const TransactionsSummary = lazy(() => import("../pages/Reports/TransactionsSummary"));
const CancelledTransactions = lazy(() => import("../pages/Reports/CancelledTransactions"));
const ACHEntriesReport = lazy(() => import("../pages/Reports/ACHEntries/ACHEntriesReport"));
const SuspiciousTransactions = lazy(() => import("../pages/Reports/SuspiciousTransactions"));
const ICNResponseReport = lazy(() => import("../pages/Reports/ICNResponse/ICNResponseReport"));
const UserIPWhitelistReport = lazy(() => import("../pages/Reports/UserIPWhitelist/UserIPWhitelistReport"));
const IncompleteRegistrationReport = lazy(() =>
    import("../pages/Reports/IncompleteRegistration/IncompleteRegistrationReport"),
);
const OnfidoReport = lazy(() => import("../pages/Reports/OnfidoReports/OnfidoReport"));

//PaymentProcess
const PendingPayment = lazy(() => import("../pages/PaymentProcess/PendingPayment"));
const PendingTransactions = lazy(() => import("../pages/PaymentProcess/PendingTransactions"));
const BlockedTransactions = lazy(() => import("../pages/PaymentProcess/BlockedTransactions"));
const Search = lazy(() => import("../pages/PaymentProcess/Search"));
const AmlSupicious = lazy(() => import("../pages/PaymentProcess/AmlSupicious"));
const ExceptionTransactions = lazy(() => import("../pages/PaymentProcess/ExceptionTransactions"));
const TransactionsDetails = lazy(() => import("../pages/PaymentProcess/Details"));
const TransactionDocuments = lazy(() => import("../pages/PaymentProcess/Details/Documents"));

//Utilities
const Sms = lazy(() => import("../pages/Utilities/Sms"));
const Email = lazy(() => import("../pages/Utilities/Email"));
const Fcm = lazy(() => import("../pages/Utilities/Fcm"));

//Compliance
const SanctionList = lazy(() => import("../pages/Compliance/SanctionList"));
const CompliancePaymentRules = lazy(() => import("../pages/Compliance/PaymentRules"));

//Settings
const Settings = lazy(() => import("../pages/Settings"));

//Messages
const Messages = lazy(() => import("../pages/Messages"));

//My Account
const MyAccount = lazy(() => import("../pages/MyAccount"));

//Accounting
const Accounting = lazy(() => import("../pages/Accounting"));

const ListBanner = lazy(() => import("../pages/Setup/Banner/ListBanner"));
const ListBulkEmail = lazy(() => import("../pages/BulkEmail/ListBulkEmail"));
const ListCountryState = lazy(() => import("../pages/Setup/CountryState/ListCountryState"));
const ListFundingSource = lazy(() => import("../pages/Setup/FundingSource/ListFundingSource"));

//Market Maker

const MarketMaker = lazy(() => import("../pages/MarketMaker/MarketMaker"));
const AddMarketMaker = lazy(() => import("../pages/MarketMaker/AddMarketMaker"));
const ViewMarketMaker = lazy(() => import("../pages/MarketMaker/ViewMarketMaker"));
const UpdateMarketMaker = lazy(() => import("../pages/MarketMaker/UpdateMarketMaker"));
const AddMarketMakerKyb = lazy(() => import("../pages/MarketMaker/AddMarketMakerKyb"));
const AddMarketMakerKyc = lazy(() => import("../pages/MarketMaker/AddMarketMakerKyc"));
const UpdateMarketMakerKyb = lazy(() => import("../pages/MarketMaker/UpdateMarketMakerKyb"));

///Credit Limit

const CreditLimit = lazy(() => import("../pages/CreditLimit/CreditLimit"));
const AddCreditLimit = lazy(() => import("../pages/CreditLimit/AddCreditLimit"));
const ViewCreditLimit = lazy(() => import("../pages/CreditLimit/ViewCreditLimit"));

// BALANCE REQUEST

const ListBalanceRequest = lazy(() => import("../pages/BalanceRequest/ListBalanceRequest"));
const ViewBalanceRequest = lazy(() => import("../pages/BalanceRequest/ViewBalanceRequest"));

//Business
const ListBusiness = lazy(() => import("../pages/Business/ListBusiness"));
const ViewBusiness = lazy(() => import("../pages/Business/ViewBusiness"));
const ListSingeTransaction = lazy(() => import("../pages/B2BTransactions/ListSingleTransaction"));
const ViewSingleTransaction = lazy(() => import("../pages/B2BTransactions/ViewSingleTransaction"));
const ListBatchTransaction = lazy(() => import("../pages/B2BTransactions/ListBatchTransaction"));
const ViewBatchTransaction = lazy(() => import("../pages/B2BTransactions/ViewBatchTransaction"));

// B2b Beneficiary

const ListB2bBeneficiary = lazy(() => import("../pages/Beneficiary/ListBeneficiary"));

const privateRoutes = [
    { path: "/", component: <Dashboard title="Dashboard" /> },
    { path: "/user/accounts", component: <Accounts title="User Accounts" /> },
    {
        path: "/user/permission/:id",
        component: <UserPermission title="User Permissions" />,
    },
    { path: "/user/menu", component: <Menu title="Menus" /> },
    {
        path: "/user/menu/sub/:name/:id",
        component: <SubMenu title="Sub Menus" />,
    },

    //Setup routes
    {
        path: "/setup/delivery-option",
        component: <DeliveryOption title="Delivery Options" />,
    },
    {
        path: "/setup/delivery-route",
        component: <DeliveryRoute title="Delivery Route" />,
    },
    {
        path: "/setup/exchange-rate",
        component: <ExchangeRate title="Partnerwise Exchange Rate" />,
    },
    {
        path: "/setup/exchange-rate/:name/:sending_currency/:id",
        component: <ExchangeRateList title="Exchange Rate List" />,
    },
    {
        path: "/setup/exchange-rate/create/:currency/:agent_id",
        component: <AddUpdateExchangeRate title="Create Exchange Rate" />,
    },
    {
        path: "/setup/exchange-rate/update/:id",
        component: <AddUpdateExchangeRate title="Update Exchange Rate" />,
    },
    {
        path: "/setup/exchange-rate/details/:id",
        component: <ExchangeRateDetails title="Exchange Rate Details" />,
    },
    { path: "/setup/partner", component: <Partner title="Partner List" /> },
    {
        path: "/setup/partner/create",
        component: <AddUpdatePartner title="Create Partner" />,
    },
    {
        path: "/setup/partner/update/:id",
        component: <AddUpdatePartner title="Update Partner" />,
    },
    {
        path: "/setup/partner/details/:id",
        component: <PartnerDetails title="Partner Details" />,
    },
    {
        path: "/setup/partner/corridor/:name/:id",
        component: <Corridor title="Corridor List" />,
    },
    {
        path: "/setup/partner/branch/:name/:id",
        component: <PartnerBranch title="Branch" />,
    },
    {
        path: "/setup/partner/branch/add/:agent_id",
        component: <AddPartnerBranch title="Add Branch" />,
    },
    {
        path: "/setup/partner/branch/update/:agent_id/:branch_id",
        component: <AddPartnerBranch title="Update Branch" />,
    },
    {
        path: "/setup/partner-bank",
        component: <PartnerBank title="Partner Bank" />,
    },
    {
        path: "/setup/partner-bank/map/:payment/:country/:currency/:id",
        component: <MapBank title="Map Partner Bank" />,
    },
    {
        path: "/setup/payout-location",
        component: <PayoutLocation title="Payout Location" />,
    },
    { path: "/setup/reference", component: <Reference title="Reference" /> },
    {
        path: "/setup/reference/data/:name/:id",
        component: <ReferenceData title="Reference Data" />,
    },
    {
        path: "/setup/service-charge",
        component: <ServiceCharge title="Partnerwise Service Charge" />,
    },
    {
        path: "/setup/service-charge/:name/:id",
        component: <ServiceChargeList title="Service Charge List" />,
    },
    {
        path: "/setup/service-charge/:agent_id/create",
        component: <AddUpdateServiceCharge title="Create Service Charge" />,
    },
    {
        path: "/setup/service-charge/update/:id",
        component: <AddUpdateServiceCharge title="Update Service Charge" />,
    },
    {
        path: "/setup/service-charge/details/:id",
        component: <ServiceChargeDetails title="Service Charge Details" />,
    },
    {
        path: "/setup/promo-setup",
        component: <PromoSetup title="Promo Setup" />,
    },
    {
        path: "/setup/promo-code/:name/:id",
        component: <PromoCode title="Promo Code" />,
    },
    {
        path: "/setup/api-configuration",
        component: <ApiConfiguration title="Api Configuration" />,
    },
    {
        path: "/setup/banners",
        component: <ListBanner />,
    },
    {
        path: routePaths.countryStates.index,
        component: <ListCountryState />,
    },
    {
        path: routePaths.fundingSources.index,
        component: <ListFundingSource />,
    },
    {
        path: routePaths.setup.language,
        component: <LanguageSetup />,
    },
    {
        path: routePaths.setup.languageCountry,
        component: <LanguageCountry />,
    },
    {
        path: routePaths.setup.addLanguage,
        component: <AddLanguage />,
    },
    {
        path: routePaths.setup.localizationDetails,
        component: <LocalizationDetails title={"Localization Details"} />,
    },
    {
        path: routePaths.setup.streetType,
        component: <StreetType title={"Street Type"} />,
    },
    //Customers
    {
        path: "/customer/search",
        component: <CustomerSearch title="Customer Search" />,
    },
    {
        path: "/customer/create",
        component: <CreateCustomer title="Create Customer" />,
    },
    {
        path: "/customer/update/:id",
        component: <CreateCustomer title="Update Customer" />,
    },
    {
        path: "/customer/details/:id",
        component: <CustomerDetails title="Customer Details" />,
    },
    {
        path: "/customer/all-beneficiary/:id",
        component: <AllBeneficiary title="Beneficiary List" />,
    },
    {
        path: "/customer/beneficiary/add/:id",
        component: <AddBeneficiary title="Create Beneficiary" />,
    },
    {
        path: "/customer/beneficiary/update/:id/:bene_id",
        component: <AddBeneficiary title="Update Beneficiary" />,
    },
    {
        path: "/customer/beneficiary/details/:id/:bene_id",
        component: <BeneficiaryDetails title="Beneficiary Details" />,
    },
    {
        path: "/customer/all-transactions/:id",
        component: <CustomerTransactions title="Customer's Transactions" />,
    },
    {
        path: "/customer/documents/:id",
        component: <Documents title="Customer's Documents" />,
    },

    {
        path: "/customer/remarks/:id",
        component: <CustomerRemarks title="Customer's Remarks" />,
    },
    {
        path: routePaths.customer.banks,
        component: <CustomerBanks />,
    },
    {
        path: routePaths.customer.allBank,
        component: <AllBanks />,
    },

    //Transactions
    {
        path: "/transaction/new",
        component: <CreateTransactions title="Create Transaction" />,
    },
    {
        path: "/transaction/update/:id",
        component: <CreateTransactions title="Update Transaction" />,
    },
    {
        path: "/transaction/daily",
        component: <DailyTransactions title="Daily Transactions" />,
    },
    {
        path: "/transaction/search",
        component: <SearchTransactions title="Search Transactions" />,
    },
    {
        path: "/transaction/remarks/:id",
        component: <TransactionRemarks title="Transaction's Remarks" />,
    },

    //Reports
    {
        path: "/report/customer",
        component: <CustomerReport title="Customer Reports" />,
    },
    {
        path: "/report/beneficiary",
        component: <BeneficiaryReport title="Beneficiary Reports" />,
    },
    {
        path: "/report/yearly-transactions",
        component: <YearlyTransactions title="Yearly Transactions" />,
    },
    {
        path: "/report/transaction-summary",
        component: <TransactionsSummary title="Transaction Summary" />,
    },
    {
        path: "/report/cancelled-transactions",
        component: <CancelledTransactions title="Cancelled Transactions" />,
    },
    {
        path: "/report/suspicious-transactions",
        component: <SuspiciousTransactions title="Suspicious Transactions" />,
    },
    {
        path: routePaths.reports.userIpWhitelist,
        component: <UserIPWhitelistReport />,
    },
    {
        path: routePaths.reports.icnResponse,
        component: <ICNResponseReport />,
    },
    {
        path: routePaths.reports.achEntries,
        component: <ACHEntriesReport />,
    },
    {
        path: routePaths.reports.incompleteRegistration,
        component: <IncompleteRegistrationReport />,
    },
    {
        path: routePaths.reports.onfidoReport,
        component: <OnfidoReport />,
    },

    //PaymentProcess
    {
        path: "/payment/pending",
        component: <PendingPayment title="Pending Payment" />,
    },
    {
        path: "/payment/pending-transactions",
        component: <PendingTransactions title="Pending Transactions" />,
    },
    {
        path: "/payment/block-list",
        component: <BlockedTransactions title="Blocked Transactions" />,
    },
    { path: "/payment/search", component: <Search title="Block/Refund" /> },
    {
        path: "/payment/aml-suspicious",
        component: <AmlSupicious title="AML Suspicious" />,
    },
    {
        path: "/payment/exception-transactions",
        component: <ExceptionTransactions title="Exception Transactions" />,
    },
    {
        path: "/transactions/details/:id",
        component: <TransactionsDetails title="Transaction Details" />,
    },
    {
        path: "/transactions/details/aml-suspicious/:tid",
        component: <TransactionsDetails title="Transaction Details" />,
    },
    {
        path: "/transaction/documents/:id",
        component: <TransactionDocuments />,
    },

    //Utilities
    { path: "/utilities/sms", component: <Sms title="SMS" /> },
    { path: "/utilities/email", component: <Email title="Email" /> },
    { path: "/utilities/fcm", component: <Fcm title="FCM" /> },
    { path: routePaths.bulkEmails.index, component: <ListBulkEmail /> },

    //Compliance
    {
        path: "/compliance/sanction-list",
        component: <SanctionList title="Sanction List" />,
    },
    {
        path: "/compliance/payment-rules",
        component: <CompliancePaymentRules title="Payment Rules" />,
    },

    //Settings
    { path: "/settings", component: <Settings title="Settings" /> },

    //Messages
    { path: "/messages", component: <Messages title="Messages" /> },

    //MyAccount
    { path: "/account", component: <MyAccount title="My Account" /> },

    //Accounting
    { path: "/accounting", component: <Accounting title="Accounting" /> },

    //Accounting
    { path: "/accounting", component: <Accounting title="Accounting" /> },

    //Agent

    { path: routePaths.agent.marketMaker, component: <MarketMaker title="Market Maker" /> },
    { path: routePaths.agent.addMarketMaker, component: <AddMarketMaker title=" Add Market Maker" /> },
    { path: routePaths.agent.viewMarketMaker, component: <ViewMarketMaker title="Market Maker Details" /> },
    { path: routePaths.agent.updateMarketMaker, component: <UpdateMarketMaker title="Update Market Maker" /> },
    {
        path: routePaths.agent.addMarketMakerKyb,
        component: <AddMarketMakerKyb title="Add Market Maker KYB" />,
    },
    {
        path: routePaths.agent.addMarketMakerKyc,
        component: <AddMarketMakerKyc title="Add Market Maker KYC" />,
    },

    {
        path: "/agent/market-maker/:marketMakerId/update-kyb/:kybId",
        component: <UpdateMarketMakerKyb title="Update Market Maker KYB" />,
    },

    ///Credit Limit
    { path: routePaths.agent.creditLimit, component: <CreditLimit title="Credit Limit" /> },
    { path: routePaths.agent.addCreditLimit, component: <AddCreditLimit title="Add Credit Limit" /> },
    { path: routePaths.agent.viewCreditLimit, component: <ViewCreditLimit title="Credit Limit Detail" /> },

    //BALANCE REQUEST
    { path: routePaths.agent.listBalanceRequest, component: <ListBalanceRequest title="List Balance Request" /> },
    { path: routePaths.agent.viewBalanceRequest, component: <ViewBalanceRequest title="Balance Request Detail" /> },

    //Business
    { path: routePaths.agent.listBusiness, component: <ListBusiness title="Businesses" /> },
    { path: routePaths.agent.viewBusiness, component: <ViewBusiness title="View Business" /> },

    { path: routePaths.agent.listSingleTransactions, component: <ListSingeTransaction /> },
    { path: routePaths.agent.viewSingleTransaction, component: <ViewSingleTransaction /> },
    { path: routePaths.agent.listBatchTransactions, component: <ListBatchTransaction /> },
    { path: routePaths.agent.viewBatchTransaction, component: <ViewBatchTransaction /> },

    //B2b Beneficiary

    { path: routePaths.agent.getAllB2bBeneficiary, component: <ListB2bBeneficiary /> },
];

export default privateRoutes;
