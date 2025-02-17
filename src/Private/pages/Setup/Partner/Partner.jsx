import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
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
import { Delete } from "App/components";
import Table, { TablePagination, TableSwitch } from "App/components/Table";
import { CountryName } from "App/helpers";
import PageContent from "App/components/Container/PageContent";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";
import useAuthUser from "Private/hooks/useAuthUser";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

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

    borderColor: theme.palette.border.main,
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

const Partner = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);
    const { can } = useAuthUser();

    const { response: partner_data, loading: g_loading } = useSelector((state) => state.get_all_partner);
    const { success: d_success, loading: d_loading } = useSelector((state) => state.delete_partner);

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
                header: "Id",
                accessorKey: "tid",
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
                                to={`/setup/partner/details/${row?.original?.agent_id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "border.dark",
                                }}
                            >
                                {row.original.tid ? row.original.tid : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Partner Name",
                accessorKey: "name",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            <Link
                                to={`/setup/partner/details/${row?.original?.agent_id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "border.dark",
                                }}
                            >
                                {row?.original?.name ? row?.original?.name : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box>
                        <Typography>Type</Typography>
                    </Box>
                ),
                accessorKey: "agent_type",
                cell: ({ row }) => (
                    <Box>
                        <StyledText component="p">{row?.original?.row ? row?.original?.row : "N/A"}</StyledText>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box>
                        <Typography>Country</Typography>
                    </Box>
                ),
                accessorKey: "country",
                cell: ({ row }) => (
                    <Box>
                        <StyledText component="p">
                            {row?.original?.country ? CountryName(row?.original?.country) : "N/A"}
                        </StyledText>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessorKey: "is_active",
                cell: ({ row }) => (
                    <>
                        {!can(permissions.EDIT_PARTNER) ? (
                            <SwitchWrapper textAlign="center" sx={{}}>
                                <TableSwitch
                                    value={row?.original?.is_active}
                                    data={row?.original}
                                    handleStatus={handleStatus}
                                />
                            </SwitchWrapper>
                        ) : (
                            <Typography align="center">{row.original.is_active ? "Active" : "Inactive"}</Typography>
                        )}
                    </>
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
                        <HasPermission permission={permissions.READ_PARTNER_BRANCH}>
                            <Tooltip title="Branch" arrow>
                                <IconButton
                                    onClick={() =>
                                        navigate(`/setup/partner/branch/${row.original.name}/${row.original.agent_id}`)
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
                        </HasPermission>
                        <HasPermission permission={permissions.READ_PARTNER_CORRIDOR}>
                            <Tooltip title="See Corridor" arrow>
                                <IconButton
                                    onClick={() =>
                                        navigate(
                                            `/setup/partner/corridor/${row.original.name}/${row.original.agent_id}`,
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
                        </HasPermission>
                        <HasPermission permission={permissions.EDIT_PARTNER}>
                            <Tooltip title="Edit Partner" arrow>
                                <IconButton onClick={() => navigate(`/setup/partner/update/${row.original.agent_id}`)}>
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
                        </HasPermission>
                        <HasPermission permission={permissions.DELETE_PARTNER}>
                            <Delete
                                id={row.original.tid}
                                handleDelete={handleDelete}
                                loading={d_loading}
                                tooltext="Remove Partner"
                            />
                        </HasPermission>
                    </Box>
                ),
            },
        ],
        [],
    );

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_partner_status(id, { is_active: is_active }));
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
        <PageContent breadcrumbs={[{ label: "Setup" }, { label: "Partner" }]}>
            {/* <Header title="Our Partner List">
                <HasPermission permission={permissions.CREATE_PARTNER}>
                    <AddButton size="small" variant="outlined" onClick={handleAdd} endIcon={<AddIcon />}>
                        Add Partner
                    </AddButton>
                </HasPermission>
            </Header> */}

            <PageContentContainer
                title="Partners"
                topRightContent={
                    <Filter
                        orderData={orderData}
                        state={filterSchema}
                        handleSearch={handleSearch}
                        handleCountry={handleCountry}
                        handleOrder={handleOrder}
                        handleAgentType={handleAgentType}
                    />
                }
            >
                <TanstackReactTable columns={columns} data={partner_data?.data || []} loading={g_loading} />
                <TablePagination
                    paginationData={partner_data?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </PageContentContainer>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_PARTNER] })(Partner);
