import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Release } from "App/components";
import Spacer from "App/components/Spacer/Spacer";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import SendingCountryTabs from "Private/components/shared/SendingCountryTabs";

import app from "App/config/app";
import actions from "./../store/actions";
import ucfirst from "App/helpers/ucfirst";
import Filter from "./../components/Filter";
import { CurrencyName, FormatDate, FormatNumber } from "App/helpers";

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
    send_country: app.defaultSendingCountry,
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
    sort_by: "",
    order_by: "DESC",
};

const AmlSuspicious = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: amlSuspicious, loading: l_loading } = useSelector((state) => state.get_aml_suspicious);
    const { success: u_success, loading: u_loading } = useSelector((state) => state.update_aml_suspicious);

    useEffect(() => {
        dispatch(actions.get_aml_suspicious(filterSchema));
        dispatch({ type: "RELEASE_AML_SUSPICIOUS_RESET" });
    }, [dispatch, filterSchema, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Name",
                accessor: "customer_name",
                maxWidth: 140,
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
                                fontSize: "14px",
                                textTransform: "capitalize",
                            }}
                        >
                            {data.value ? data.value : ""}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "12px",
                                opacity: 0.8,
                                textTransform: "capitalize",
                            }}
                        >
                            {data?.row?.original?.beneficiary_name ? data?.row?.original?.beneficiary_name : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "Partner/Payout Country",
                accessor: "agent_name",
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
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledName component="p" sx={{ paddingLeft: "4px", fontSize: "13px" }}>
                            {data?.row?.original?.payout_country_data
                                ? ucfirst(data?.row?.original?.payout_country_data.toLowerCase())
                                : data?.row?.original?.payout_country ?? "N/A"}{" "}
                        </StyledName>
                    </Box>
                ),
            },

            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Rate</Typography>
                    </Box>
                ),
                accessor: "payout_cost_rate",
                maxWidth: 80,
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? FormatNumber(data.value) : "N/A"}
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
                accessor: "transfer_amount",
                maxWidth: 80,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data?.row?.original?.collected_amount
                                ? FormatNumber(data?.row?.original?.collected_amount)
                                : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {data?.row?.original?.payout_amount
                                ? FormatNumber(data?.row?.original?.payout_amount)
                                : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Currency</Typography>
                    </Box>
                ),
                accessor: "collected_currency",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? CurrencyName(data.value) : ""}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.7 }}>
                            {data?.row?.original?.payout_currency
                                ? CurrencyName(data?.row?.original?.payout_currency)
                                : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Date</Typography>
                    </Box>
                ),
                accessor: "created_ts",
                Cell: (data) => (
                    <Box textAlign="center" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px", textAlign: "center" }}>
                            {data.value ? FormatDate(data.value) : ""}
                        </StyledName>
                    </Box>
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
                        <Tooltip title="Transactions Details" arrow>
                            <IconButton
                                onClick={() => navigate(`/transactions/details/aml-suspicious/${row.original.tid}`)}
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
                        <Release
                            destroyOnUnmount
                            enableReinitialize
                            onSubmit={(data) => handleRelease(row.original.tid, data)}
                            validatation={true}
                            tooltext="Release Transaction"
                            form={`aml_release_form_${row?.original?.tid}`}
                            reduxGlobalStateKey="update_aml_suspicious"
                        />
                    </Box>
                ),
            },
        ],
        [],
    );

    const handleSearch = useCallback(
        (e) => {
            const searchValue = e.target.value;
            const updatedFilterSchema = {
                ...filterSchema,
                search: searchValue,
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

    const handleRelease = (transactionId, data) => {
        dispatch(actions.update_aml_suspicious(transactionId, { remarks: data.remarks }));
    };

    const handleChangeTab = useCallback((countryIso3) => {
        setFilterSchema({
            ...filterSchema,
            send_country: countryIso3,
        });
    }, []);

    return (
        <PageContent title="AML Suspicious">
            <SendingCountryTabs value={filterSchema.send_country} onChange={handleChangeTab} isLoading={l_loading} />
            <Spacer />
            <Filter
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
                handleFilter={handleFilter}
            />
            <Table
                columns={columns}
                data={amlSuspicious?.data || []}
                loading={l_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={amlSuspicious?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default AmlSuspicious;
