import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Filter from "./../components/Filter";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import ucfirst from "App/helpers/ucfirst";
import actions from "./../store/actions";
import { permissions } from "Private/data/permissions";
import { CurrencyName, FormatDate, FormatNumber } from "App/helpers";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: theme.palette.text.main,
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: "14px",
    color: theme.palette.text.dark,
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    transaction_id: null,
    pin_number: "",
    customer_id: 0,
    sending_agent_id: 0,
    payout_agent_id: 0,
    payout_country: "",
    payment_type: "",
    from_date: "",
    to_date: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const PendingTransactions = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: pendingTransactions, loading: l_loading } = useSelector(
        (state) => state.get_pending_transactions,
    );

    useEffect(() => {
        dispatch(actions.get_pending_transactions(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
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
                        <StyledName
                            component="p"
                            sx={{
                                fontSize: "14px",
                                textTransform: "capitalize",
                            }}
                        >
                            {row?.original?.customer_name ? row?.original?.customer_name : "N/A"}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.7, textTransform: "capitalize" }}
                        >
                            {row?.original?.beneficiary_name ? row?.original?.beneficiary_name : "N/A"}
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
                                opacity: 0.8,
                            }}
                        >
                            {row?.original?.agent_name ? row?.original?.agent_name : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.7,
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
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.7 }}>
                            {row?.original?.created_ts ? FormatDate(row?.original?.created_ts) : "N/A"}
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
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.7 }}>
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
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.7 }}>
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
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.7 }}>
                            {row?.original?.collected_currency ? CurrencyName(row?.original?.collected_currency) : ""}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.7 }}>
                            {row?.original?.payout_currency ? CurrencyName(row?.original?.payout_currency) : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessorKey: "show",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Tooltip title="Transactions Details" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(`/transactions/details/${row.original.tid}/${row.original.customer_id}`)
                                }
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
        <PageContent>
            <PageContentContainer
                title="Pending Transactions"
                topRightContent={
                    <Filter
                        handleSearch={handleSearch}
                        handleSort={handleSort}
                        handleOrder={handleOrder}
                        handleFilter={handleFilter}
                    />
                }
            >
                <TanstackReactTable
                    columns={columns}
                    data={pendingTransactions?.data || []}
                    loading={l_loading}
                    rowsPerPage={8}
                />
                <TablePagination
                    paginationData={pendingTransactions?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </PageContentContainer>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_PENDING_TRANSACTION] })(PendingTransactions);
