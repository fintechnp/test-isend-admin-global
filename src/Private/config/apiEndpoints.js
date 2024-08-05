const apiEndpoints = {
    forgotPassword: "/account/forgotpassword",
    dashboard: {
        getCustomerCountByDeviceType: "/dashboard/customer",
        getCustomerKycCountByStatus: "/dashboard/customer-kyc",
        getTransactionCountByStatus: "/dashboard/transaction-status",
    },
    countryStates: {
        list: "common/:country/states",
        create: "common/states",
        update: "common/states/:stateId",
        delete: "common/states/:stateId",
    },
    documentAcceptance: {
        list: "/documentacceptancelist",
        create: "/documentacceptance",
        update: "/documentacceptance/:id",
    },

    emailTemplate: {
        list: "/email/template",
        create: "/email/template",
        update: "/email/template/update/:template_id",
        tagList: "/email/template/tags",
    },

    countries: {
        list: "/countries",
        create: "/country",
        update: "/country/:countryId",
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
        zaiRefundLogs: "/zai/refund-log",
    },

    // region: Common
    GetCountryValidationRules: "/common/:countryIso3/countryvalidationrules",

    // region: B2B - Business
    UpdateBusiness: "/business/:businessId",
    ChangeBusinessStatus: "/business/:businessId/status",
    ToggleBusinessActiveStatus: "/business/:businessId/toggleactivestatus",

    // region: B2B - Stakeholders
    GetOrganizationStakeholders: "/kyb",
    GetIndividualStakeholders: "/kyc",
    AddOrganizationStakeholder: "/kyb",
    UpdateOrganizationStakeholder: "/kyb/:kybId",
    ChangeOrganizationStakeholderStatus: "/kyb/:kybId/status",
    AddIndividualStakeholder: "/kyc",
    UpdateIndividualStakeholder: "/kyc/:kycId",
    ChangeIndividualStakeholderStatus: "/kyc/:kycId/status",
    GetOrganizationStakeholderById: "/kyb/:kybId",
    GetIndividualStakeholderById: "/kyc/:kycId",

    // region B2B - Users
    GetB2BUsers: "/users",
    GetB2BUserKycById: "/kyc/:kycId",
    ChangeB2BUserStatus: "/kyc/:kycId/status",

    // region ACH Webhooks
    GetAchRdfiWebhooks: "/RDFITransactions",
    GetAchCirWebhooks: "/CIRTransactions",
    GetReturnWebhooks: "/ReturnTransactions",
    GetRejectWebhooks: "/RejectTransactions",

    // Help Center
    GetHelpCenters: "/contactdetails",
    CreateHelpCenter: "/contactDetail",
    UpdateHelpCenter: "/contactdetail/:id",

    // region B2B Account Closure Request
    ListAccountClosureRequest: "/b2b/account-delete-request",
    AcceptRejectAccountClosureRequest: "/b2b/account-delete-request/:id",

    // region B2B Business
    GetBusinesses: "/business",
    GetBusinessById: "/business/:businessId",
    ApproveBusiness: "/business/:businessId/approve",
    ToggleBusinessStatus: "/business/:businessId/toggleactivestatus",

    // Kyc Logs
    GetCustomerKycLogs: "/kyc/logs",

    // Get Transactions
    GetTransactions: "/transaction",

    // Referral Reports

    GetReferralReports: "/referral-code-report",
    GetReferralReportById: "/referral-code-detail/:id",
};

export default apiEndpoints;
