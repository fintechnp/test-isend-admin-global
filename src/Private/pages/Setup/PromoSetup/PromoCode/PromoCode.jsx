import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import AddPromoCode from "./AddPromoCode";
import { FormatDate } from "./../../../../../App/helpers";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../../App/components/Table";
import { Delete } from "../../../../../App/components";

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
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};
const PromoCode = (props) => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: PromoCodeData, loading: g_loading } = useSelector(
        (state) => state.get_promo_code
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_promo_code
    );
    const { loading: i_loading, success: i_success } = useSelector(
        (state) => state.import_promo_code
    );
    const { success: a_success } = useSelector((state) => state.add_promo_code);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_promo_code(id, filterSchema));
        }
        dispatch({ type: "ADD_PROMO_CODE_RESET" });
        dispatch({ type: "PROMO_CODE_IMPORT_RESET" });
        dispatch({ type: "DELETE_PROMO_CODE_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, i_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 60,
            },
            {
                Header: "Code",
                accessor: "code",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value ? data.value : ""}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Ex. Date</Typography>
                    </Box>
                ),
                accessor: "expiry_date",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? FormatDate(data.value) : ""}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Multiple</Typography>
                    </Box>
                ),
                accessor: "multiple_use",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {data.value ? (
                            <Tooltip title="Multiple Use" arrow>
                                <CheckCircleOutlineIcon
                                    sx={{ color: "success.main" }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="No Multiple Use" arrow>
                                <RemoveCircleOutlineIcon
                                    sx={{ color: "border.main" }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                width: 120,
                Cell: (data) => (
                    <SwitchWrapper textAlign="center" sx={{}}>
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
                                <Tooltip title="Hide Details" arrow>
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
                                <Tooltip title="Show Details" arrow>
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
                        <Delete
                            handleDelete={handleDelete}
                            d_loading={d_loading}
                            id={row.original?.tid}
                            tooltext="Delete Promo Code"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sortData = [
        { key: "None", value: "" },
        { key: "Latest", value: "created_ts" },
        { key: "Customer", value: "customer_id" },
        { key: "Expiry Date", value: "expiry_date" },
    ];
    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const sub_columns = [
        { name: "Id", key: "code_id" },
        { name: "Code", key: "code" },
        { name: "Customer Id", key: "customer_id" },
        { name: "Status", key: "is_active" },
        { name: "Multiple Use", key: "multiple_use" },
        { name: "Created By", key: "created_by" },
        { name: "Created Date", key: "created_ts" },
        { name: "Expiry Date", key: "expiry_date" },
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

    const handleDelete = (d_id) => {
        dispatch(actions.delete_promo_code(id, d_id));
    };

    const handleStatus = useCallback((is_active, id, p_id, promo_id) => {
        dispatch(
            actions.update_promo_code_status(id, promo_id, {
                is_active: is_active,
            })
        );
    }, []);

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <MenuContainer>
                <Header
                    title="Promo Code"
                    id={id}
                    name={name}
                    loading={i_loading}
                >
                    <AddPromoCode promo_id={id} />
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
                    title="Promo Code Details"
                    data={PromoCodeData?.data || []}
                    sub_columns={sub_columns}
                    loading={g_loading}
                    rowsPerPage={8}
                    renderPagination={() => (
                        <TablePagination
                            paginationData={PromoCodeData?.pagination}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                />
            </MenuContainer>
        </>
    );
};

export default PromoCode;
