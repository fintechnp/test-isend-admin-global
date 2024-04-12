import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Modal from "App/components/Modal/Modal";
import Spacer from "App/components/Spacer/Spacer";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import AchTransactionDetail from "Private/components/AchTransaction/AchTransactionDetail";
import AchTransactionFilterForm from "Private/components/AchTransaction/AchTransactionFilterForm";

import { AchTransactionActions as actions } from "./store";

const initialState = {
    page_number: 1,
    page_size: 10,
};

export default function AchTransactions() {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const [selectedRow, setSelectedRow] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const { response, loading, success } = useSelector((state) => state.get_ach_transactions);

    useEffect(() => {
        dispatch(actions.get_ach_transactions(filterSchema));
    }, [filterSchema]);

    const handleFilterSubmit = (data) => {
        setFilterSchema({ ...filterSchema, ...data });
    };

    const handleFilterReset = () => {
        setFilterSchema(initialState);
    };

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Payment ID",
                accessorKey: "ach_payment_id",
                cell: ({ row }) => {
                    return <Typography>{row?.original?.ach_payment_id ?? "N/A"}</Typography>;
                },
            },
            {
                header: "Trace Number",
                accessorKey: "ach_trace_number",
                cell: ({ row }) => {
                    return <Typography>{row?.original?.ach_trace_number ?? "N/A"}</Typography>;
                },
            },

            {
                header: "TXN No",
                accessorKey: "txn_no",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Amount",
                accessorKey: "amount",
            },
            {
                header: "TXN Type",
                accessorKey: "txn_type",
            },

            {
                header: "Status",
                accessorKey: "status",
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <Tooltip title="View Detail">
                            <IconButton
                                onClick={() => {
                                    setShowModal(true);
                                    setSelectedRow(row.original);
                                }}
                            >
                                <RemoveRedEyeOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };
    return (
        <>
            <PageContent title="ACH Transactions">
                <AchTransactionFilterForm
                    isProcessing={loading}
                    onSubmit={handleFilterSubmit}
                    onReset={handleFilterReset}
                />
                <Spacer />
                <TanstackReactTable
                    columns={columns}
                    title="ACH Transactions"
                    data={response?.data ?? []}
                    loading={loading}
                    renderPagination={() => (
                        <TablePagination
                            paginationData={response?.pagination}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                />
            </PageContent>
            <Modal
                sx={{
                    width: "75%",
                    // height: "75%",
                }}
                open={showModal}
                onClose={() => {
                    setShowModal(false);
                }}
            >
                <AchTransactionDetail
                    data={selectedRow}
                    onClose={() => {
                        setShowModal(false);
                    }}
                />
            </Modal>
        </>
    );
}
