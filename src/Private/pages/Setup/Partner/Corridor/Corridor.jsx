import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import Header from "./../components/Header";
import AddCorridor from "./AddCorridor";
import actions from "../store/actions";
import { Delete } from "./../../../../../App/components";
import { CountryName, CurrencyName } from "./../../../../../App/helpers";
import Table, { TablePagination } from "./../../../../../App/components/Table";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";

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
    color: theme.palette.border.dark,
    "&: hover": { color: "border.dark", opacity: 1 },
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

const UnBlocked = styled(Box)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    borderRadius: "6px",
    padding: "3px 12px",
    color: theme.palette.border.light,
    background: theme.palette.success.main,
    "&:hover": {
        background: theme.palette.success.main,
    },
}));

const Blocked = styled(Box)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    borderRadius: "6px",
    padding: "3px 12px",
    background: theme.palette.border.light,
    "&:hover": {
        background: theme.palette.border.light,
    },
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "name",
    order_by: "DESC",
};

const Corridor = (props) => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: corridor_data, loading: g_loading } = useSelector((state) => state.get_all_corridor);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_corridor);
    const { success: a_success } = useSelector((state) => state.add_corridor);
    const { success: u_success } = useSelector((state) => state.update_corridor);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_all_corridor(id, filterSchema));
        }
        dispatch({ type: "ADD_CORRIDOR_RESET" });
        dispatch({ type: "UPDATE_CORRIDOR_RESET" });
        dispatch({ type: "DELETE_CORRIDOR_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "agent_id",
                maxWidth: 50,
            },
            {
                Header: "Corridor Name",
                accessor: "name",
                width: 180,
                maxWidth: 280,
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
                        <Typography>Country</Typography>
                    </Box>
                ),
                accessor: "country",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">{data.value ? CountryName(data.value) : ""}</StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>T.Currency</Typography>
                    </Box>
                ),
                accessor: "transaction_currency",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">{data.value ? CurrencyName(data.value) : ""}</StyledText>
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
                        {data.value ? (
                            <Tooltip title="Unblocked" arrow>
                                <UnBlocked>Active</UnBlocked>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Blocked" arrow>
                                <Blocked>Blocked</Blocked>
                            </Tooltip>
                        )}
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
                                <Tooltip title="Hide Corridor Details" arrow>
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
                                <Tooltip title="Show Corridor Details" arrow>
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
                        <HasPermission permission={permissions.EDIT_PARTNER_CORRIDOR}>
                            <AddCorridor update={true} update_data={row?.original} />
                        </HasPermission>
                        <HasPermission permission={permissions.DELETE_PARTNER_CORRIDOR}>
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

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "name", name: "Name", type: "default" },
        { key: "short_code", name: "Short Code", type: "default" },
        { key: "agent_type", name: "Agent Type", type: "default" },
        { key: "parent_agent_id", name: "Agent", type: "default" },
        { key: "country", name: "Country", type: "country" },
        { key: "transaction_currency", name: "Currency", type: "currency" },
        { key: "is_active", name: "Status", type: "boolean" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

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
        <>
            <Helmet>
                <title>iSend | {props.title}</title>
            </Helmet>
            <MenuContainer>
                <Header title={`Corridor List of ${name}`}>
                    <HasPermission permission={permissions.CREATE_PARTNER_CORRIDOR}>
                        <AddCorridor />
                    </HasPermission>
                </Header>
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
        </>
    );
};

export default withPermission({ permission: [permissions.READ_PARTNER_CORRIDOR] })(Corridor);
