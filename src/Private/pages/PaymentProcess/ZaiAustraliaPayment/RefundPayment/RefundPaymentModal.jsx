import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Tabs from "App/components/Tab/Tabs";
import Modal from "App/components/Modal/Modal";
import ListRefundPaymentLog from "./ListRefundPaymentLog";
import ListRefundPaymentWebhookLog from "./ListRefundPaymentWebhookLog";

function RefundPaymentModal({ isOpen, customerId, customerName, onClose, onRefundSuccess }) {
    return (
        <Modal onClose={onClose} open={isOpen} title="Refund Details">
            <Box minWidth="800px">
                <Grid padding={2} container item xs={12}>
                    <Grid item xs={12} sm={6}>
                        Customer Name: {customerName}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        Customer ID: {customerId}
                    </Grid>
                </Grid>
                <Tabs
                    tabs={[
                        {
                            key: "refund-payment-webhook-logs",
                            tabName: "Webhook Logs",
                            tabContent: <ListRefundPaymentWebhookLog customerId={customerId} onRefundSuccess={onRefundSuccess} />,
                        },
                        {
                            key: "refund-payment-refund-logs",
                            tabName: "Refund Logs",
                            tabContent: <ListRefundPaymentLog customerId={customerId} />,
                        },
                    ]}
                />
            </Box>
        </Modal>
    );
}

export default React.memo(RefundPaymentModal);
