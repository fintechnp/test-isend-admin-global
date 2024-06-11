import { id } from "date-fns/locale";

const actions = {
    GET_LEDGER: "GET_LEDGER",
    GET_LEDGER_SUCCESS: "GET_LEDGER_SUCCESS",
    GET_LEDGER_FAILED: "GET_LEDGER_FAILED",

    GET_LEDGER_DETAILS: "GET_LEDGER_DETAILS",
    GET_LEDGER_DETAILS_SUCCESS: "GET_LEDGER_DETAILS_SUCCESS",
    GET_LEDGER_DETAILS_FAILED: "GET_LEDGER_DETAILS_FAILED",

    ADD_LEDGER: "ADD_LEDGER",
    ADD_LEDGER_SUCCESS: "ADD_LEDGER_SUCCESS",
    ADD_LEDGER_FAILED: "ADD_LEDGER_FAILED",
    ADD_LEDGER_RESET: "ADD_LEDGER_RESET",

    get_all_ledger: (query) => ({
        type: actions.GET_LEDGER,
        query,
    }),

    get_ledger_details: (id) => ({
        type: actions.GET_LEDGER_DETAILS,
        id,
    }),

    add_ledger: (data) => ({
        type: actions.ADD_LEDGER,
        data,
    }),
};

export default actions;
