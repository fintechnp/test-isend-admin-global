import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import PageContent from "App/components/Container/PageContent";
import { Fetching, RenderField, Title, TitleWrapper } from "../CustomerDetails/CustomerDetails";
import CustomerDeleteApproveRejectModalForm from "Private/components/customers/CustomerDeleteApproveRejectModalForm";

import { customerDeleteActions } from "./store";

export default function CustomerDeleteRequestDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [open, setOpen] = useState(false);

    const { loading, success, response } = useSelector((state) => state.get_customer_delete_details);

    const deleteRequestDetails = response?.data;

    useEffect(() => {
        dispatch(customerDeleteActions.get_customer_delete_details(id));
    }, [id]);

    const handleClose = () => {
        setOpen(false);
    };

    if (loading && !success) {
        return (
            <PageContent title="Customer Details">
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                    <Fetching>Fetching...</Fetching>
                </Box>
            </PageContent>
        );
    }

    return (
        <PageContent
            title="Delete Request Detail"
            topRightEndContent={
                deleteRequestDetails?.status !== "approved" && (
                    <Button
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        Approve
                    </Button>
                )
            }
        >
            <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Details</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Full Name" value={deleteRequestDetails?.full_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Deletion Reason" value={deleteRequestDetails?.deletion_reason} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Remarks" value={deleteRequestDetails?.remarks} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Status" value={deleteRequestDetails?.status} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Is Completed" value={deleteRequestDetails?.is_completed ? "Yes" : "No"} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Is Confirmation Accepted"
                        value={deleteRequestDetails?.is_confirmation_accepted ? "Yes" : "No"}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Is Valid Request"
                        value={deleteRequestDetails?.is_valid_request ? "Yes" : "No"}
                    />
                </Grid>
            </Grid>
            <Modal
                title="Approve/Reject Delete Request"
                open={open}
                onClose={handleClose}
                sx={{
                    width: "500px",
                }}
            >
                <CustomerDeleteApproveRejectModalForm setOpen={setOpen} />
            </Modal>
        </PageContent>
    );
}
