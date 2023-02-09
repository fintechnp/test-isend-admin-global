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
    },
};

export default apiEndpoints;
