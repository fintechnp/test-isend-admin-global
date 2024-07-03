const actions = {
    GET_SMS: "GET_SMS",
    GET_SMS_SUCCESS: "GET_SMS_SUCCESS",
    GET_SMS_FAILED: "GET_SMS_FAILED",

    GET_SMS_BYID: "GET_SMS_BYID",
    GET_SMS_BYID_SUCCESS: "GET_SMS_BYID_SUCCESS",
    GET_SMS_BYID_FAILED: "GET_SMS_BYID_FAILED",

    OPEN_VIEW_SMS_MODAL: "OPEN_VIEW_SMS_MODAL",
    CLOSE_VIEW_SMS_MODAL: "CLOSE_VIEW_SMS_MODAL",

    CREATE_SMS: "CREATE_SMS",
    CREATE_SMS_SUCCESS: "CREATE_SMS_SUCCESS",
    CREATE_SMS_FAILED: "CREATE_SMS_FAILED",
    CREATE_SMS_RESET: "CREATE_SMS_RESET",

    DELETE_SMS: "DELETE_SMS",
    DELETE_SMS_SUCCESS: "DELETE_SMS_SUCCESS",
    DELETE_SMS_FAILED: "DELETE_SMS_FAILED",
    DELETE_SMS_RESET: "DELETE_SMS_RESET",

    GET_EMAIL: "GET_EMAIL",
    GET_EMAIL_SUCCESS: "GET_EMAIL_SUCCESS",
    GET_EMAIL_FAILED: "GET_EMAIL_FAILED",

    GET_EMAIL_BYID: "GET_EMAIL_BYID",
    GET_EMAIL_BYID_SUCCESS: "GET_EMAIL_BYID_SUCCESS",
    GET_EMAIL_BYID_FAILED: "GET_EMAIL_BYID_FAILED",

    CREATE_EMAIL: "CREATE_EMAIL",
    CREATE_EMAIL_SUCCESS: "CREATE_EMAIL_SUCCESS",
    CREATE_EMAIL_FAILED: "CREATE_EMAIL_FAILED",
    CREATE_EMAIL_RESET: "CREATE_EMAIL_RESET",

    DELETE_EMAIL: "DELETE_EMAIL",
    DELETE_EMAIL_SUCCESS: "DELETE_EMAIL_SUCCESS",
    DELETE_EMAIL_FAILED: "DELETE_EMAIL_FAILED",
    DELETE_EMAIL_RESET: "DELETE_EMAIL_RESET",

    GET_FCM: "GET_FCM",
    GET_FCM_SUCCESS: "GET_FCM_SUCCESS",
    GET_FCM_FAILED: "GET_FCM_FAILED",

    GET_FCM_BYID: "GET_FCM_BYID",
    GET_FCM_BYID_SUCCESS: "GET_FCM_BYID_SUCCESS",
    GET_FCM_BYID_FAILED: "GET_FCM_BYID_FAILED",

    GET_FCM_BY_CUSTOMER_ID: "GET_FCM_BY_CUSTOMER_ID",
    GET_FCM_BY_CUSTOMER_ID_SUCCESS: "GET_FCM_BY_CUSTOMER_ID_SUCCESS",
    GET_FCM_BY_CUSTOMER_ID_FAILED: "GET_FCM_BY_CUSTOMER_ID_FAILED",

    CREATE_FCM: "CREATE_FCM",
    CREATE_FCM_SUCCESS: "CREATE_FCM_SUCCESS",
    CREATE_FCM_FAILED: "CREATE_FCM_FAILED",
    CREATE_FCM_RESET: "CREATE_FCM_RESET",

    UPDATE_FCM: "UPDATE_FCM",
    UPDATE_FCM_SUCCESS: "UPDATE_FCM_SUCCESS",
    UPDATE_FCM_FAILED: "UPDATE_FCM_FAILED",
    UPDATE_FCM_RESET: "UPDATE_FCM_RESET",

    DELETE_FCM: "DELETE_FCM",
    DELETE_FCM_SUCCESS: "DELETE_FCM_SUCCESS",
    DELETE_FCM_FAILED: "DELETE_FCM_FAILED",
    DELETE_FCM_RESET: "DELETE_FCM_RESET",

    RESEND_NOTIFICATION: "RESEND_NOTIFICATION",
    RESEND_NOTIFICATION_SUCCESS: "RESEND_NOTIFICATION_SUCCESS",
    RESEND_NOTIFICATION_FAILED: "RESEND_NOTIFICATION_FAILED",
    RESEND_NOTIFICATION_RESET: "RESEND_NOTIFICATION_RESET",

    //sms
    get_sms: (query) => ({
        type: actions.GET_SMS,
        query,
    }),

    get_sms_by_id: (id) => ({
        type: actions.GET_SMS_BYID,
        id,
    }),

    create_sms: (data) => ({
        type: actions.CREATE_SMS,
        data,
    }),

    delete_sms: (id) => ({
        type: actions.DELETE_SMS,
        id,
    }),

    //email
    get_email: (query) => ({
        type: actions.GET_EMAIL,
        query,
    }),

    get_email_byid: (id) => ({
        type: actions.GET_EMAIL_BYID,
        id,
    }),

    create_email: (data) => ({
        type: actions.CREATE_EMAIL,
        data,
    }),

    delete_email: (id) => ({
        type: actions.DELETE_EMAIL,
        id,
    }),

    //fcm
    get_fcm: (query) => ({
        type: actions.GET_FCM,
        query,
    }),

    get_fcm_byid: (id) => ({
        type: actions.GET_FCM_BYID,
        id,
    }),

    get_fcm_by_customer_id: (id) => ({
        type: actions.GET_FCM_BY_CUSTOMER_ID,
        id,
    }),

    create_fcm: (data) => ({
        type: actions.CREATE_FCM,
        data,
    }),

    update_fcm: (id, data) => ({
        type: actions.UPDATE_FCM,
        data,
        id,
    }),

    delete_fcm: (id) => ({
        type: actions.DELETE_FCM,
        id,
    }),
    resend_notification: (data) => ({
        type: actions.RESEND_NOTIFICATION,
        data,
    }),

    open_view_sms_modal: (payload) => ({
        type: actions.OPEN_VIEW_SMS_MODAL,
        payload,
    }),

    close_view_sms_modal: () => ({
        type: actions.CLOSE_VIEW_SMS_MODAL,
    }),
};

export default actions;
