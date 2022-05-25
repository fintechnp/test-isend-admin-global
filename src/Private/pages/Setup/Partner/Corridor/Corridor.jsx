import React, { useState, useEffect, useMemo } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import Header from "./Header";
import AddCorridor from "./AddCorridor";
import actions from "../store/actions";
import { CountryName, CurrencyName } from "./../../../../../App/helpers";
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
    color: theme.palette.border.dark,
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: theme.palette.border.dark,
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
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
    order_by: "ASC",
};

const Corridor = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: corridor_data, loading: g_loading } = useSelector(
        (state) => state.get_all_corridor
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_corridor
    );
    const { success: a_success } = useSelector((state) => state.add_corridor);
    const { success: u_success } = useSelector(
        (state) => state.update_corridor
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_partner_details(id));
        }
    }, [dispatch]);

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
                Header: "Partner Name",
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
                        <StyledText component="p">
                            {CountryName(data.value)}
                        </StyledText>
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
                        <StyledText component="p">
                            {CurrencyName(data.value)}
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
                        <AddCorridor
                            update={true}
                            update_data={row?.original}
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sub_columns = [
        { key: "tid", name: "Id" },
        { key: "name", name: "Name" },
        { key: "agent_type", name: "Agent Type" },
        { key: "agent_id", name: "Agent" },
        { key: "country", name: "Country" },
        { key: "transaction_currency", name: "Currency" },
        { key: "is_active", name: "Status" },
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

    return (
        <MenuContainer>
            <Header />
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
