import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Loading } from "App/components";
import buildRoute from "App/helpers/buildRoute";
import Spacer from "App/components/Spacer/Spacer";
import routePaths from "Private/config/routePaths";
import { convertDate } from "App/utils/convertDate";
import { TablePagination } from "App/components/Table";
import NoResults from "../Transactions/components/NoResults";
import PageContent from "App/components/Container/PageContent";
import FilterForm from "Private/components/BalanceRequest/FilterForm";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import { FormatNumber } from "App/helpers";
import { BalanceRequestActions as actions } from "../BalanceRequest/store";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
};

const sortByOptions = [
    {
        label: "Name",
        value: "name",
    },
    {
        label: "Deposited Amount",
        value: "deposited_amount",
    },
    {
        label: "Currency",
        value: "currency",
    },
    {
        label: "Date of deposit",
        value: "deposit_date",
    },
    {
        label: "Status",
        value: "status",
    },
];

export default function ListBalanceRequest({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: balanceRequestData, loading } = useSelector((state) => state.get_all_balance_request);

    // const sortByOptions =
    //     balanceRequestData?.data?.length > 0 &&
    //     Object.keys(balanceRequestData?.data[0])
    //         ?.map((item) => {
    //             return { value: item, label: item };
    //         })
    //         .filter((item) => item.label !== "f_serial_no");

    useEffect(() => {
        dispatch(actions.get_all_balance_request(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Agent/Business",
                accessorKey: "relatedTo",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Deposited Amount",
                accessorKey: "depositedAmount",
                cell: ({ getValue }) => <>{FormatNumber(getValue())}</>,
            },
            {
                header: "Currency",
                accessorKey: "currency",
            },
            {
                header: "Depositor Method",
                accessorKey: "depositoryMethodName",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },
            {
                header: "Date of Deposit",
                accessorKey: "depositDate",
                cell: ({ getValue }) => <Typography>{getValue() ? convertDate(getValue()) : "N/A"}</Typography>,
            },

            {
                header: "Status",
                accessorKey: "statusName",
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewBalanceRequest, row?.original?.id));
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
        <PageContent title={title || "List Balance Request"} documentTitle="List Balance Request">
            <FilterForm sortByOptions={sortByOptions} setFilterSchema={setFilterSchema} loading={loading} />
            {loading && (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            )}
            {!loading && balanceRequestData?.data && balanceRequestData?.data?.length === 0 ? (
                <Grid item xs={12}>
                    <NoResults text="No Balance Request Found" />
                </Grid>
            ) : (
                <>
                    <Spacer />
                    <TanstackReactTable
                        columns={columns}
                        title="Balance Request"
                        data={balanceRequestData?.data ?? []}
                        loading={loading}
                        renderPagination={() => (
                            <TablePagination
                                paginationData={balanceRequestData?.pagination}
                                handleChangePage={handleChangePage}
                                handleChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                        )}
                    />
                </>
            )}
        </PageContent>
    );
}
