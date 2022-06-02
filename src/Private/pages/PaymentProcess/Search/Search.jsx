import React, { useEffect, useState } from "react";
import { reset } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";

import Loading from "./../../../../App/components/Loading";
import actions from "./../store/actions";
import MessageBox from "./components/MessageBox";
import SearchForm from "./Form/SearchForm";
import RefundForm from "./Form/RefundForm";
import Details from "./components/Details";
import BlockForm from "./Form/BlockForm";

function Search() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState(null);
    const [button, setButton] = useState(null);
    const [filterSchema, setFilterSchema] = useState({
        transaction_id: 0,
        pin_number: "",
    });
    const { response, loading, success } = useSelector(
        (state) => state.get_transaction_refund_block
    );

    const { success: b_sucess, loading: b_loading } = useSelector(
        (state) => state.block_transactions
    );

    const { success: r_sucess, loading: r_loading } = useSelector(
        (state) => state.refund_transactions
    );

    useEffect(() => {
        if (b_sucess || r_sucess) {
            dispatch(reset("search_form_transaction"));
            dispatch(reset("block_form_transaction"));
            dispatch(reset("refund_form_transaction"));
            dispatch({ type: "BLOCK_TRANSACTIONS_RESET" });
            dispatch({ type: "REFUND_TRANSACTIONS_RESET" });
            dispatch({ type: "GET_TRANSACTION_REFUND_BLOCK_RESET" });
        }
    }, [b_sucess]);

    useEffect(() => {
        dispatch({ type: "GET_TRANSACTION_REFUND_BLOCK_RESET" });
    }, []);

    useEffect(() => {
        if (search) {
            dispatch(actions.get_transaction_refund_block(filterSchema));
        }
    }, [filterSchema, dispatch]);

    useEffect(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    }, [button]);

    const handleSearch = (data) => {
        setSearch(true);
        setButton(null);
        if (data?.type === "pin_number") {
            const updatedFilterSchema = {
                ...filterSchema,
                transaction_id: 0,
                pin_number: data?.pin_number,
            };
            setFilterSchema(updatedFilterSchema);
        } else {
            const updatedFilterSchema = {
                ...filterSchema,
                transaction_id: data?.transaction_id,
                pin_number: "",
            };
            setFilterSchema(updatedFilterSchema);
        }
    };

    const handleBlock = (data) => {
        dispatch(
            actions.block_transactions(data?.id, { remarks: data?.remarks })
        );
    };

    const handleRefund = (data) => {
        dispatch(
            actions.refund_transactions(data?.id, { remarks: data?.remarks })
        );
    };

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <SearchForm
                    onSubmit={handleSearch}
                    initialValues={{ transaction_id: "", pin_number: "" }}
                />
            </Grid>
            {loading && (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            )}
            {!response?.data && !loading && success && (
                <Grid item xs={12}>
                    <MessageBox text="No Transaction Found" />
                </Grid>
            )}
            {response?.data && !loading && (
                <>
                    <Grid item xs={12}>
                        <Details
                            data={response?.data}
                            handleBlockOrCancel={setButton}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {button === "block" && (
                            <BlockForm
                                onSubmit={handleBlock}
                                loading={b_loading}
                                initialValues={
                                    response?.data?.tid && {
                                        id: response?.data?.tid,
                                    }
                                }
                            />
                        )}
                        {button === "cancel" && (
                            <RefundForm
                                onSubmit={handleRefund}
                                loading={r_loading}
                                initialValues={
                                    response?.data?.tid && {
                                        id: response?.data?.tid,
                                    }
                                }
                            />
                        )}
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default Search;
