import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import StatusBadge from "./components/StatusBadge";
import Button from "App/components/Button/Button";
import PageContent from "App/components/Container/PageContent";
import { Fetching, RenderField, Title, TitleWrapper } from "App/components/Container";
import CustomerDeleteApproveRejectModalForm from "Private/components/customers/CustomerDeleteApproveRejectModalForm";

import { customerDeleteActions } from "./store";
import { DeleteAccountStatus } from "./data/DeleteAccountStatus";
import Row from "App/components/Row/Row";

export default function CustomerDeleteRequestDetail() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [status, setStatus] = useState("");

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
        <PageContent title="Delete Account Request">
            <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Customer Details</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Full Name" value={deleteRequestDetails?.full_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Email" value={deleteRequestDetails?.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Phone Number" value={deleteRequestDetails?.mobile_number} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Deletion Reason" value={deleteRequestDetails?.deletion_reason ?? "Others"} />
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Status Details</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Status"
                        value={<StatusBadge status={deleteRequestDetails?.status ?? DeleteAccountStatus.PENDING} />}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Remarks" value={deleteRequestDetails?.remarks} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    {![DeleteAccountStatus.APPROVED, DeleteAccountStatus.REJECTED].includes(
                        deleteRequestDetails?.status?.toLowerCase(),
                    ) && (
                        <Row gap={2}>
                            <Button
                                onClick={() => {
                                    setStatus(DeleteAccountStatus.APPROVED);
                                    setOpen(true);
                                }}
                                variant="contained"
                                color="success"
                            >
                                Approve
                            </Button>

                            <Button
                                onClick={() => {
                                    setStatus(DeleteAccountStatus.REJECTED);
                                    setOpen(true);
                                }}
                                variant="contained"
                                color="error"
                            >
                                Reject
                            </Button>
                        </Row>
                    )}
                </Grid>
            </Grid>
            <Modal
                title="Approve Delete Request"
                open={open}
                onClose={handleClose}
                sx={{
                    width: "500px",
                }}
            >
                <CustomerDeleteApproveRejectModalForm setOpen={setOpen} status={status} />
            </Modal>
        </PageContent>
    );
}
