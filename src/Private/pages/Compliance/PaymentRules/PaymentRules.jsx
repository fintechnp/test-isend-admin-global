import { styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import Header from "./components/Header";
import Filter from "./components/Filter";
import AddPaymentRules from "./components/AddPaymentRules";
import Table, { TablePagination, TableSwitch } from "App/components/Table";
import { Delete } from "App/components";

import actions from "./store/actions";
import { CountryName, FormatNumber } from "App/helpers";
import PageContent from "App/components/Container/PageContent";

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
}));

const StyledAction = styled(Typography)(({ theme, value }) => ({
    opacity: 0.8,
    paddingTop: "3px",
    paddingBottom: "3px",
    fontSize: "12px",
    borderRadius: "6px",
    textTransform: "capitalize",
    color: theme.palette.primary.contrastText,
    background: stringToColor(value),
    "&: hover": {
        background: stringToColor(value),
    },
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "rule_name",
    order_by: "DESC",
};

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 9) - hash);
    }
    let color = "#";
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

const PaymentRules = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: paymentRules, loading: l_loading } = useSelector((state) => state.get_payment_rules);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_payment_rules);
    const { success: a_success } = useSelector((state) => state.add_payment_rules);
    const { success: u_success } = useSelector((state) => state.update_payment_rules);

    useEffect(() => {
        dispatch(actions.get_all_payment_rules(filterSchema));
        dispatch({ type: "ADD_PAYMENT_RULES_RESET" });
        dispatch({ type: "UPDATE_PAYMENT_RULES_RESET" });
        dispatch({ type: "DELETE_PAYMENT_RULES_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Rule Name",
                accessor: "rule_name",
                maxWidth: 140,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "13px" }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "10px", opacity: 0.7 }}>
                            {data?.row?.original?.send_country
                                ? CountryName(data?.row?.original?.send_country)
                                : "null"}{" "}
                            to{" "}
                            {data?.row?.original?.payout_country
                                ? CountryName(data?.row?.original?.payout_country)
                                : "null"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "Sending/Payout Partner",
                accessor: "sending_agent",
                width: 240,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "4px", fontSize: "13px" }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {data?.row?.original?.payout_agent ? data?.row?.original?.payout_agent : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography>Amount</Typography>
                    </Box>
                ),
                accessor: "amount",
                maxWidth: 90,
                Cell: (data) => (
                    <Box textAlign="right">
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value ? FormatNumber(data.value) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Transactions</Typography>
                    </Box>
                ),
                accessor: "no_of_transactions",
                maxWidth: 90,
                Cell: (data) => (
                    <Box textAlign="center">
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Days</Typography>
                    </Box>
                ),
                accessor: "no_of_days",
                maxWidth: 80,
                Cell: (data) => (
                    <Box textAlign="center">
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>C. Action</Typography>
                    </Box>
                ),
                accessor: "compliance_action",
                maxWidth: 120,
                Cell: (data) => (
                    <Box textAlign="center">
                        <StyledAction component="p" value={data.value ? data.value : "Null"}>
                            {data.value ? data.value : "N/A"}
                        </StyledAction>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                width: 80,
                Cell: (data) => (
                    <SwitchWrapper textAlign="right">
                        <TableSwitch value={data?.value} data={data?.row?.original} handleStatus={handleStatus} />
                    </SwitchWrapper>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessor: "show",
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <span {...row.getToggleRowExpandedProps({})}>
                            {row.isExpanded ? (
                                <Tooltip title="Hide Payment Rules Details" arrow>
                                    <IconButton>
                                        <VisibilityOffOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                                "&:hover": {
                                                    background: "transparent",
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Show Payment Rules Details" arrow>
                                    <IconButton>
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
                            )}
                        </span>
                        <AddPaymentRules update={true} update_data={row?.original} />
                        <Delete
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            loading={d_loading}
                            tooltext="Delete Payment Rules"
                        />
                    </Box>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "sending_agent", name: "Sending Partner", type: "default" },
        { key: "send_country", name: "Country", type: "country" },
        { key: "send_currency", name: "Sending Currency", type: "currency" },
        { key: "payout_agent", name: "Payout Partner", type: "default" },
        { key: "payout_country", name: "Payout Country", type: "country" },
        { key: "amount", name: "Amount", type: "number" },
        {
            key: "no_of_transactions",
            name: "No of Transactions",
            type: "default",
        },
        { key: "no_of_days", name: "No of Days", type: "default" },
        {
            key: "compliance_action",
            name: "Compliance Action",
            type: "default",
        },
        { key: "is_active", name: "Status", type: "boolean" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_payemnt_rules_status({ is_active: is_active }, id));
    }, []);

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

    const handleFilterAgent = (e) => {
        const agent_id = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            agent_id: agent_id,
        };
        setFilterSchema(updatedFilterSchema);
    };

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

    const handleDelete = (id) => {
        dispatch(actions.delete_payemnt_rules(id));
    };

    return (
        <PageContent documentTitle="Payment Rules">
            <Header />
            <Filter
                handleSearch={handleSearch}
                handleFilterAgent={handleFilterAgent}
                handleSort={handleSort}
                handleOrder={handleOrder}
                filterSchema={filterSchema}
            />
            <Table
                columns={columns}
                title="Payment Rules"
                data={paymentRules?.data || []}
                sub_columns={sub_columns}
                loading={l_loading}
                rowsPerPage={8}
                handleDelete={handleDelete}
                renderPagination={() => (
                    <TablePagination
                        paginationData={paymentRules?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default PaymentRules;
