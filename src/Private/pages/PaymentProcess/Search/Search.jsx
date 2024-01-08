import { reset } from "redux-form";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BlockForm from "./Form/BlockForm";
import SearchForm from "./Form/SearchForm";
import RefundForm from "./Form/RefundForm";
import Details from "./components/Details";
import Loading from "App/components/Loading";
import MessageBox from "./components/MessageBox";

import actions from "./../store/actions";
import PageContent from "App/components/Container/PageContent";

function Search(props) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState(null);
    const [button, setButton] = useState(null);
    const [filterSchema, setFilterSchema] = useState({
        transaction_id: null,
        pin_number: "",
    });
    const { response, loading, error } = useSelector((state) => state.get_transaction_refund_block);

    const { success: b_sucess, loading: b_loading } = useSelector((state) => state.block_transactions);

    const { success: r_sucess, loading: r_loading } = useSelector((state) => state.refund_transactions);

    useEffect(() => {
        if (b_sucess || r_sucess) {
            dispatch(reset("search_form_transaction"));
            dispatch(reset("block_form_transaction"));
            dispatch(reset("refund_form_transaction"));
            dispatch({ type: "BLOCK_TRANSACTIONS_RESET" });
            dispatch({ type: "REFUND_TRANSACTIONS_RESET" });
            dispatch({ type: "GET_TRANSACTION_REFUND_BLOCK_RESET" });
        }
    }, [b_sucess, r_sucess]);

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
        dispatch(actions.block_transactions(data?.id, { remarks: data?.remarks }));
    };

    const handleRefund = (data) => {
        dispatch(
            actions.refund_transactions(data?.id, {
                remarks: data?.remarks,
                refund_charge: data?.refund_charge,
            }),
        );
    };

    return (
      <PageContent documentTitle="Search Transaction">
            <Grid container sx={{ pb: "24px" }}>
                <Grid item xs={12}>
                    <SearchForm onSubmit={handleSearch} initialValues={{ transaction_id: "", pin_number: "" }} loading={loading} />
                </Grid>
                {loading && (
                    <Grid item xs={12}>
                        <Loading loading={loading} />
                    </Grid>
                )}
                {!response?.data && !loading && error && (
                    <Grid item xs={12}>
                        <MessageBox text="No Transaction Found" />
                    </Grid>
                )}
                {response?.data && !loading && (
                    <>
                        <Grid item xs={12}>
                            <Details data={response?.data} handleBlockOrCancel={setButton} />
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
                                            refund_charge: false,
                                        }
                                    }
                                />
                            )}
                        </Grid>
                    </>
                )}
            </Grid>
      </PageContent>
    );
}

export default Search;
