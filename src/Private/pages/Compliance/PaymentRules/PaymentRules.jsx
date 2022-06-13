import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import AddPaymentRules from "./components/AddPaymentRules";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../App/components/Table";
import { CountryName } from "./../../../../App/helpers";
import { Delete } from "./../../../../App/components";

const PaymentContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
}));

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "rule_name",
    order_by: "ASC",
};

const PaymentRules = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: paymentRules, loading: l_loading } = useSelector(
        (state) => state.get_payment_rules
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_payment_rules
    );
    const { success: a_success } = useSelector(
        (state) => state.add_payment_rules
    );
    const { success: u_success } = useSelector(
        (state) => state.update_payment_rules
    );

    useEffect(() => {
        dispatch(actions.get_all_payemnt_rules(filterSchema));
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
                            {data.value}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "10px", opacity: 0.8 }}
                        >
                            {CountryName(data?.row?.original?.send_country)} to{" "}
                            {CountryName(data?.row?.original?.payout_country)}
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
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {data.value}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{ paddingLeft: "4px", fontSize: "13px" }}
                        >
                            {data?.row?.original?.payout_agent}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Amount</Typography>
                    </Box>
                ),
                accessor: "amount",
                maxWidth: 90,
                Cell: (data) => (
                    <Box textAlign="right" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Transactions</Typography>
                    </Box>
                ),
                accessor: "no_of_transactions",
                maxWidth: 90,
                Cell: (data) => (
                    <Box textAlign="center" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Days</Typography>
                    </Box>
                ),
                accessor: "no_of_days",
                maxWidth: 80,
                Cell: (data) => (
                    <Box textAlign="center">
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value}
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
                        <StyledText component="p">{data.value}</StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                width: 80,
                Cell: (data) => (
                    <SwitchWrapper textAlign="right" sx={{}}>
                        <TableSwitch
                            value={data?.value}
                            data={data?.row?.original}
                            handleStatus={handleStatus}
                        />
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
                                <Tooltip
                                    title="Hide Payment Rules Details"
                                    arrow
                                >
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
                                <Tooltip
                                    title="Show Payment Rules Details"
                                    arrow
                                >
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
                        <AddPaymentRules
                            update={true}
                            update_data={row?.original}
                        />
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
        []
    );

    const sub_columns = [
        { key: "tid", name: "Id" },
        { key: "sending_agent", name: "Sending Partner" },
        { key: "send_country", name: "Sending Country" },
        { key: "send_currency", name: "Sending Currency" },
        { key: "payout_agent", name: "Payout Partner" },
        { key: "payout_country", name: "Payout Country" },
        { key: "amount", name: "Amount" },
        { key: "no_of_transactions", name: "No of Transactions" },
        { key: "no_of_days", name: "No of Days" },
        { key: "compliance_action", name: "Compliance Action" },
        { key: "is_active", name: "Status" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(
            actions.update_payemnt_rules_status({ is_active: is_active }, id)
        );
    }, []);

    const handleSearch = useCallback(
        (e) => {
            const searchValue = e.target.value;
            const updatedFilterSchema = {
                ...filterSchema,
                search: searchValue,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema]
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
        <PaymentContainer>
            <Header />
            <Filter
                handleSearch={handleSearch}
                handleFilterAgent={handleFilterAgent}
                handleSort={handleSort}
                handleOrder={handleOrder}
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
        </PaymentContainer>
    );
};

export default PaymentRules;
