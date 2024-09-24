export const campaignEventTypes = {
    BIRTH_DATE: 1,
    DATE_RANGE: 2,
    AMOUNT: 3,
    COUNT: 4,
    BENEFICIARY_COUNTRY: 5,
    BENEFICIARY_RELATION: 6,
};

export const campaignEventTypesOptions = [
    { label: "Select Campaign Attribute", value: "" },
    { label: "BIRTH_DATE", value: campaignEventTypes.BIRTH_DATE },
    { label: "Date Range", value: campaignEventTypes.DATE_RANGE },
    { label: "Amount", value: campaignEventTypes.AMOUNT },
    { label: "Count", value: campaignEventTypes.COUNT },
    { label: "Beneficiary Country", value: campaignEventTypes.BENEFICIARY_COUNTRY },
    { label: "Beneficiary Relation", value: campaignEventTypes.BENEFICIARY_RELATION },
];
