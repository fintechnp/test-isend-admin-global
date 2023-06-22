import { Box, Typography } from "@mui/material";
import Modal from "App/components/Modal/Modal";
import React from "react";

const JSONDATA = {
    id: 1,
    transaction_id: "1",
    transaction_type: "1",
    transaction_status: "1",
    transaction_amount: "1",
    transaction_currency: "1",
    transaction_date: "1",
    transaction_time: "1",
    transaction_description: "1",
    transaction_merchant: "1",
    transaction_merchant_id: "1",
    transaction_merchant_category: "1",
};
export default function SuspiciosModal({ open, handleClose, data }) {
    return (
        <Modal
            sx={{
                maxWidth: "50%",
            }}
            title="Suspicios Data"
            open={open}
            onClose={handleClose}
        >
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </Modal>
    );
}
