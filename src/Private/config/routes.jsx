import routePaths from "./routePaths";

// region: Dashboard
import Dashboard from "../pages/Dashboard";

// region: users
import Accounts from "../pages/Users/Accounts";
import AddUserKyc from "../pages/Users/Accounts/AddUserKyc";
import EditUserKyc from "../pages/Users/Accounts/EditUserKyc";
import EditUserProfileSetup from "Private/pages/Users/ProfileSetups/EditUserProfileSetup";
import ListUserProfileSetup from "Private/pages/Users/ProfileSetups/ListUserProfileSetup";

// region: setup
import DeliveryOption from "../pages/Setup/DeliveryOption";
import DeliveryRoute from "../pages/Setup/DeliveryRoute";
import ExchangeRate from "../pages/Setup/ExchangeRate";
import ExchangeRateList from "../pages/Setup/ExchangeRate/ExchangeRateList";
import AddUpdateExchangeRate from "../pages/Setup/ExchangeRate/AddUpdateExchangeRate";
import ExchangeRateDetails from "../pages/Setup/ExchangeRate/ExchangeRateDetails";
import Partner from "../pages/Setup/Partner";
import AddUpdatePartner from "../pages/Setup/Partner/AddUpdatePartner";
import PartnerDetails from "../pages/Setup/Partner/PartnerDetails";
import Corridor from "../pages/Setup/Partner/Corridor";
import PartnerBranch from "../pages/Setup/Partner/PartnerBranch";
import AddPartnerBranch from "../pages/Setup/Partner/PartnerBranch/AddBranch";
import PartnerBank from "../pages/Setup/PartnerBank";
import MapBank from "../pages/Setup/PartnerBank/MapBank";
import PayoutLocation from "../pages/Setup/PayoutLocation";
import Reference from "../pages/Setup/Reference";
import ReferenceData from "../pages/Setup/Reference/ReferenceData";
import ServiceCharge from "../pages/Setup/ServiceCharge";
import ServiceChargeList from "../pages/Setup/ServiceCharge/ServiceChargeList";
import AddUpdateServiceCharge from "../pages/Setup/ServiceCharge/AddUpdateServiceCharge";
import ServiceChargeDetails from "../pages/Setup/ServiceCharge/ServiceChargeDetails";
import PromoSetup from "../pages/Setup/PromoSetup";
import PromoCode from "../pages/Setup/PromoSetup/PromoCode";
import ApiConfiguration from "../pages/Setup/ApiConfiguration";
import LanguageSetup from "../pages/Setup/LanguageSetup/LanguageSetup";
import LanguageCountry from "../pages/Setup/LanguageCountry/LanguageCountry";
import AddLanguage from "../pages/Setup/AddLanguage/AddLanguage";
import LocalizationDetails from "../pages/Setup/LocalizationDetails/LocalizationDetails";
import StreetType from "../pages/Setup/StreetType/StreetType";

//Customers
import CustomerSearch from "../pages/Customers/Search";
import CreateCustomer from "../pages/Customers/CreateCustomer";
import CustomerDetails from "../pages/Customers/CustomerDetails";
import AllBeneficiary from "../pages/Customers/Beneficiary";
import AddBeneficiary from "../pages/Customers/Beneficiary/AddUpdateBeneficiary";
import BeneficiaryDetails from "../pages/Customers/Beneficiary/Details";
import CustomerTransactions from "../pages/Customers/Transactions";
import CustomerBanks from "../pages/Customers/Banks/Banks";
import AllBanks from "../pages/Customers/AllBanks/BankList";
import CustomerDeleteList from "Private/pages/Customers/DeleteList/CustomerDeleteList";

//Documents
import Documents from "../pages/Customers/Documents";

//remarks
import CustomerRemarks from "../pages/Customers/Remarks";

//Transactions
import CreateTransactions from "../pages/Transactions/Create";
import DailyTransactions from "../pages/Transactions/DailyTransactions";
import SearchTransactions from "../pages/Transactions/Search";
import TransactionRemarks from "../pages/Transactions/Remarks";

//Reports
import CustomerReport from "../pages/Reports/Customer";
import BeneficiaryReport from "../pages/Reports/Beneficiary";
import YearlyTransactions from "../pages/Reports/YearlyTransactions";
import TransactionsSummary from "../pages/Reports/TransactionsSummary";
import CancelledTransactions from "../pages/Reports/CancelledTransactions";
import ACHEntriesReport from "../pages/Reports/ACHEntries/ACHEntriesReport";
import SuspiciousTransactions from "../pages/Reports/SuspiciousTransactions";
import ICNResponseReport from "../pages/Reports/ICNResponse/ICNResponseReport";
import UserIPWhitelistReport from "../pages/Reports/UserIPWhitelist/UserIPWhitelistReport";
import IncompleteRegistrationReport from "../pages/Reports/IncompleteRegistration/IncompleteRegistrationReport";
import OnfidoReport from "../pages/Reports/OnfidoReports/OnfidoReport";

