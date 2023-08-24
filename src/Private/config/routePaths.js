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
        marketMaker: "/agent/market-maker",
        addMarketMaker: "/agent/market-maker/add",
        viewMarketMaker: "/agent/market-maker/:marketMakerId/view",
        updateMarketMaker: "/agent/market-maker/:marketMakerId/update",

        creditLimit: "/agent/credit-limit",
        addCreditLimit: "/agent/credit-limit/add",
        viewCreditLimit: "/agent/credit-limit/:creditLimitId/view",
    },
};

export default routePaths;
