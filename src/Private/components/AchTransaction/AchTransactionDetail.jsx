import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { useDispatch, useSelector } from "react-redux";

import Spacer from "App/components/Spacer/Spacer";
import UpdateStatusForm from "./UpdateStatusForm";
import Button from "App/components/Button/Button";
import { RenderField, Title } from "Private/pages/Customers/CustomerDetails/CustomerDetails";

import { AchTransactionActions as actions } from "Private/pages/Transactions/AchTransactions/store";

export default function AchTransactionDetail({ data, onClose }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const { loading, success } = useSelector((state) => state.update_ach_transaction_status);

    useEffect(() => {
        if (success) {
            setOpen(false);
            onClose();
            dispatch(
                actions.get_ach_transactions({
                    page_number: 1,
                    page_size: 10,
                }),
            );
        }
    }, [success]);

    const handleSubmit = (formData) => {
        dispatch(actions.update_ach_transaction_status(data?.ach_id, formData));
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <ReceiptLongIcon sx={{ color: "primary.main", fontSize: "28px" }} />
                            <Title> ACH Transaction Details </Title>
                        </Box>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                setOpen(true);
                            }}
                        >
                            Update Status
                        </Button>
                    </Box>
                </Grid>
                <Spacer />

                {open && (
                    <Grid item xs={12} my={2}>
                        <UpdateStatusForm
                            loading={loading}
                            defaultValues={{
                                status: data?.status,
                            }}
                            handleSubmit={handleSubmit}
                            onClose={() => {
                                setOpen(false);
                            }}
                        />
                    </Grid>
                )}
                <Grid item xs={12} md={6}>
                    <RenderField label="ACH Id" value={data?.ach_id} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Payment Id" value={data?.ach_payment_id} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Trace Number" value={data?.ach_trace_number} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Routing Number" value={data?.routing_no} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Transaction Number" value={data?.txn_no} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Transaction group Id" value={data?.transaction_group_id} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Name" value={data?.name} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Amount" value={data?.amount} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Transaction Type" value={data?.txn_type} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Is Active" value={data?.is_active ? "True" : "False"} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <RenderField label="Status" value={data?.status} />
                </Grid>
            </Grid>
        </>
    );
}