//PaymentProcess
import PendingPayment from "../pages/PaymentProcess/PendingPayment";
import PendingTransactions from "../pages/PaymentProcess/PendingTransactions";
import BlockedTransactions from "../pages/PaymentProcess/BlockedTransactions";
import Search from "../pages/PaymentProcess/Search";
import AmlSupicious from "../pages/PaymentProcess/AmlSupicious";
import ExceptionTransactions from "../pages/PaymentProcess/ExceptionTransactions";
import TransactionsDetails from "../pages/PaymentProcess/Details";
import TransactionDocuments from "../pages/PaymentProcess/Details/Documents";

//Utilities
import Sms from "../pages/Utilities/Sms";
import Email from "../pages/Utilities/Email";
import Fcm from "../pages/Utilities/Fcm";

//Compliance
import SanctionList from "../pages/Compliance/SanctionList";
import CompliancePaymentRules from "../pages/Compliance/PaymentRules";

//Settings
import Settings from "../pages/Settings";

//Messages
import Messages from "../pages/Messages";

//My Account
import MyAccount from "../pages/MyAccount";

import ListBanner from "../pages/Setup/Banner/ListBanner";
import ListBulkEmail from "../pages/Utilities/BulkEmail/ListBulkEmail";
import ListCountryState from "../pages/Setup/CountryState/ListCountryState";
import ListFundingSource from "../pages/Setup/FundingSource/ListFundingSource";

//Market Maker
import ListMarketMaker from "../pages/MarketMaker/ListMarketMaker";
import AddMarketMaker from "../pages/MarketMaker/AddMarketMaker";
import ViewMarketMaker from "../pages/MarketMaker/ViewMarketMaker";
import UpdateMarketMaker from "../pages/MarketMaker/UpdateMarketMaker";
import AddMarketMakerKyb from "../pages/MarketMaker/AddMarketMakerKyb";
import AddMarketMakerKyc from "../pages/MarketMaker/AddMarketMakerKyc";
import UpdateMarketMakerKyb from "../pages/MarketMaker/UpdateMarketMakerKyb";
import UpdateMarketMakerKyc from "../pages/MarketMaker/UpdateMarketMakerKyc";

///Credit Limit
import CreditLimit from "../pages/CreditLimit/CreditLimit";
import AddCreditLimit from "../pages/CreditLimit/AddCreditLimit";
import ViewCreditLimit from "../pages/CreditLimit/ViewCreditLimit";
import EditCreditLimit from "../pages/CreditLimit/EditCreditLimit";

// BALANCE REQUEST
import ListBalanceRequest from "../pages/BalanceRequest/ListBalanceRequest";
import ViewBalanceRequest from "../pages/BalanceRequest/ViewBalanceRequest";

//Business
import ListBusiness from "../pages/Business/ListBusiness";
import ViewBusiness from "../pages/Business/ViewBusiness";
import ListSingeTransaction from "../pages/B2BTransactions/ListSingleTransaction";
import ViewSingleTransaction from "../pages/B2BTransactions/ViewSingleTransaction";
import ListBatchTransaction from "../pages/B2BTransactions/ListBatchTransaction";
import ViewBatchTransaction from "../pages/B2BTransactions/ViewBatchTransaction";

// B2b Beneficiary
import ListB2bBeneficiary from "../pages/Beneficiary/ListBeneficiary";
import ViewB2bBeneficiary from "../pages/Beneficiary/ViewBeneficiary";

// BUSINESS SERVICE CHARGE
import ListBusinessServiceCharge from "../pages/BusinessServiceCharge/ListBusinessServiceCharge";
import AddBusinessServiceCharge from "../pages/BusinessServiceCharge/AddBusinessServiceCharge";
import UpdateBusinessServiceCharge from "../pages/BusinessServiceCharge/UpdateBusinessServiceCharge";

//LIST KYC USER
import ListKycUser from "../pages/KycUser/ListKycUser";
import ViewKycUser from "../pages/KycUser/ViewKycUser";
import AddMarketMakerUserKyc from "../pages/MarketMaker/AddMarketMakerUserKyc";
import EditMarketMakerUserKyc from "../pages/MarketMaker/EditMarketMakerUserKyc";

