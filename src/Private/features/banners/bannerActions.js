const bannerActions = {
    GET_BANNERS: "GET_BANNERS",
    GET_BANNERS_SUCCESS: "GET_BANNERS_SUCCESS",
    GET_BANNERS_FAILED: "GET_BANNERS_FAILED",

    GET_BANNER: "GET_BANNER",
    GET_BANNER_SUCCESS: "GET_BANNER_SUCCESS",
    GET_BANNER_FAILED: "GET_BANNER_FAILED",

    ADD_BANNER: "ADD_BANNER",
    ADD_BANNER_SUCCESS: "ADD_BANNER_SUCCESS",
    ADD_BANNER_FAILED: "ADD_BANNER_FAILED",
    ADD_BANNER_RESET: "ADD_BANNER_RESET",
    OPEN_ADD_BANNER_MODAL: "OPEN_ADD_BANNER_MODAL",
    CLOSE_ADD_BANNER_MODAL: "CLOSE_ADD_BANNER_MODAL",

    UPDATE_BANNER: "UPDATE_BANNER",
    UPDATE_BANNER_SUCCESS: "UPDATE_BANNER_SUCCESS",
    UPDATE_BANNER_FAILED: "UPDATE_BANNER_FAILED",
    UPDATE_BANNER_RESET: "UPDATE_BANNER_RESET",

    UPDATE_BANNER_STATUS: "UPDATE_BANNER_STATUS",
    UPDATE_BANNER_STATUS_SUCCESS: "UPDATE_BANNER_STATUS_SUCCESS",
    UPDATE_BANNER_STATUS_FAILED: "UPDATE_BANNER_STATUS_FAILED",
    UPDATE_BANNER_STATUS_RESET: "UPDATE_BANNER_STATUS_RESET",
    OPEN_UPDATE_BANNER_MODAL: "OPEN_UPDATE_BANNER_MODAL",
    CLOSE_UPDATE_BANNER_MODAL: "CLOSE_UPDATE_BANNER_MODAL",

    DELETE_BANNER: "DELETE_BANNER",
    DELETE_BANNER_SUCCESS: "DELETE_BANNER_SUCCESS",
    DELETE_BANNER_FAILED: "DELETE_BANNER_FAILED",
    DELETE_BANNER_RESET: "DELETE_BANNER_RESET",

    get_banners: (query) => ({
        type: bannerActions.GET_BANNERS,
        query,
    }),

    get_banner: (id) => ({
        type: bannerActions.GET_BANNER,
        id,
    }),

    add_banner: (data) => ({
        type: bannerActions.ADD_BANNER,
        data,
    }),

    update_banner: (id, data) => ({
        type: bannerActions.UPDATE_BANNER,
        data,
        id,
    }),

    update_banner_status: (id, data) => ({
        type: bannerActions.UPDATE_BANNER_STATUS,
        data,
        id,
    }),

    delete_banner: (id) => ({
        type: bannerActions.DELETE_BANNER,
        id,
    }),
};

export default bannerActions;
