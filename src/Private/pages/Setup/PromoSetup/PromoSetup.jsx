import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import {
    CountryName,
    CurrencyName,
    ReferenceName,
} from "./../../../../App/helpers";
import AddPromoSetup from "./components/AddPromoSetup";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../App/components/Table";
import { useNavigate } from "react-router-dom";

const MenuContainer = styled("div")(({ theme }) => ({
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
    color: theme.palette.secondary.contrastText,
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const PromoSetup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: PromoSetData, loading: g_loading } = useSelector(
        (state) => state.get_promo_setup
    );
    const { success: a_success } = useSelector(
        (state) => state.add_promo_setup
    );
    const { success: u_success } = useSelector(
        (state) => state.update_promo_setup
    );

    const { success: d_success } = useSelector(
        (state) => state.delete_promo_setup
    );

    useEffect(() => {
        dispatch(actions.get_promo_setup(filterSchema));
    }, [dispatch, filterSchema, a_success, u_success, d_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "promo_id",
                maxWidth: 40,
            },
            {
                Header: "Name",
                accessor: "name",
                minWidth: 160,
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
                        <Typography>Sending Partner</Typography>
                    </Box>
                ),
                minWidth: 160,
                accessor: "sending_agent_id",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data.value : "n/a"}
                        </StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {data?.row?.original?.payment_type
                                ? ReferenceName(
                                      1,
                                      data?.row?.original?.payment_type
                                  )
                                : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Country</Typography>
                    </Box>
                ),
                accessor: "payout_country",
                width: 130,
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? CountryName(data.value) : "N/A"}
                        </StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {data?.row?.original?.payout_currency
                                ? CurrencyName(
                                      data?.row?.original?.payout_currency
                                  )
                                : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography>Discount(%)</Typography>
                    </Box>
                ),
                accessor: "fee_discount",
                width: 120,
                Cell: (data) => (
                    <Box>
                        <StyledText component="p" sx={{ textAlign: "right" }}>
                            {data.value ? data.value : "n/a"}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography>Premium Rate</Typography>
                    </Box>
                ),
                accessor: "premium_rate",
                width: 125,
                Cell: (data) => (
                    <Box>
                        <StyledText component="p" sx={{ textAlign: "right" }}>
                            {data.value ? data.value : "n/a"}
                        </StyledText>
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
                width: 120,
                Cell: (data) => (
                    <SwitchWrapper textAlign="right" sx={{}}>
                        <TableSwitch
                            value={data?.value}
                            data={data.row.original}
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
                                <Tooltip title="Hide Promo Setup Details" arrow>
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
                                <Tooltip title="Show Promo Setup Details" arrow>
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
                        <AddPromoSetup
                            update={true}
                            update_data={row?.original}
                        />
                        <Tooltip title="Show Promo Codes" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/setup/promo-code/${row?.original?.name}/${row?.original?.promo_id}`
                                    )
                                }
                            >
                                <SubdirectoryArrowLeftIcon
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
        []
    );

    const sortData = [
        { key: "None", value: "" },
        { key: "Latest", value: "created_ts" },
        { key: "Name", value: "name" },
        { key: "Fee Discount", value: "fee_discount" },
        { key: "Premium Rate", value: "premium_rate" },
    ];
    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const sub_columns = [
        { key: "promo_id", name: "Id" },
        { key: "name", name: "Name" },
        { key: "sending_agent_id", name: "Payout Agent" },
        { key: "payout_country", name: "Payout Country" },
        { key: "fee_discount", name: "Fee Discount" },
        { key: "premium_rate", name: "Premium Rate" },
        { key: "payment_type", name: "Payment Type" },
        { key: "is_active", name: "Status" },
        { key: "created_ts", name: "Created At" },
    ];

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

    const handleSort = (e) => {
        const sort = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: sort,
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
        dispatch(actions.delete_promo_setup(id));
    };

    const handleStatus = useCallback((is_active, id) => {
        dispatch(
            actions.update_promo_setup_status(id, { is_active: is_active })
        );
    }, []);

    return (
        <MenuContainer>
            <Header title="Promo Setup">
                <AddPromoSetup />
            </Header>
            <Filter
                state={filterSchema}
                sortData={sortData}
                orderData={orderData}
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
            />
            <Table
                columns={columns}
                handleDelete={handleDelete}
                title="Promo Setup Details"
                data={PromoSetData?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                totalPage={PromoSetData?.pagination?.totalPage || 1}
                renderPagination={() => (
                    <TablePagination
                        paginationData={PromoSetData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default PromoSetup;
