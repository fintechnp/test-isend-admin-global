import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tooltip, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MuiIconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "../store/actions";
import Header from "./../components/Header";
import { Delete } from "./../../../../../App/components";
import { CountryName, CurrencyName } from "./../../../../../App/helpers";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../../App/components/Table";

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

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
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
    search: "",
    sort_by: "",
    order_by: "ASC",
};

const PartnerBranch = () => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: BranchData, loading: g_loading } = useSelector(
        (state) => state.get_all_branch_by_partner
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
            dispatch(actions.get_all_branch_by_partner(id, filterSchema));
        }
        dispatch({ type: "ADD_CORRIDOR_RESET" });
        dispatch({ type: "UPDATE_CORRIDOR_RESET" });
        dispatch({ type: "DELETE_CORRIDOR_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Branch Name",
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
                            {data.value ? data.value : ""}
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
                accessor: "branch_type",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data.value : ""}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Short Code</Typography>
                    </Box>
                ),
                accessor: "short_code",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p" sx={{ opacity: 0.9 }}>
                            {data.value ? data.value : "n/a"}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Time</Typography>
                    </Box>
                ),
                accessor: "start_time",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data.value : "n/a"}
                        </StyledText>
                        <StyledText component="p" sx={{ opacity: 0.9 }}>
                            {data?.row?.original?.end_time
                                ? data?.row?.original?.end_time
                                : ""}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Address</Typography>
                    </Box>
                ),
                accessor: "city",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data.value : "n/a"}
                        </StyledText>
                        <StyledText component="p">
                            {data?.row?.original?.country
                                ? CountryName(data?.row?.original?.country)
                                : ""}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Contact</Typography>
                    </Box>
                ),
                accessor: "phone_number",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data?.value : ""}
                        </StyledText>
                        <StyledText component="p" sx={{ opacity: 0.9 }}>
                            {data?.row?.original?.email
                                ? data?.row?.original?.email
                                : ""}
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
                                <Tooltip title="Hide Branch Details" arrow>
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
                                <Tooltip title="Show Branch Details" arrow>
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
                        <Tooltip title="Edit Branch" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/setup/partner/branch/update/${id}/${row?.original?.tid}`
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

    const sub_columns = [
        { key: "tid", name: "Id" },
        { key: "name", name: "Branch Name" },
        { key: "branch_type", name: "Branch Type" },
        { key: "agent_id", name: "Agent" },
        { key: "city", name: "City" },
        { key: "country", name: "Country" },
        { key: "phone_number", name: "Phone Number" },
        { key: "email", name: "Email" },
        { key: "external_branch_code", name: "External Branch Code" },
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

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_branch_status(id, { is_active: is_active }));
    }, []);

    //Add branch
    const handleAdd = () => {
        navigate(`/setup/partner/branch/add/${id}`);
    };

    const handleDelete = (id) => {
        dispatch(actions.delete_branch(id));
    };

    return (
        <MenuContainer>
            <Header title={`Branch List of ${name}`}>
                <AddButton
                    size="small"
                    variant="outlined"
                    onClick={handleAdd}
                    endIcon={<AddIcon />}
                >
                    Add Branch
                </AddButton>
            </Header>
            <Table
                columns={columns}
                title="Branch Details"
                data={BranchData?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={BranchData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default PartnerBranch;
