const routePaths = {
    banners: {
        index: "/setup/banners",
    },
    countries: {
        index: "/setup/countries",
    },

    countryStates: {
        index: "/setup/country-states",
    },

    documentAcceptance: {
        index: "/setup/documentacceptance",
    },

    fundingSources: {
        index: "/setup/funding-sources",
    },
    reports: {
        userIpWhitelist: "/report/user-ip-whitelist",
        icnResponse: "/report/icn-response",
        achEntries: "/report/ach-entries",
        incompleteRegistration: "/report/incomplete-registration",
        onfidoReport: "/report/onfido-reports",
    },
    bulkEmails: {
        index: "/utilities/bulk-emails",
    },
    setup: {
        language: "/setup/language-setup",
        languageCountry: "/setup/language-country",
        addLanguage: "/setup/add-language",
        localizationDetails: "/localization/details/:id",
        streetType: "/setup/street-type",
        policies: "/setup/policies",
    },
    customer: {
        create: "/customer/create",
        banks: "/customer/banks/:customerId",
        allBank: "/customer/banks",
        deleteList: "/customer/delete-requests",
        deleteRequestDetails: "/customer/delete-request-details/:id",
    },
    agent: {
        listMarketMaker: "/agent/agents",
        addMarketMaker: "/agent/market-maker/add",
        viewMarketMaker: "/agent/market-maker/:marketMakerId/view",
        updateMarketMaker: "/agent/market-maker/:marketMakerId/update",
        addMarketMakerKyb: "/agent/market-maker/:marketMakerId/add-kyb",
        addMarketMakerKyc: "/agent/market-maker/:marketMakerId/add-kyc",

        updateMarketMakerKyb: "/agent/market-maker/:marketMakerId/update-kyb/:stakeholderId",

        creditLimit: "/agent/credit-limit",
        addCreditLimit: "/agent/credit-limit/add",
        viewCreditLimit: "/agent/credit-limit/:creditLimitId/view",
        editCreditLimit: "/agent/credit-limit/:creditLimitId/edit",

        listBalanceRequest: "/agent/balance-request",
        viewBalanceRequest: "/agent/balance-request/:balanceRequestId/view",

        listBusiness: "/agent/businesses",
        viewBusiness: "/agent/business/:businessId/view",

        listSingleTransactions: "/agent/single-transactions",
        viewSingleTransaction: "/agent/single-transactions/:singleTransactionId",
        listBatchTransactions: "/agent/batch-transactions",
        viewBatchTransaction: "/agent/batch-transactions/:batchTransactionId",

        getAllB2bBeneficiary: "/b2b/beneficiary",
        viewB2bBeneficiary: "/b2b/beneficiary/:beneficiaryId/view",

        listBusinessServiceCharge: "/agent/business-service-charge",
        addBusinessServiceCharge: "/agent/business-service-charge/add",
        updateBusinessServiceCharge: "/agent/business-service-charge/:businessServiceChargeId/update",

        listKycUser: "/agent/kyc-user",
        viewKycUser: "/agent/kyc-user/:kycUserId/view",
        addUserKyc: "/agent/agents/:agentId/users/:userId/create",
        editUserKyc: "/agent/kyc-user/:kycId/edit",

        listLedger: "/agent/ledger",
        viewLedger: "/agent/ledger/:ledgerId/view",
        addLedger: "/agent/ledger/add",

        listB2bAccount: "/agent/b2b-account",
        listAccounts: "/agent/account-lists",
    },

    userKyc: {
        addSystemUserKyc: "/user/accounts/:id/addKyc",
        editSystemUserKyc: "/user/accounts/:id/editKyc/:kycId",
    },
    users: {
        listUserSetup: "/user/setups",
        listProfileSetup: "/user/profile-setups",
        showProfileSetup: "/user/profile-setups/:userProfileSetupId",
        editProfileSetup: "/user/profile-setups/:userProfileSetupId/edit",
    },
    transaction: {
        list: "/transaction/search",
        achTransaction: "/transaction/ach-transaction",
        zaiTransaction: "/payment/zai-australia-payment",
    },
    dashboard: {
        base: "/",
    },

    Dashboard: "/",

    // region Customer
    ListCustomer: "/customer/search",
    CreateCustomer: "/customer/create",
    ViewCustomer: "/customer/details/:id",
    EditCustomer: "/customer/update/:id",
    ListCustomerBeneficiary: "/customer/all-beneficiary/:id",
    ListCustomerRemark: "/customer/remarks/:id",
    ListCustomerTransaction: "/customer/all-transactions/:id",
    ListCustomerDocument: "/customer/documents/:id",
    ListCustomerBank: "/customer/banks/:id",
    CreateCustomerBeneficiary: "/customer/beneficiary/add/:id",
    ViewCustomerBeneficiary: "/customer/beneficiary/details/:id/:bene_id",
    EditCustomerBeneficiary: "/customer/beneficiary/update/:id/:bene_id",
    ListCustomerKycLog: "/customer/:customerId/kyc-logs",

    // region B2B - Agents
    ListAgent: "/agent/agents",
    CreateAgent: "/agent/agents/create",
    ViewAgent: "/agent/agents/:agentId",
    EditAgent: "/agent/agents/:agentId/edit",
    CreateAgentKYB: "/agent/agents/:agentId/kyb/create",
    CreateAgentOrganizationStakeholder: "/agent/agents/:agentId/organization-stakeholders/create",
    EditAgentOrganizationStakeholder: "/agent/agents/:agentId/organization-stakeholders/:stakeholderId/edit",
    CreateAgentIndividualStakeholder: "/agent/agents/:agentId/individual-stakeholder/create",
    EditAgentIndividualStakeholder: "/agent/agents/:agentId/individual-stakeholder/:stakeholderId/edit",

    // region B2B - Business
    ListBusiness: "/agent/businesses",
    ViewBusiness: "/agent/businesses/:businessId",
    EditBusiness: "/agent/businesses/:businessId/edit",
    CreateBusinessKYB: "/agent/businesses/:businessId/kyb/create",
    CreateBusinessOrganizationStakeholder: "/agent/businesses/:businessId/organization-stakeholders/create",
    EditBusinessOrganizationStakeholder: "/agent/businesses/:businessId/organization-stakeholders/:stakeholderId/edit",
    CreateBusinessIndividualStakeholder: "/agent/businesses/:businessId/individual-stakeholder/create",
    EditBusinessIndividualStakeholder: "/agent/businesses/:businessId/individual-stakeholder/:stakeholderId/edit",

    // region ACH webhooks
    ListAchRdfiWebhook: "/ach-webhooks/rdfi",
    ListCirWebhooks: "/ach-webhooks/cir",
    ListReturnWebhooks: "/ach-webhooks/return",
    ListRejctWebhooks: "/ach-webhooks/reject",
    ListOdfiWebhooks: "/ach-webhooks/odfi",
    ListNocWebhooks: "/ach-webhooks/noc",

    // Help center
    ListHelpCenter: "/b2b/help-centers",

    // region B2B - Beneficiary
    ListB2bBeneficiary: "/b2b/beneficiary",
    CreateB2bBeneficiary: "/b2b/beneficiary/create",
    ViewB2bBeneficiary: "/b2b/beneficiary/:id",
    EditB2bBeneficiary: "/b2b/beneficiary/:id/edit",

    // region B2B - Account
    ListB2bAccount: "/b2b/account",

    // region B2B - Account Closure Requests
    ListB2BAccountClosureRequest: "/b2b/account-closure-requests",

    // region B2B - Business Service Charge
    ListBusinessServiceCharge: "/agent/business-service-charge",

    // region B2B - Promo Code

    ListPromoCode: "/setup/campaigns",
    CreatePromoCode: "/setup/campaigns/create",
    ViewPromoCode: "/setup/campaigns/:id",
    EditPromoCode: "/setup/campaigns/:id/edit",
    RedeemedPromoCode: "/setup/campaigns/:id/redeemed",
    // region - Referral Reports

    ListReferralReport: "/report/referral",
    ViewReferralReport: "/report/referral/:id",

    // region setup
    ListCampaignAttribute: "/setup/campaigns/attributes",

    // region - Campaign Reports

    ListCampaignReportTab: "/report/campaign",
    ListCampaignLedgerReport: "/report/campaign/ledger/:id",
    ListCampaignUsageReport: "/report/campaign/usage/:id",

    // region - Campaign Incentive Reports

    ListCampaignIncentiveReports: "/report/campaign/incentive",

    // region - Transactions
    viewTransaction: "/transactions/details/:id/:customerId",
    viewAMLTransaction: "/transactions/details/aml-suspicious/:tid/:customerId",

    // region - zaiLogs

    ListZaiLogs: "zai-logs",

    // region -email element
    ListEmailElement: "/setup/email-element",

    // Application Config
    ListApplicationConfig: "/setup/application-config",
};

export default routePaths;
