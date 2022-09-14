import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { reset } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Tooltip, Button, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import { Delete } from "./../../../../App/components";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../App/components/Table";
import { CountryName } from "./../../../../App/helpers";

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
    color: theme.palette.border.main,
    "&: hover": { color: theme.palette.border.dark, opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: theme.palette.border.dark,
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: "15px",
    color: theme.palette.border.dark,
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    country: "",
    currency: "",
    agent_type: "",
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const Partner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: partner_data, loading: g_loading } = useSelector(
        (state) => state.get_all_partner
    );
    const { success: d_success, loading: d_loading } = useSelector(
        (state) => state.delete_partner
    );

    useEffect(() => {
        dispatch(actions.get_all_partner(filterSchema));
        dispatch({ type: "DELETE_PARTNER_RESET" });
        dispatch({ type: "ADD_PARTNER_RESET" });
        dispatch({ type: "UPDATE_PARTNER_RESET" });
        dispatch(reset("update_partner_form"));
    }, [dispatch, filterSchema, d_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 70,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link
                                to={`/setup/partner/details/${data?.row.original.agent_id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "border.dark",
                                }}
                            >
                                {data.value ? data.value : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
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
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            <Link
                                to={`/setup/partner/details/${data?.row.original.agent_id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "border.dark",
                                }}
                            >
                                {data.value ? data.value : "N/A"}
                            </Link>
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
                        <StyledText component="p">
                            {data.value ? data.value : "N/A"}
                        </StyledText>
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
                        <StyledText component="p">
                            {data.value ? CountryName(data.value) : "N/A"}
                        </StyledText>
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
                        <Tooltip title="Branch" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/setup/partner/branch/${row.original.name}/${row.original.agent_id}`
                                    )
                                }
                            >
                                <AltRouteIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="See Corridor" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/setup/partner/corridor/${row.original.name}/${row.original.agent_id}`
                                    )
                                }
                            >
                                <ShuffleIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Partner" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/setup/partner/update/${row.original.agent_id}`
                                    )
                                }
                            >
                                <EditOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Delete
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            loading={d_loading}
                            tooltext="Remove Partner"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_partner_status(id, { is_active: is_active }));
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

    //Add Partner
    const handleAdd = () => {
        navigate("/setup/partner/create");
    };

    const handleDelete = (id) => {
        dispatch(actions.delete_partner(id));
    };

    return (
        <MenuContainer>
            <Header title="Our Partner List">
                <AddButton
                    size="small"
                    variant="outlined"
                    onClick={handleAdd}
                    endIcon={<AddIcon />}
                >
                    Add Partner
                </AddButton>
            </Header>
            <Filter
                orderData={orderData}
                state={filterSchema}
                handleSearch={handleSearch}
                handleCountry={handleCountry}
                handleOrder={handleOrder}
                handleAgentType={handleAgentType}
            />
            <Table
                columns={columns}
                data={partner_data?.data || []}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={partner_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default Partner;
