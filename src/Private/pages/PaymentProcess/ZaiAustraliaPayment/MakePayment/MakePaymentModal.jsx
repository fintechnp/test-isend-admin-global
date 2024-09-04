import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Modal from "App/components/Modal/Modal";
import Typography from "@mui/material/Typography";
import ListMakePaymentWebhookLog from "./ListMakePaymentWebhookLog";

function MakePaymentModal({ isOpen, customerId, customerName, transactionId, onClose }) {
    return (
        <Modal onClose={onClose} open={isOpen} title={<Typography fontWeight={600}>Make Payment</Typography>}>
            <Box minWidth="80svw">
                <Grid padding={2} container item xs={12}>
                    <Grid item xs={12} sm={4} display="flex">
                        <Typography fontWeight={600}>Customer Name: &nbsp;</Typography> {customerName}
                    </Grid>
                    <Grid item xs={12} sm={4} display="flex">
                        <Typography fontWeight={600}>Customer ID: &nbsp;</Typography> {customerId}
                    </Grid>
                </Grid>
                <ListMakePaymentWebhookLog transactionId={transactionId} customerId={customerId} />
            </Box>
        </Modal>
    );
}

export default MakePaymentModal;
