import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CableIcon from "@mui/icons-material/Cable";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import AddPartnerBank from "./components/AddPartnerBank";
import Table, { TablePagination } from "./../../../../App/components/Table";
import {
    CountryName,
    CurrencyName,
    ReferenceName,
} from "./../../../../App/helpers";
import Unmap from "../../../../App/components/Dialog/Unmap";
import PartnerActions from "./../Partner/store/actions";

const PartnerBankContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
}));

const MapWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    color: "border.main",
}));

const filter = {
    page_number: 1,
    page_size: 100,
    agent_type: "PAY",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

const PartnerBank = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 15,
        agent_id: "",
        search: "",
        sort_by: "bank_name",
        order_by: "DESC",
    });

    const { response: partnerbank_data, loading: g_loading } = useSelector(
        (state) => state.get_all_partner_bank
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_partner_bank
    );
    const { loading: un_loading, success: un_success } = useSelector(
        (state) => state.unmapp_partner_bank
    );
    const { success: a_success } = useSelector(
        (state) => state.create_partner_bank
    );
    const { success: u_success } = useSelector(
        (state) => state.update_partner_bank
    );

    React.useEffect(() => {
        dispatch(PartnerActions.get_payout_partner(filter));
    }, [dispatch, a_success, u_success]);

    useEffect(() => {
        dispatch(actions.get_all_partner_bank(filterSchema));
        dispatch({ type: "UPDATE_PARTNER_BANK_RESET" });
        dispatch({ type: "CREATE_PARTNER_BANK_RESET" });
        dispatch({ type: "DELETE_PARTNER_BANK_RESET" });
        dispatch({ type: "MAP_PARTNER_BANK_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success, un_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "partner_bank_id",
                maxWidth: 60,
            },
            {
                Header: "Bank Name",
                accessor: "bank_name",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Ex. Bank Code</Typography>
                    </Box>
                ),
                accessor: "external_bank_code",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data.value : "n/a"}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Payment Type</Typography>
                    </Box>
                ),
                accessor: "payment_type",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data?.value
                                ? ReferenceName(1, data?.value)
                                : "N/A"}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: "Country/Currency",
                accessor: "country",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? CountryName(data.value) : ""}
                        </StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {data?.row?.original?.currency
                                ? CurrencyName(data?.row?.original?.currency)
                                : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Map Status</Typography>
                    </Box>
                ),
                accessor: "is_mapped",
                Cell: (data) => (
                    <MapWrapper textAlign="center" sx={{}}>
                        {data.value ? (
                            <Tooltip title="Mapped" arrow>
                                <CheckCircleOutlineIcon
                                    sx={{ color: "success.main" }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Not Mapped" arrow>
                                <RemoveCircleOutlineIcon
                                    sx={{ color: "border.main" }}
                                />
                            </Tooltip>
                        )}
                    </MapWrapper>
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
                                    title="Hide Partner Bank Details"
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
                                    title="Show Partner Bank Details"
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
                        <AddPartnerBank
                            update={true}
                            update_data={row?.original}
                        />
                        {row?.original?.is_mapped ? (
                            <Unmap
                                success={un_success}
                                id={row.original.tid}
                                handleMapUnmap={handleUnmap}
                                loading={un_loading}
                                title="Do you want to unmap this partner bank?"
                                information="You have to remap after unmapping this. Make sure before
                                unmapping."
                            />
                        ) : (
                            <Tooltip title="Map Partner Bank" arrow>
                                <IconButton
                                    onClick={() =>
                                        navigate(
                                            `/setup/partner-bank/map/${row?.original?.payment_type}/${row?.original?.country}/${row?.original?.currency}/${row?.original?.tid}`
                                        )
                                    }
                                >
                                    <CableIcon
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
                    </Box>
                ),
            },
        ],
        [un_success]
    );

    const sub_columns = [
        { key: "partner_bank_id", name: "Id" },
        { key: "agent_id", name: "Payout Agent" },
        { key: "country", name: "Country" },
        { key: "currency", name: "Currency" },
        { key: "payment_type", name: "Payment Type" },
        { key: "external_bank_code", name: "External Bank Code" },
        { key: "external_bank_code1", name: "External Bank Code 1" },
        { key: "external_bank_code2", name: "External Bank Code 2" },
        { key: "is_mapped", name: "Mapping Status" },
    ];

    const handleUnmap = useCallback((id) => {
        dispatch(actions.map_partner_bank(id, { payout_location_id: 0 }));
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

    const handleOrder = (e) => {
        const order = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleSort = (e) => {
        const sort = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: sort,
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
        dispatch(actions.delete_partner_bank(id));
    };

    const handleCloseDialog = () => {
        dispatch(PartnerActions.get_payout_partner(filter));
    };

    return (
        <PartnerBankContainer>
            <Header handleCloseDialog={handleCloseDialog} />
            <Filter
                state={filterSchema}
                handleSearch={handleSearch}
                handleFilterAgent={handleFilterAgent}
                handleOrder={handleOrder}
                handleSort={handleSort}
            />
            <Table
                columns={columns}
                handleDelete={handleDelete}
                title="Partner Bank Details"
                data={partnerbank_data?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={partnerbank_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PartnerBankContainer>
    );
};

export default PartnerBank;