//Ledger
import ListLedger from "../pages/Ledger/ListLedger";
import ViewLedger from "../pages/Ledger/ViewLedger";
import AddLedger from "../pages/Ledger/AddLedger";

// B2b Account
import ListB2bAccount from "../pages/B2BAccount/ListAllAccounts";
import ListAccountList from "Private/pages/AccountList/ListAccountList";
import AchTransactions from "Private/pages/Transactions/AchTransactions/AchTransactions";
import ListCountries from "Private/pages/Setup/Countries/ListCountries";
import ListDocumentAcceptance from "Private/pages/Setup/DocumentAcceptance/ListDocumentAcceptance";
import ZaiAustraliaPayment from "Private/pages/PaymentProcess/ZaiAustraliaPayment/ZaiAustraliaPayment";
import CustomerDeleteRequestDetail from "Private/pages/Customers/DeleteList/CustomerDeleteRequestDetail";

const privateRoutes = [
    { path: "/", component: <Dashboard title="Dashboard" /> },
    { path: "/user/accounts", component: <Accounts title="User Accounts" /> },
    { path: routePaths.users.listProfileSetup, component: <ListUserProfileSetup /> },
    { path: routePaths.users.editProfileSetup, component: <EditUserProfileSetup /> },
    {
        path: routePaths.userKyc.addSystemUserKyc,
        component: <AddUserKyc />,
    },
    {
        path: routePaths.userKyc.editSystemUserKyc,
        component: <EditUserKyc />,
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
        path: routePaths.countries.index,
        component: <ListCountries />,
    },

    {
        path: routePaths.countryStates.index,
        component: <ListCountryState />,
    },
    {
        path: routePaths.documentAcceptance.index,
        component: <ListDocumentAcceptance />,
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
    {
        path: routePaths.customer.deleteList,
        component: <CustomerDeleteList />,
    },
    {
        path: routePaths.customer.deleteRequestDetails,
        component: <CustomerDeleteRequestDetail />,
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
    {
        path: routePaths.transaction.achTransaction,
        component: <AchTransactions />,
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
    {
        path: routePaths.transaction.zaiTransaction,
        component: <ZaiAustraliaPayment />,
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

    //Agent
    { path: routePaths.agent.listMarketMaker, component: <ListMarketMaker /> },
    { path: routePaths.agent.addMarketMaker, component: <AddMarketMaker /> },
    { path: routePaths.agent.viewMarketMaker, component: <ViewMarketMaker /> },
    { path: routePaths.agent.updateMarketMaker, component: <UpdateMarketMaker /> },
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
    {
        path: "/agent/market-maker/:marketMakerId/update-kyc/:kycId",
        component: <UpdateMarketMakerKyc />,
    },

    ///Credit Limit
    { path: routePaths.agent.creditLimit, component: <CreditLimit title="Credit Limit" /> },
    { path: routePaths.agent.addCreditLimit, component: <AddCreditLimit title="Add Credit Limit" /> },
    { path: routePaths.agent.viewCreditLimit, component: <ViewCreditLimit title="Credit Limit Detail" /> },
    {
        path: routePaths.agent.editCreditLimit,
        component: <EditCreditLimit />,
    },

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
    { path: routePaths.agent.viewB2bBeneficiary, component: <ViewB2bBeneficiary /> },

    // BUSINESS SERVICE CHARGE

    {
        path: routePaths.agent.listBusinessServiceCharge,
        component: <ListBusinessServiceCharge />,
    },
    {
        path: routePaths.agent.addBusinessServiceCharge,
        component: <AddBusinessServiceCharge />,
    },
    {
        path: routePaths.agent.updateBusinessServiceCharge,
        component: <UpdateBusinessServiceCharge />,
    },

    // LIST KYC USER

    { path: routePaths.agent.listKycUser, component: <ListKycUser /> },
    { path: routePaths.agent.viewKycUser, component: <ViewKycUser /> },
    { path: routePaths.agent.addUserKyc, component: <AddMarketMakerUserKyc /> },
    { path: routePaths.agent.editUserKyc, component: <EditMarketMakerUserKyc /> },

    //Ledger

    {
        path: routePaths.agent.listLedger,
        component: <ListLedger />,
    },

    {
        path: routePaths.agent.viewLedger,
        component: <ViewLedger />,
    },
    {
        path: routePaths.agent.addLedger,
        component: <AddLedger />,
    },

    // B2b Account

    {
        path: routePaths.agent.listB2bAccount,
        component: <ListB2bAccount />,
    },

    {
        path: routePaths.agent.listAccounts,
        component: <ListAccountList />,
    },
];

export default privateRoutes;
