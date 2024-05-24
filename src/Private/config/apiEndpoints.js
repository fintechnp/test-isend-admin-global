
const apiEndpoints = {
    forgotPassword: '/account/forgotpassword',
    countryStates: {
        list: "common/:country/states",
        create: "common/states",
        update: "common/states/:stateId",
        delete: "common/states/:stateId",
    },
    fundingSources: {
        list: "fundingsource/getall",
        create: "fundingsource",
        update: "fundingsource/:fundingSourceId",
        updateStatus: "fundingsource/:fundingSourceId",
        delete: "fundingsource/:fundingSourceId",
    },
    reports: {
        userIpWhitelist: "report/user_ip_whitelist",
        icnResponse: "report/icn_response",
        achEntries: "report/ach_entries",
        incompleteRegistration: "/report/incomplete_registration",
        onfidoReports: "/onfido/checkkyc",
    },
    customers: {
        updateAccount: "customer/account/:customerId",
        deleteList: "customer/deleterequest",
        deleteRequestDetails: "customer/deleterequest/:deleteRequestId",
        approveDeleteRequest: "customer/delete/:deleteRequestId/action",
    },
    bulkEmailGroup: {
        create: "bulkemail/group",
        update: "bulkemail/group/:bulkEmailGroupId",
        delete: "bulkemail/group/:bulkEmailGroupId",
        list: "bulkemail/group",
        get: "bulkemail/group/:bulkEmailGroupId",
    },
    bulkEmailAddresses: {
        list: "bulkemail",
        create: "bulkemail",
        update: "bulkemail/:bulkEmailAddressId",
        updateStatus: "bulkemail/:bulkEmailAddressId",
        get: "bulkemail/:bulkEmailAddressId",
        delete: "bulkemail/:bulkEmailAddressId",
        import: "bulkemail/import_file/:bulkEmailGroupId",
        importConfirm: "bulkemail/import_confirm/:bulkEmailGroupId",
    },
    bulkEmailContents: {
        list: "bulkemail/content",
        create: "bulkemail/content",
        update: "bulkemail/content/:bulkEmailContentId",
        updateStatus: "bulkemail/content/:bulkEmailContentId",
        delete: "bulkemail/content/:bulkEmailContentId",
        get: "bulkemail/content/:bulkEmailContentId",
        send: "bulkemail/sendemail/:bulkEmailContentId",
    },
    bulkEmailCredentials: {
        get: "bulkemail/credential",
        update: "bulkemail/credential/:bulkEmailCredentialId",
    },
    language: {
        get: "language",
        getDetail: "language/:languageId",
        post: "language",
        update: "language/:languageId",
        delete: "language/:languageId",
    },
    languageCountry: {
        get: "languagecountry",
        getDetail: "languagecountry/:languagecountryId",
        post: "languagecountry",
        update: "languagecountry/:languagecountryId",
        delete: "languagecountry/:languagecountryId",
    },
    languageValue: {
        get: "localization",
        post: "localization",
        update: "localization/:localizationId",
        delete: "localization/:localizationId",
    },
    localizationTranslation: {
        add: "languagetranslated",
        update: "languagetranslated/:languageTranslatedId",
        delete: "languagetranslated/:languageTranslatedId",
    },
    streetType: {
        get: "common/street_type/:country",
        post: "common/street_type",
        update: "common/street_type/:streetTypeId",
        delete: "common/street_type/:streetTypeId",
    },
    settings: {
        changePassword: "/account/changePassword",
    },
    marketMaker: {
        getAll: "/marketmaker",
        getById: "/marketmaker/:marketMakerId",
        add: "/marketmaker",
        update: "/marketmaker/:marketMakerId",
        updateStatus: "/marketmaker/:marketMakerId/toggleactivestatus",

        //KYB
        addKyb: "/kyb",
        updateKyb: "/kyb/:kybId",

        //KYC

        addKyc: "/kyc",
        updateKyc: "/kyc/:kycId",

        //USERS

        getUsers: "/marketmaker/:marketMakerId/users",
    },
    creditLimit: {
        getAll: "/creditlimits",
        getById: "/creditlimits/:creditLimitId",
        add: "/creditlimits",
        update: "/creditlimits/:creditLimitId/statusupdate",
        updateData: "/creditlimits/:creditLimitId/UpdateCreditLimit",
        delete: "/creditlimits/:creditLimitId",
    },
    balanceRequest: {
        getAll: "/balancerequests",
        getById: "/balancerequest/:balanceRequestId",
        updateStatus: "/balancerequest/:balanceRequestId/statusupdate",
    },
    business: {
        getAll: "/business",
        getById: "/business/:businessId",
        addBusinessApproval: "/business/:businessId/approve",
        updateBusinessStatus: "/business/:businessId/toggleactivestatus",

        //KYB
        getAllKyb: "/kyb",
        getKybDetails: "/kyb/:kybId",
        approveKyb: "kyb/:kybId/approve",

        //KYC
        getAllKyc: "/kyc",
        getKycDetails: "/kyc/:kycId",
        approveKyc: "kyc/:kycId/approve",
    },
    b2bTransaction: {
        getSingleTransactions: "/b2b/transaction",
        getSingleTransactionById: "/b2b/transaction/:transactionId",
        getBatchTransactions: "/b2b/batchtransaction",
        getBatchTransactionById: "/b2b/batchtransaction/:batchTransactionId",

        downloadPdf: "/b2b/transaction/downloadtransactionpdf",
        sendMail: "/b2b/transaction/mailtransactionreciptpdf",
    },

    document: {
        documentSetting: "/documentsetting",
        addDocument: "/document/b2b",
    },

    b2bBeneficiary: {
        getAll: "/beneficiary/b2b",
        getById: "/beneficiary/b2b/:beneficiaryId",
    },

    businessCharge: {
        getAll: "/v1/business-servicecharges",
        getById: "/v1/business-servicecharges/:businessServiceChargeId",
        add: "/v1/business-servicecharges",
        update: "/v1/business-servicecharges/:businessServiceChargeId",
        updateStatus: "/v1/business-servicecharges/:businessServiceChargeId",
    },

    kycUser: {
        getAll: "/kyc/user",
        getById: "/kyc/user/:kycUserId",
        updateStatus: "/kyc/user/:kycUserId/approve",
    },

    ledger: {
        getAll: "/ledger",
        getById: "/ledger/:ledgerId",
        add: "/ledger",
    },

    account: {
        getAll: "/b2b/account",
    },

    ledger: {
        getAll: "/ledger",
        getById: "/ledger/:ledgerId",
        add: "/ledger",
    },

    account: {
        getAll: "/b2b/account",
    },

    accountList: {
        getAll: "/b2b/accountlist",
        getBalance: "/b2b/AccountBalance/:id",
    },

    user: {
        addKyc: "/kyc",
        editKyc: "/kyc/:kycId",
    },
    notification: {
        resend: "/notification/resend",
    },
    transaction:{
        achTransaction:"/AchTransactions",
        updateAchTransactionStatus:"/AchTransactions/:id"
    },
    userProfileSetups: {
        list: "/Roles/GetRoles",
        get: "/Roles/GetPermissionByRoleId",
        create: "/Roles/AddRole",
        update: "/Roles/ManageRole",
    },
    auth: {
        getLoggedInUserMenusAndPermissions: "/Roles/GetUserRole",
    },
    transaction: {
        achTransaction: "/AchTransactions",
        updateAchTransactionStatus: "/AchTransactions/:id",
        zaiGetTransactions: "/zai/transactions",
        zaiCheckBalance: "/zai/:customerId/check-balance",
        zaiMakePayment: "/zai/make-payment",
        zaiLogs: "/zai/webhook-log",
        zaiRefundPayment: "/zai/refund-payment",
    },
};

export default apiEndpoints;
