import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Switch, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "../store/actions";
import Header from "../components/Header";
import Filter from "../components/Filter";
import { Delete } from "./../../../../../App/components";
import Table, { TablePagination } from "./../../../../../App/components/Table";

const MenuContainer = styled("div")(({ theme }) => ({
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
    fontSize: "15px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    country: "",
    currency: "",
    agent_type: "",
    search: "",
    sort_by: "country",
    order_by: "ASC",
};

const Corridor = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: corridor_data, loading: g_loading } = useSelector(
        (state) => state.get_all_corridor
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_corridor
    );
    const { success: a_success } = useSelector((state) => state.add_partner);
    const { success: u_success } = useSelector((state) => state.update_partner);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_all_corridor(id, filterSchema));
        }
        dispatch({ type: "ADD_MENU_RESET" });
        dispatch({ type: "UPDATE_MENU_RESET" });
        dispatch({ type: "DELETE_MENU_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "agent_id",
            maxWidth: 70,
        },
        {
            Header: "Partner Name",
            accessor: "name",
            width: 280,
            maxWidth: 500,
            Cell: (data) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                        {data.value}
                    </StyledName>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Type</Typography>
                </Box>
            ),
            accessor: "agent_type",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Country</Typography>
                </Box>
            ),
            accessor: "country",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
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
            Cell: (data) => (
                <SwitchWrapper textAlign="center" sx={{}}>
                    <Switch
                        defaultChecked={data?.value}
                        size="small"
                        onChange={(event) =>
                            handleStatus(
                                event.target.checked,
                                data?.row?.original?.id
                            )
                        }
                    />
                </SwitchWrapper>
            ),
        },
        {
            Header: "",
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
                            <Tooltip title="Hide Corridor Details" arrow>
                                <IconButton>
                                    <VisibilityOffOutlinedIcon
                                        sx={{
                                            fontSize: "20px",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Show Corridor Details" arrow>
                                <IconButton>
                                    <RemoveRedEyeOutlinedIcon
                                        sx={{
                                            fontSize: "20px",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                    </span>
                    <Tooltip title="Edit Corridor" arrow>
                        <IconButton
                            onClick={() =>
                                navigate(
                                    `/setup/partner/corridor/update/${row.original.agent_id}`
                                )
                            }
                        >
                            <EditOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Delete tooltext="Delete Corridor" />
                </Box>
            ),
        },
    ]);

    const sub_columns = [
        { key: "delivery_option_id", name: "Id" },
        { key: "delivery_name", name: "Name" },
        { key: "payout_agent", name: "Payout Agent" },
        { key: "country_code", name: "Country" },
        { key: "currency_code", name: "Currency" },
        { key: "agent_type", name: "Payment Type" },
        { key: "is_active", name: "Status" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        // dispatch(actions.update_user_status({ is_active: is_active }, id));
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

    const handleCountry = (e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            country: country,
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

    const handleAgentType = (e) => {
        const payment = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            agent_type: payment,
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
        dispatch(actions.delete_corridor(id));
    };

    return (
        <MenuContainer>
            <Header title="Corridor List" buttonText="Add Corridor" />
            <Filter
                handleSearch={handleSearch}
                handleCountry={handleCountry}
                handleOrder={handleOrder}
                handleAgentType={handleAgentType}
            />
            <Table
                columns={columns}
                title="Corridor Details"
                data={corridor_data?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={corridor_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default Corridor;
