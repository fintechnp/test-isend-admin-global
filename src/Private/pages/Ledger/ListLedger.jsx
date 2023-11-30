import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import PageContent from "App/components/Container/PageContent";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import { TablePagination } from "App/components/Table";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { ledgerActions as actions } from "./store";
import LedgerFilterForm from "Private/components/Ledger/LedgerFilterForm";
import EntryType from "./enum/EntryType";
import { Typography } from "@mui/material";

const initialState = {
    Page: 1,
    PageSize: 10,
};
export default function ListLedger() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_all_ledger);

    useEffect(() => {
        dispatch(actions?.get_all_ledger(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Entry Type",
                accessorKey: "entryTypeName",
                cell: ({ row, getValue }) => {
                    if (
                        row?.original?.entryTypeName === EntryType.Single ||
                        row?.original?.entryTypeName === EntryType.SingleServiceCharge ||
                        row?.original?.entryTypeName === EntryType.SingleReverseEntry ||
                        row?.original?.entryTypeName === EntryType.BatchReverseEntry ||
                        row?.original?.entryTypeName === EntryType.SingleServiceChargeReverseEntry ||
                        row?.original?.entryTypeName === EntryType.BatchServiceChargeReverseEntry ||
                        row?.original?.entryTypeName === EntryType.SingleBatchTransaction ||
                        row?.original?.entryTypeName === EntryType.SingleBatchServiceCharge
                    ) {
                        return <Link to={`/transactions/details/${row?.original?.entryId}`}>{getValue()}</Link>;
                    } else if (
                        row?.original?.entryTypeName === EntryType.Batch ||
                        row?.original?.entryTypeName === EntryType.BatchServiceCharge
                    ) {
                        return (
                            <Link to={buildRoute(routePaths.agent.viewBatchTransaction, row?.original?.entryId)}>
                                {getValue()}
                            </Link>
                        );
                    } else if (row?.original?.entryTypeName === EntryType.BalanceRequest) {
                        return (
                            <Link to={buildRoute(routePaths.agent.viewBalanceRequest, row?.original?.entryId)}>
                                {getValue()}
                            </Link>
                        );
                    } else {
                        return <Typography>{getValue()}</Typography>;
                    }
                },
            },
            {
                header: "Account Name",
                accessorKey: "accountName",
            },
            {
                header: "Currency",
                accessorKey: "currency",
            },

            {
                header: "Narration",
                accessorKey: "narration",
            },
            {
                header: "Debit",
                accessorKey: "totalDebit",
            },
            {
                header: "Credit",
                accessorKey: "totalCredit",
            },
            {
                header: "Created At",
                accessorKey: "created",
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewLedger, row?.original?.id));
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
                ),
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
    return (
        <PageContent
            title="Ledger List"
            topRightEndContent={
                <Button
                    onClick={() => {
                        navigate(routePaths.agent.addLedger);
                    }}
                >
                    Add Ledger
                </Button>
            }
        >
            <LedgerFilterForm setFilterSchema={setFilterSchema} />
            <TanstackReactTable
                columns={columns}
                title="Ledger"
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
    );
}
