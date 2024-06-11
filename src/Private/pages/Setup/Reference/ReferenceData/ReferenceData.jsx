import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import AddReferenceData from "./../components/AddReferenceData";
import Table, { TablePagination } from "./../../../../../App/components/Table";
import { Delete } from "../../../../../App/components";
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
    search: "",
    sort_by: "name",
    order_by: "DESC",
};

const ReferenceData = (props) => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: referenceData, loading: g_loading } = useSelector((state) => state.get_reference_data);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_reference_data);
    const { success: a_success } = useSelector((state) => state.add_reference_data);
    const { success: u_success } = useSelector((state) => state.update_reference_data);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_reference_data(id, filterSchema));
        }
        dispatch({ type: "ADD_REFERENCE_DATA_RESET" });
        dispatch({ type: "UPDATE_REFERENCE_DATA_RESET" });
        dispatch({ type: "DELETE_REFERENCE_DATA_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(() => [
        {
            Header: "SN",
            accessor: "f_serial_no",
            maxWidth: 60,
        },
        {
            Header: "ID",
            accessor: "reference_id",
            maxWidth: 60,
        },
        {
            Header: "Name",
            accessor: "name",
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
                    <Typography>Value</Typography>
                </Box>
            ),
            accessor: "value",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value ? data.value : "n/a"}</StyledText>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Description</Typography>
                </Box>
            ),
            accessor: "description",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value ? data.value : "n/a"}</StyledText>
                </Box>
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
                    <HasPermission permission={permissions.EDIT_REFERENCE_DATA}>
                        <AddReferenceData update={true} update_data={row?.original} />
                    </HasPermission>
                    <HasPermission permission={permissions.DELETE_REFERENCE_DATA}>
                        <Delete
                            handleDelete={handleDelete}
                            d_loading={d_loading}
                            id={row.original?.tid}
                            tooltext="Delete Reference Data"
                        />
                    </HasPermission>
                </Box>
            ),
        },
    ]);

    const sub_columns = [
        { key: "reference_type_id", name: "Id", type: "default" },
        { key: "type_name", name: "Type Name", type: "default" },
        { key: "name", name: "Name", type: "default" },
        { key: "description", name: "Description", type: "defautl" },
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
        [filterSchema],
    );

    const handleOrder = (e) => {
        const order = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleSortBy = (e) => {
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
        dispatch(actions.delete_reference_data(d_id));
    };

    return (
        <>
            <Helmet>
                <title>BNB Admin | {props.title}</title>
            </Helmet>
            <MenuContainer>
                <Header title="Reference Data" type={false} id={id} name={name} />
                <Filter
                    type={false}
                    state={filterSchema}
                    handleSearch={handleSearch}
                    handleOrder={handleOrder}
                    handleSortBy={handleSortBy}
                />
                <Table
                    columns={columns}
                    title="Reference Data Details"
                    data={referenceData?.data || []}
                    sub_columns={sub_columns}
                    loading={g_loading}
                    rowsPerPage={8}
                    renderPagination={() => (
                        <TablePagination
                            paginationData={referenceData?.pagination}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                />
            </MenuContainer>
        </>
    );
};

export default withPermission({ permission: [permissions.READ_REFERENCE_DATA] })(ReferenceData);
