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
};

export default routePaths;
