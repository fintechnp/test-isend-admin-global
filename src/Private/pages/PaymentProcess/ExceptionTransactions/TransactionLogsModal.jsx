import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import dateUtils from "App/utils/dateUtils";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import isEmpty from "App/helpers/isEmpty";
import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

import { PaymentProcessingAction } from "../store";

const TransactionLogsModal = () => {
    const dispatch = useDispatch();

    const { isOpen, initial_form_data: initialResponse } = useSelector((state) => state.get_transactions_logs);

    const { response: logsResponse, loading: isLoading } = useSelector(
        (state) => state.get_exception_transactions_logs,
    );

    const handleClose = () => {
        dispatch({ type: "CLOSE_TRANSACTIONS_LOGS_MODAL" });
    };

    useEffect(() => {
        if (isOpen) {
            dispatch(
                PaymentProcessingAction.get_exception_transactions_logs({
                    transaction_id: initialResponse,
                }),
            );
        }
    }, [isOpen, dispatch, initialResponse]);

    const logsData = logsResponse?.data;

    const logsDefinition = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "Transaction Logs",
                    accessorKey: "transaction_id",
                },
                {
                    label: "IPay Code",
                    accessorKey: "ipay_code",
                },
                {
                    label: "Description",
                    accessorKey: "messsage",
                    cell: (data) => <Box fontWeight={600}>{data.messsage}</Box>,
                },
                {
                    label: "Created At",
                    accessorKey: "created_ts",
                    cell: (data) =>
                        data.created_ts ? dateUtils.getFormattedDate(data.created_ts, "MM/DD/YYYY hh:mm A") : "-",
                },
                {
                    label: "Created By",
                    accessorKey: "created_by",
                },
            ],
        },
    ]);

    return (
        <Modal
            sx={{
                width: "36rem",
            }}
            title="Transactions Logs"
            open={isOpen}
            onClose={handleClose}
        >
            {isLoading ? (
                <Skeleton variant="rectangular" height={200} width="100%" />
            ) : isEmpty(logsData) ? (
                <Typography variant="body1" textAlign="center">
                    No Transaction Logs found for ID {initialResponse}
                </Typography>
            ) : (
                <>
                    {logsData?.map((log, index) => (
                        <Box key={index} sx={{ marginBottom: 4 }}>
                            <SourceDetails viewMode="column" rowMode="row" definition={logsDefinition} data={log} />
                        </Box>
                    ))}
                </>
            )}
        </Modal>
    );
};

export default TransactionLogsModal;
