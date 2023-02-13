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
    customers: {
        updateAccount: "customer/account/:customerId",
    },
    bulkEmailGroup: {
        create: "bulkemail/group",
        list: "bulkemail/group",
        get: "bulkemail/group/:bulkEmailGroupId",
    },
    bulkEmailAddresses: {
        list: "bulkemail",
        create: "bulkemail",
        update: "bulkemail/:bulkEmailAddressId",
        updateStatus: "bulkemail/:bulkEmailAddressId",
        get: "bulkemail/:bulkEmailAddressId",
        import: "bulkemail/import_file/:bulkEmailGroupId",
        importConfirm: "bulkemail/import_confirm/:bulkEmailGroupId",
    },
    bulkEmailContent: {
        list: "bulkemail/content",
        create: "bulkemail/content",
        update: "bulkemail/content/:bulkEmailContentId",
        updateStatus: "bulkemail/content/:bulkEmailContentId",
        get: "bulkemail/content/:bulkEmailContentId",
        send: "bulkemail/content/:bulkEmailContentId",
    },
};

export default apiEndpoints;
