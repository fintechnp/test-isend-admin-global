const attributeFamilyActions = {
    GET_ATTRIBUTE_FAMILY_LIST: "GET_ATTRIBUTE_FAMILY_LIST",
    GET_ATTRIBUTE_FAMILY_LIST_SUCCESS: "GET_ATTRIBUTE_FAMILY_LIST_SUCCESS",
    GET_ATTRIBUTE_FAMILY_LIST_FAILURE: "GET_ATTRIBUTE_FAMILY_LIST_FAILURE",

    DELETE_ATTRIBUTE_FAMILY: "DELETE_ATTRIBUTE_FAMILY",
    DELETE_ATTRIBUTE_FAMILY_SUCCESS: "DELETE_ATTRIBUTE_FAMILY_SUCCESS",
    DELETE_ATTRIBUTE_FAMILY_FAILURE: "DELETE_ATTRIBUTE_FAMILY_FAILURE",
    DELETE_ATTRIBUTE_FAMILY_RESET: "DELETE_ATTRIBUTE_FAMILY_RESET",

    ADD_ATTRIBUTE_FAMILY: "ADD_ATTRIBUTE_FAMILY",
    ADD_ATTRIBUTE_FAMILY_SUCCESS: "ADD_ATTRIBUTE_FAMILY_SUCCESS",
    ADD_ATTRIBUTE_FAMILY_FAILURE: "ADD_ATTRIBUTE_FAMILY_FAILURE",
    ADD_ATTRIBUTE_FAMILY_RESET: "ADD_ATTRIBUTE_FAMILY_RESET",

    UPDATE_ATTRIBUTE_FAMILY: "UPDATE_ATTRIBUTE_FAMILY",
    UPDATE_ATTRIBUTE_FAMILY_SUCCESS: "UPDATE_ATTRIBUTE_FAMILY_SUCCESS",
    UPDATE_ATTRIBUTE_FAMILY_FAILURE: "UPDATE_ATTRIBUTE_FAMILY_FAILURE",
    UPDATE_ATTRIBUTE_FAMILY_RESET: "UPDATE_ATTRIBUTE_FAMILY_RESET",

    OPEN_ADD_ATTRIBUTE_FAMILY_MODAL: "OPEN_ADD_ATTRIBUTE_FAMILY_MODAL",
    CLOSE_ADD_ATTRIBUTE_FAMILY_MODAL: "CLOSE_ADD_ATTRIBUTE_FAMILY_MODAL",

    OPEN_UPDATE_ATTRIBUTE_FAMILY_MODAL: "OPEN_UPDATE_ATTRIBUTE_FAMILY_MODAL",
    CLOSE_UPDATE_ATTRIBUTE_FAMILY_MODAL: "CLOSE_UPDATE_ATTRIBUTE_FAMILY_MODAL",

    get_attribute_family_list: () => ({
        type: attributeFamilyActions.GET_ATTRIBUTE_FAMILY_LIST,
    }),

    delete_attribute_family: (id) => ({
        type: attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY,
        id,
    }),

    add_attribute_family: (data) => ({
        type: attributeFamilyActions.ADD_ATTRIBUTE_FAMILY,
        data,
    }),

    update_attribute_family: (data) => ({
        type: attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY,
        data,
    }),

    add_attribute_family_reset: () => ({
        type: attributeFamilyActions.ADD_ATTRIBUTE_FAMILY_RESET,
    }),

    update_attribute_family_reset: () => ({
        type: attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY_RESET,
    }),

    delete_attribute_family_reset: () => ({
        type: attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY_RESET,
    }),

    open_add_modal: () => ({
        type: attributeFamilyActions.OPEN_ADD_ATTRIBUTE_FAMILY_MODAL,
    }),

    close_add_modal: () => ({
        type: attributeFamilyActions.CLOSE_ADD_ATTRIBUTE_FAMILY_MODAL,
    }),

    open_update_modal: (data) => ({
        type: attributeFamilyActions.OPEN_UPDATE_ATTRIBUTE_FAMILY_MODAL,
        data,
    }),

    close_update_modal: () => ({
        type: attributeFamilyActions.CLOSE_UPDATE_ATTRIBUTE_FAMILY_MODAL,
    }),
};

export default attributeFamilyActions;
