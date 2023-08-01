import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import PageContent from "App/components/Container/PageContent";

import { creditLimitActions } from "./store";
import { RenderField, Title, TitleWrapper } from "../Customers/CustomerDetails/CustomerDetails";

export default function ViewCreditLimit({ title }) {
    const dispatch = useDispatch();
    const { creditLimitId } = useParams();

    const { response, loading } = useSelector((state) => state.get_credit_limit_details);

    const {
        checkedAt,
        checkedBy,
        checkerRemarks,
        createdAt,
        createdBy,
        creditLimit,
        currency,
        id,
        name,
        remarks,
        status,
    } = response?.data;

    console.log("🚀 ~ file: ViewCreditLimit.jsx:14 ~ ViewCreditLimit ~ response:", response);

    useEffect(() => {
        dispatch(creditLimitActions.get_credit_limit_details(creditLimitId));
    }, [creditLimitId]);
    return (
        <PageContent title={title || "Credit Limit Details"}>
            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Detail</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Id" value={id} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Name" value={name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Credit Limit" value={creditLimit} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Remarks" value={remarks} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Currency" value={currency} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Status" value={status} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Created By" value={createdBy} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Checked By" value={checkedBy} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Checker Remarks" value={checkerRemarks} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Created At" value={createdAt} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Checked At" value={checkedAt} />
                    </Grid>
                </Grid>
            )}
        </PageContent>
    );
}
