const actions = {
    GET_ORGANIZATION_STAKEHOLDERS: "GET_ORGANIZATION_STAKEHOLDERS",
    GET_ORGANIZATION_STAKEHOLDERS_SUCCESS: "GET_ORGANIZATION_STAKEHOLDERS_SUCCESS",
    GET_ORGANIZATION_STAKEHOLDERS_FAILED: "GET_ORGANIZATION_STAKEHOLDERS_FAILED",

    GET_INDIVIDUAL_STAKEHOLDERS: "GET_INDIVIDUAL_STAKEHOLDERS",
    GET_INDIVIDUAL_STAKEHOLDERS_SUCCESS: "GET_INDIVIDUAL_STAKEHOLDERS_SUCCESS",
    GET_INDIVIDUAL_STAKEHOLDERS_FAILED: "GET_INDIVIDUAL_STAKEHOLDERS_FAILED",

    ADD_ORGANIZATION_STAKEHOLDER: "ADD_ORGANIZATION_STAKEHOLDER",
    ADD_ORGANIZATION_STAKEHOLDER_SUCCESS: "ADD_ORGANIZATION_STAKEHOLDER_SUCCESS",
    ADD_ORGANIZATION_STAKEHOLDER_FAILED: "ADD_ORGANIZATION_STAKEHOLDER_FAILED",
    ADD_ORGANIZATION_STAKEHOLDER_RESET: "ADD_ORGANIZATION_STAKEHOLDER_RESET",

    ADD_INDIVIDUAL_STAKEHOLDER: "ADD_INDIVIDUAL_STAKEHOLDER",
    ADD_INDIVIDUAL_STAKEHOLDER_SUCCESS: "ADD_INDIVIDUAL_STAKEHOLDER_SUCCESS",
    ADD_INDIVIDUAL_STAKEHOLDER_FAILED: "ADD_INDIVIDUAL_STAKEHOLDER_FAILED",
    ADD_INDIVIDUAL_STAKEHOLDER_RESET: "ADD_INDIVIDUAL_STAKEHOLDER_RESET",

    UPDATE_ORGANIZATION_STAKEHOLDER: "UPDATE_ORGANIZATION_STAKEHOLDER",
    UPDATE_ORGANIZATION_STAKEHOLDER_SUCCESS: "UPDATE_ORGANIZATION_STAKEHOLDER_SUCCESS",
    UPDATE_ORGANIZATION_STAKEHOLDER_FAILED: "UPDATE_ORGANIZATION_STAKEHOLDER_FAILED",
    UPDATE_ORGANIZATION_STAKEHOLDER_RESET: "UPDATE_ORGANIZATION_STAKEHOLDER_RESET",

    UPDATE_INDIVIDUAL_STAKEHOLDER: "UPDATE_INDIVIDUAL_STAKEHOLDER",
    UPDATE_INDIVIDUAL_STAKEHOLDER_SUCCESS: "UPDATE_INDIVIDUAL_STAKEHOLDER_SUCCESS",
    UPDATE_INDIVIDUAL_STAKEHOLDER_FAILED: "UPDATE_INDIVIDUAL_STAKEHOLDER_FAILED",
    UPDATE_INDIVIDUAL_STAKEHOLDER_RESET: "UPDATE_INDIVIDUAL_STAKEHOLDER_RESET",

    GET_ORGANIZATION_STAKEHOLDER_BY_ID: "GET_ORGANIZATION_STAKEHOLDER_BY_ID",
    GET_ORGANIZATION_STAKEHOLDER_BY_ID_SUCCESS: "GET_ORGANIZATION_STAKEHOLDER_BY_ID_SUCCESS",
    GET_ORGANIZATION_STAKEHOLDER_BY_ID_FAILED: "GET_ORGANIZATION_STAKEHOLDER_BY_ID_FAILED",

    GET_INDIVIDUAL_STAKEHOLDER_BY_ID: "GET_INDIVIDUAL_STAKEHOLDER_BY_ID",
    GET_INDIVIDUAL_STAKEHOLDER_BY_ID_SUCCESS: "GET_INDIVIDUAL_STAKEHOLDER_BY_ID_SUCCESS",
    GET_INDIVIDUAL_STAKEHOLDER_BY_ID_FAILED: "GET_INDIVIDUAL_STAKEHOLDER_BY_ID_FAILED",

    CHANGE_ORGANIZATION_STAKEHOLDER_STATUS: "CHANGE_ORGANIZATION_STAKEHOLDER_STATUS",
    CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_SUCCESS: "CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_SUCCESS",
    CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_FAILED: "CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_FAILED",
    CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_RESET: "CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_RESET",

    CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS: "CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS",
    CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_SUCCESS: "CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_SUCCESS",
    CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_FAILED: "CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_FAILED",
    CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_RESET: "CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_RESET",

    get_organization_stakeholders: (query) => ({
        type: actions.GET_ORGANIZATION_STAKEHOLDERS,
        query,
    }),

    get_individual_stakeholders: (query) => ({
        type: actions.GET_INDIVIDUAL_STAKEHOLDERS,
        query,
    }),

    add_organization_stakeholder: (data) => ({
        type: actions.ADD_ORGANIZATION_STAKEHOLDER,
        data,
    }),

    add_organization_stakeholder_reset: () => ({
        type: actions.ADD_ORGANIZATION_STAKEHOLDER_RESET,
    }),

    add_individual_stakeholder: (data) => ({
        type: actions.ADD_INDIVIDUAL_STAKEHOLDER,
        data,
    }),

    add_individual_stakeholder_reset: () => ({
        type: actions.ADD_INDIVIDUAL_STAKEHOLDER_RESET,
    }),

    update_organization_stakeholder: (id, data) => ({
        type: actions.UPDATE_ORGANIZATION_STAKEHOLDER,
        id,
        data,
    }),

    update_organization_stakeholder_reset: () => ({
        type: actions.UPDATE_ORGANIZATION_STAKEHOLDER_RESET,
    }),

    update_individual_stakeholder: (id, data) => ({
        type: actions.UPDATE_INDIVIDUAL_STAKEHOLDER,
        id,
        data,
    }),

    update_individual_stakeholder_reset: () => ({
        type: actions.UPDATE_INDIVIDUAL_STAKEHOLDER_RESET,
    }),

    get_organization_stakeholder_by_id: (id) => ({
        type: actions.GET_ORGANIZATION_STAKEHOLDER_BY_ID,
        id,
    }),

    get_individual_stakeholder_by_id: (id) => ({
        type: actions.GET_INDIVIDUAL_STAKEHOLDER_BY_ID,
        id,
    }),

    change_organization_stakeholder_status: (id, data) => ({
        type: actions.CHANGE_ORGANIZATION_STAKEHOLDER_STATUS,
        id,
        data,
    }),

    change_organization_stakeholder_status_reset: () => ({
        type: actions.CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_RESET,
    }),

    change_individual_stakeholder_status: (id, data) => ({
        type: actions.CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS,
        id,
        data,
    }),

    change_individual_stakeholder_status_reset: () => ({
        type: actions.CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_RESET,
    }),
};

export default actions;
