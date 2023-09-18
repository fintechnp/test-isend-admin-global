import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import PageContent from "App/components/Container/PageContent";

import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import UpdateStatusForm from "Private/components/CreditLimit/UpdateStatusForm";
import { RenderField, Title, TitleWrapper } from "../Customers/CustomerDetails/CustomerDetails";

import { creditLimitActions } from "./store";

export default function ViewCreditLimit({ title }) {
    const dispatch = useDispatch();
    const { creditLimitId } = useParams();

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_credit_limit_details);

    useEffect(() => {
        dispatch(creditLimitActions.get_credit_limit_details(creditLimitId));
    }, [creditLimitId]);

    const handleClose = () => {
        setOpen(false);
    };

    if (loading) {
        return (
            <Grid item xs={12}>
                <Loading loading={loading} />
            </Grid>
        );
    }
    return (
        <>
            <PageContent
                title={title || "Credit Limit Details"}
                topRightEndContent={
                    response?.data?.statusName !== "Approved" && (
                        <Button
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Update Status
                        </Button>
                    )
                }
            >
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
                            <RenderField label="Id" value={response?.data?.id} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Name" value={response?.data?.name} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Credit Limit" value={response?.data?.creditLimit} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Remarks" value={response?.data?.remarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Currency" value={response?.data?.currency} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Status" value={response?.data?.status} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Created By" value={response?.data?.createdBy} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checked By" value={response?.data?.checkedBy} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checker Remarks" value={response?.data?.checkerRemarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Created At" value={response?.data?.createdAt} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Checked At" value={response?.data?.checkedAt} />
                        </Grid>
                    </Grid>
                )}
            </PageContent>
            <Modal title="Update Credit Limit status" open={open} onClose={handleClose}>
                <UpdateStatusForm setOpen={setOpen} />
            </Modal>
        </>
    );
}
