const actions = {
    GET_BENEFICIARY: "GET_BENEFICIARY",
    GET_BENEFICIARY_SUCCESS: "GET_BENEFICIARY_SUCCESS",
    GET_BENEFICIARY_FAILED: "GET_BENEFICIARY_FAILED",

    GET_BENEFICIARY_DETAILS: "GET_BENEFICIARY_DETAILS",
    GET_BENEFICIARY_DETAILS_SUCCESS: "GET_BENEFICIARY_DETAILS_SUCCESS",
    GET_BENEFICIARY_DETAILS_FAILED: "GET_BENEFICIARY_DETAILS_FAILED",

    get_all_beneficiary: (query) => ({
        type: actions.GET_BENEFICIARY,
        query,
    }),

    get_beneficiary_details: (id) => ({
        type: actions.GET_BENEFICIARY_DETAILS,
        id,
    }),
};

export default actions;
