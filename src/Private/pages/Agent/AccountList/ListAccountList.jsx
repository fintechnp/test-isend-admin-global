import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Modal from "App/components/Modal/Modal";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { RenderField } from "App/components/Container";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { accountListActions as actions } from "./store";

const initialState = {
    Page: 1,
    PageSize: 10,
};
export default function ListAccountList() {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const [openModal, setOpenModal] = useState(false);

    const { response, loading } = useSelector((state) => state.get_all_account_list);

    const { response: accountBalanceDetail, loading: accountBalanceLoading } = useSelector(
        (state) => state.get_account_balance_by_id,
    );

    useEffect(() => {
        dispatch(actions?.get_all_account_list(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Account Name",
                accessorKey: "accountName",
            },
            {
                header: "Actions",
                accessorKey: "actions",
                cell: ({ row }) => {
                    return (
                        <TableRowActionContainer>
                            <IconButton
                                onClick={() => {
                                    setOpenModal(true);
                                    dispatch(actions.get_account_balance_by_id(row?.original?.id));
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
                        </TableRowActionContainer>
                    );
                },
            },
        ],
        [],
    );

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            Page: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            PageSize: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <>
            <PageContent title="Account List">
                <TanstackReactTable
                    columns={columns}
                    title="Account List"
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
                open={openModal}
                title="Account Balance"
                onClose={handleCloseModal}
                sx={{
                    width: "50%",
                    height: "20%",
                }}
            >
                <div>
                    {accountBalanceLoading && <p>Loading...</p>}
                    {!accountBalanceLoading && accountBalanceDetail?.data && (
                        <Grid container spacing="1rem">
                            <Grid item xs={12} md={6}>
                                <RenderField
                                    label="Debit Amount"
                                    value={String(accountBalanceDetail?.data?.debitAmount)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RenderField
                                    label="Credit Amount"
                                    value={String(accountBalanceDetail?.data?.creditAmount)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <RenderField label="Net Amount" value={String(accountBalanceDetail?.data?.netAmount)} />
                            </Grid>
                        </Grid>
                    )}
                </div>
            </Modal>
        </>
    );
}
