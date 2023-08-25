import React, { useEffect, useMemo, useState } from "react";
import { BalanceRequestActions as actions } from "../BalanceRequest/store";
import { useDispatch, useSelector } from "react-redux";
import PageContent from "App/components/Container/PageContent";
import FilterForm from "Private/components/BalanceRequest/FilterForm";
import { Grid, IconButton, Typography } from "@mui/material";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import NoResults from "../Transactions/components/NoResults";
import { Loading } from "App/components";
import Spacer from "App/components/Spacer/Spacer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import { TablePagination } from "App/components/Table";
import { convertDate } from "App/utils/convertDate";
import routePaths from "Private/config/routePaths";
import buildRoute from "App/helpers/buildRoute";
import { useNavigate } from "react-router-dom";

const initialState = {
    PageNumber: 1,
    PageSize: 10,
};

export default function ListBalanceRequest({ title }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: balanceRequestData, loading } = useSelector((state) => state.get_all_balance_request);

    const sortByOptions =
        balanceRequestData?.data?.length > 0 &&
        Object.keys(balanceRequestData?.data[0])
            ?.map((item) => {
                return { value: item, label: item };
            })
            .filter((item) => item.label !== "f_serial_no");

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
                header: "Name",
                accessorKey: "name",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },

            {
                header: "Deposited Amount",
                accessorKey: "depositedAmount",
            },
            {
                header: "Depositor Name",
                accessorKey: "depositorName",
            },
            {
                header: "Depositor Method Name",
                accessorKey: "depositoryMethodName",
                cell: ({ getValue }) => <Typography>{getValue() ? getValue() : "N/A"}</Typography>,
            },

            {
                header: "Related To",
                accessorKey: "relatedTo",
            },
            {
                header: "Deposit Date",
                accessorKey: "depositDate",
                cell: ({ getValue }) => <Typography>{getValue() ? convertDate(getValue()) : "N/A"}</Typography>,
            },

            {
                header: "Remarks",
                accessorKey: "remarks",
                cell: ({ getValue }) => (
                    <Typography
                        sx={{
                            maxWidth: 250,
                        }}
                    >
                        {getValue() ? getValue() : "N/A"}
                    </Typography>
                ),
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
                    <NoResults text="No Credit Limit Found" />
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
