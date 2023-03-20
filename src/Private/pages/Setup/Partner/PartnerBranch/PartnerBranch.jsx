import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
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
import Filter from "./../components/Filter";
import { Delete } from "./../../../../../App/components";
import { CountryName } from "./../../../../../App/helpers";
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

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",
    color: theme.palette.secondary.contrastText,
    borderColor: theme.palette.border.main,
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: theme.palette.border.dark,
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    color: theme.palette.border.dark,
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "name",
    order_by: "ASC",
};

const PartnerBranch = (props) => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: BranchData, loading: g_loading } = useSelector(
        (state) => state.get_all_branch_by_partner
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_branch
    );
    const { success: a_success } = useSelector((state) => state.add_branch);
    const { success: u_success } = useSelector((state) => state.update_branch);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_all_branch_by_partner(id, filterSchema));
        }
        dispatch({ type: "ADD_AGENT_BRANCH_RESET" });
        dispatch({ type: "UPDATE_AGENT_BRANCH_RESET" });
        dispatch({ type: "DELETE_AGENT_BRANCH_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 40,
            },
            {
                Header: "Branch Name",
                accessor: "name",
                width: 160,
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
                        <Typography>Type/Code</Typography>
                    </Box>
                ),
                accessor: "branch_type",
                width: 120,
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data.value : ""}
                        </StyledText>
                        <StyledText component="p" sx={{ opacity: 0.9 }}>
                            {data?.row?.original?.short_code
                                ? data?.row?.original?.short_code
                                : "n/a"}
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
                width: 120,
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

    const sortData = [
        { key: "None", value: "" },
        { key: "Name", value: "name" },
        { key: "Partner", value: "Agent" },
        { key: "Country", value: "country" },
    ];
    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "name", name: "Branch Name", type: "default" },
        { key: "branch_type", name: "Branch Type", type: "default" },
        { key: "agent_id", name: "Agent", type: "default" },
        { key: "city", name: "City", type: "default" },
        { key: "country", name: "Country", type: "country" },
        { key: "phone_number", name: "Phone Number", type: "default" },
        { key: "email", name: "Email", type: "default" },
        {
            key: "external_branch_code",
            name: "External Branch Code",
            type: "default",
        },
        { key: "is_active", name: "Status", type: "boolean" },
        { key: "created_ts", name: "Created Date", type: "date" },
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
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
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
        </>
    );
};

export default PartnerBranch;
