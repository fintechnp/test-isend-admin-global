import Grid from "@mui/material/Grid";
import React from "react";
import Modal from "App/components/Modal/Modal";
import Typography from "@mui/material/Typography";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import Clipboard from "App/components/Clipboard/Clipboard";
import CancelButton from "App/components/Button/CancelButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

import { ZaiLogsType } from "../../../PaymentProcess/ZaiAustraliaPayment/data/zaiLogsType";

const ViewZaiLogsModal = ({ title, isLoading, isOpen, handleClose, initial_values, logType }) => {
    if (!isOpen) return null;

    const Webhookdefination = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "Customer Name",
                    accessorKey: "customer_name",
                },
                {
                    label: "Customer ID",
                    accessorKey: "customer_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.customer_id}</Typography>}
                            content={data.customer_id}
                        />
                    ),
                },

                {
                    label: "Transaction ID",
                    accessorKey: "transaction_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.transaction_id}</Typography>}
                            content={data.transaction_id}
                        />
                    ),
                },
                {
                    label: "User ID",
                    accessorKey: "user_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.user_id}</Typography>}
                            content={data.user_id}
                        />
                    ),
                },
                {
                    label: "Payment Amount",
                    accessorKey: "payment_amount",
                },

                {
                    label: "Transaction Amount",
                    accessorKey: "transaction_amount",
                },
                {
                    label: "Debtor Name",
                    accessorKey: "debtor_name",
                    cell: (data) => (!isEmpty(data.debtor_name) ? data.debtor_name : "N/A"),
                },
                {
                    label: "Transaction Currency",
                    accessorKey: "transaction_currency",
                },
                {
                    label: "Created Date",
                    accessorKey: "created_ts",
                    cell: (data) => (
                        <Typography fontWeight={600}>
                            {data.created_ts ? dateUtils.getFormattedDate(data.created_ts, "MM/DD/YYYY hh:mm A") : "-"}
                        </Typography>
                    ),
                },
                {
                    label: "Updated Date",
                    accessorKey: "updated_ts",
                    cell: (data) => (
                        <Typography fontWeight={600}>
                            {data.updated_ts ? dateUtils.getFormattedDate(data.updated_ts, "MM/DD/YYYY hh:mm A") : "-"}
                        </Typography>
                    ),
                },
            ],
        },
    ]);

    const Refunddefination = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "Customer Name",
                    accessorKey: "customer_name",
                },
                {
                    label: "Webhook ID",
                    accessorKey: "webhook_id",
                },
                {
                    label: "User ID",
                    accessorKey: "user_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.user_id}</Typography>}
                            content={data?.user_id}
                        />
                    ),
                },
                {
                    label: "Customer ID",
                    accessorKey: "customer_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.customer_id}</Typography>}
                            content={data?.customer_id}
                        />
                    ),
                },

                {
                    label: "Refund ID",
                    accessorKey: "refund_id",
                },

                {
                    label: "Bank ID",
                    accessorKey: "bank_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.bank_id}</Typography>}
                            content={data?.bank_id}
                        />
                    ),
                },
                {
                    label: "Withdrawal ID",
                    accessorKey: "withdrawal_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.withdrawal_id}</Typography>}
                            content={data?.withdrawal_id}
                        />
                    ),
                },
                {
                    label: "ZAI Transaction ID",
                    accessorKey: "zai_transaction_id",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.zai_transaction_id}</Typography>}
                            content={data?.zai_transaction_id}
                        />
                    ),
                },
                {
                    label: "Refund Amount",
                    accessorKey: "refund_amount",
                },

                {
                    label: "Reference No",
                    accessorKey: "reference_no",
                    cell: (data) => (
                        <Clipboard
                            label={<Typography fontWeight={600}>{data.reference_no}</Typography>}
                            content={data?.reference_no}
                        />
                    ),
                },
                {
                    label: "Refund Status",
                    accessorKey: "refund_status",
                },

                {
                    label: "Status",
                    accessorKey: "webhook_status_description",
                },
                {
                    label: "Transaction Amount",
                    accessorKey: "transaction_amount",
                },
                {
                    label: "Transaction Currency",
                    accessorKey: "transaction_currency",
                },

                {
                    label: "Remarks",
                    accessorKey: "remarks",
                },
                {
                    label: "Created Date",
                    accessorKey: "created_ts",
                    cell: (data) => (
                        <Typography fontWeight={600}>
                            {data.updated_ts ? dateUtils.getFormattedDate(data.created_ts, "MM/DD/YYYY hh:mm A") : "-"}
                        </Typography>
                    ),
                },
                {
                    label: "Updated Date",
                    accessorKey: "updated_ts",
                    cell: (data) => (
                        <Typography fontWeight={600}>
                            {data.updated_ts ? dateUtils.getFormattedDate(data.updated_ts, "MM/DD/YYYY hh:mm A") : "-"}
                        </Typography>
                    ),
                },
            ],
        },
    ]);

    return (
        <Modal
            sx={{
                paddingLeft: "3rem",
            }}
            open={isOpen}
            onClose={handleClose}
            title={title}
        >
            <Grid container spacing={3}>
                <SourceDetails
                    definition={ZaiLogsType.ZAI_WEBHOOK_LOGS === logType ? Webhookdefination : Refunddefination}
                    data={initial_values}
                    isLoading={isLoading}
                    viewMode="column"
                    rowMode="row"
                />

                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose}>Cancel</CancelButton>
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default ViewZaiLogsModal;
