const routePaths = {
    banners: {
        index: "/setup/banners",
    },
    countryStates: {
        index: "/setup/country-states",
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
    },
    customer: {
        banks: "/customer/banks/:customerId",
        allBank: "/customer/banks",
    },
    agent: {
        listMarketMaker: "/agent/market-maker",
        addMarketMaker: "/agent/market-maker/add",
        viewMarketMaker: "/agent/market-maker/:marketMakerId/view",
        updateMarketMaker: "/agent/market-maker/:marketMakerId/update",
        addMarketMakerKyb: "/agent/market-maker/:marketMakerId/add-kyb",
        addMarketMakerKyc: "/agent/market-maker/:marketMakerId/add-kyc",

        updateMarketMakerKyb: "/agent/market-maker/:marketMakerId/update-kyb/:kybId",

        creditLimit: "/agent/credit-limit",
        addCreditLimit: "/agent/credit-limit/add",
        viewCreditLimit: "/agent/credit-limit/:creditLimitId/view",
        editCreditLimit: "/agent/credit-limit/:creditLimitId/edit",

        listBalanceRequest: "/agent/balance-request",
        viewBalanceRequest: "/agent/balance-request/:balanceRequestId/view",

        listBusiness: "/agent/business",
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
        addUserKyc: "/agent/kyc-user/:userId/add",
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
};

export default routePaths;
