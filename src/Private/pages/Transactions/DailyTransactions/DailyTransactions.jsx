import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import ucfirst from "App/helpers/ucfirst";
import isEmpty from "App/helpers/isEmpty";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import actions from "./../store/actions";
import Filter from "./../components/Filter";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import { CurrencyName, FormatDate, FormatNumber, ReferenceName } from "App/helpers";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    from_date: new Date().toISOString().slice(0, 10),
    to_date: new Date().toISOString().slice(0, 10),
    sort_by: "created_ts",
    order_by: "DESC",
};

const DailyTransactions = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: dailyTransactions, loading: l_loading } = useSelector((state) => state.get_transactions);

    useEffect(() => {
        dispatch(actions.get_transactions(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
                maxWidth: 100,
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link
                                to={buildRoute(routePaths.viewTransaction, {
                                    id: row?.original?.tid,
                                    customerId: row?.original?.customer_id,
                                })}
                                style={{ textDecoration: "none" }}
                            >
                                {row?.original?.tid ? row?.original?.tid : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Name",
                accessorKey: "customer_name",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {row?.original?.customer_name ? row?.original?.customer_name : "n/a"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {row?.original?.beneficiary_name ? row?.original?.beneficiary_name : "n/a"}
                        </Typography>
                    </Box>
                ),
            },

            {
                header: "C/B Id",
                accessorKey: "customer_id",
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "13px" }}>
                            <Link
                                to={`/customer/details/${row?.original?.customer_id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {row?.original?.customer_id ? row?.original?.customer_id : "N/A"}
                            </Link>
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            <Link
                                to={`/customer/beneficiary/details/${row?.original?.customer_id}/${row?.original?.beneficiary_id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {row?.original?.beneficiary_id ? row?.original?.beneficiary_id : "n/a"}
                            </Link>
                        </Typography>
                    </Box>
                ),
            },
            {
                header: "Partner/Payout Country",
                accessorKey: "agent_name",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                            }}
                        >
                            {row?.original?.agent_name ? row?.original?.agent_name : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {row?.original?.payout_country_data
                                ? ucfirst(row?.original?.payout_country_data.toLowerCase())
                                : (row?.original?.payout_country ?? "N/A")}
                        </StyledName>
                    </Box>
                ),
            },

            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Date</Typography>
                    </Box>
                ),
                accessorKey: "created_ts",
                cell: ({ row }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {FormatDate(row?.original?.created_ts)}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Rate</Typography>
                    </Box>
                ),
                accessorKey: "payout_cost_rate",
                cell: ({ row }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.payout_cost_rate ? FormatNumber(row?.original?.payout_cost_rate) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Amount</Typography>
                    </Box>
                ),
                accessorKey: "transfer_amount",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.collected_amount ? FormatNumber(row?.original?.collected_amount) : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {row?.original?.payout_amount ? FormatNumber(row?.original?.payout_amount) : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Currency</Typography>
                    </Box>
                ),
                accessorKey: "collected_currency",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {CurrencyName(row?.original?.collected_currency)}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {CurrencyName(row?.original?.payout_currency)}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>S/T Status</Typography>
                    </Box>
                ),
                accessorKey: "send_status",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            textAlign: "right",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "12px",
                                lineHeight: 1.2,
                            }}
                        >
                            {isEmpty(row?.original?.status)
                                ? row?.original?.send_status
                                : ReferenceName(66, row?.original?.status)}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {!isEmpty(row?.original?.transaction_status) ? row?.original?.transaction_status : " "}
                        </Typography>
                    </Box>
                ),
            },
        ],
        [],
    );

    const handleSearch = useCallback(
        (value) => {
            const updatedFilterSchema = {
                ...filterSchema,
                search: value,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema],
    );

    const handleSort = (e) => {
        const type = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: type,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleOrder = (e) => {
        const order = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleFilter = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            transaction_id: data?.transaction_id,
            pin_number: data?.pin_number,
            customer_id: data?.customer_id,
            sending_agent_id: data?.sending_agent_id,
            payout_agent_id: data?.payout_agent_id,
            payout_country: data?.payment_country,
            payment_type: data?.payment_type,
            from_date: data?.from_date,
            to_date: data?.to_date,
        };
        setFilterSchema(updatedFilterSchema);
    };

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
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <PageContent
            documentTitle="Daily Transactions"
            breadcrumbs={[
                {
                    label: "Transaction",
                },
                {
                    label: "Daily",
                },
            ]}
        >
            <PageContentContainer
                topRightContent={
                    <Filter
                        handleSearch={handleSearch}
                        handleSort={handleSort}
                        handleOrder={handleOrder}
                        handleFilter={handleFilter}
                    />
                }
            >
                <TanstackReactTable columns={columns} data={dailyTransactions?.data || []} loading={l_loading} />
                <TablePagination
                    paginationData={dailyTransactions?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </PageContentContainer>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_DAILY_TRANSACTION] })(DailyTransactions);
