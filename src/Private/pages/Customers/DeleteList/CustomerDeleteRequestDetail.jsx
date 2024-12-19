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

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import { customerDeleteActions } from "./store";
import Column from "App/components/Column/Column";
import { DeleteAccountStatus } from "./data/DeleteAccountStatus";
import PageContentContainer from "App/components/Container/PageContentContainer";

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

    if (loading || !success) {
        return (
            <PageContent documentTitle="Delete Account Request">
                <PageContentContainer title="Delete Account Request">
                    <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                        <Fetching>Fetching...</Fetching>
                    </Box>
                </PageContentContainer>
            </PageContent>
        );
    }

    return (
        <PageContent documentTitle="Delete Account Request">
            <Column gap="16px">
                <PageContentContainer title="Delete Account Request">
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
                            <RenderField
                                label="Deletion Reason"
                                value={deleteRequestDetails?.deletion_reason ?? "Others"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Account Request Details</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField
                                label="Status"
                                value={
                                    <StatusBadge status={deleteRequestDetails?.status ?? DeleteAccountStatus.PENDING} />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Remarks" value={deleteRequestDetails?.remarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField
                                label="Requested Date"
                                value={
                                    deleteRequestDetails?.created_ts
                                        ? dateUtils.getFormattedDate(deleteRequestDetails?.created_ts)
                                        : ""
                                }
                            />
                        </Grid>
                        {deleteRequestDetails?.updated_by && (
                            <Grid item xs={12} sm={6}>
                                <RenderField
                                    label={
                                        deleteRequestDetails?.status?.toLowerCase() === DeleteAccountStatus.APPROVED
                                            ? "Approved By"
                                            : "Rejected By"
                                    }
                                    value={deleteRequestDetails?.updated_by ? deleteRequestDetails?.updated_by : ""}
                                />
                            </Grid>
                        )}
                        {deleteRequestDetails?.updated_ts && (
                            <Grid item xs={12} sm={6}>
                                <RenderField
                                    label={
                                        deleteRequestDetails?.status?.toLowerCase() === DeleteAccountStatus.APPROVED
                                            ? "Approved Date"
                                            : "Rejected Date"
                                    }
                                    value={
                                        deleteRequestDetails?.updated_ts
                                            ? dateUtils.getFormattedDate(deleteRequestDetails?.updated_ts)
                                            : ""
                                    }
                                />
                            </Grid>
                        )}
                        <Grid item xs={12}>
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
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}
