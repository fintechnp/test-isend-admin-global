const apiEndpoints = {
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
    },
    creditLimit: {
        getAll: "/creditlimits",
        getById: "/creditlimits/:creditLimitId",
        add: "/creditlimits",
        update: "/creditlimits/:creditLimitId/statusupdate",
    },
};

export default apiEndpoints;
