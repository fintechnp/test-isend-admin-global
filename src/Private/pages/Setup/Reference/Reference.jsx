import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Switch, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SubdirectoryArrowLeftIcon from "@mui/icons-material/SubdirectoryArrowLeft";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import AddReference from "./components/AddReference";
import Table, { TablePagination } from "./../../../../App/components/Table";

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
    search: "",
    sort_by: "type_name",
    order_by: "ASC",
};

const Reference = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: referenceTypeData, loading: g_loading } = useSelector(
        (state) => state.get_all_reference
    );
    const { success: a_success } = useSelector((state) => state.add_reference);
    const { success: u_success } = useSelector(
        (state) => state.update_reference
    );

    useEffect(() => {
        dispatch(actions.get_all_reference(filterSchema));
    }, [dispatch, filterSchema]);

    useEffect(() => {
        dispatch(actions.get_all_reference(initialState));
        dispatch({ type: "ADD_REFERENCE_RESET" });
        dispatch({ type: "UPDATE_REFERENCE_RESET" });
    }, [dispatch, a_success, u_success]);

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "reference_type_id",
            maxWidth: 60,
        },
        {
            Header: "Name",
            accessor: "type_name",
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
                    <Typography>Description</Typography>
                </Box>
            ),
            accessor: "description",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
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
                    <AddReference update={true} update_data={row?.original} />
                    <Tooltip title="Show Sub Data" arrow>
                        <IconButton
                            onClick={() =>
                                navigate(
                                    `/setup/reference/data/${row?.original?.type_name}/${row?.original?.reference_type_id}`
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
    ]);

    const sub_columns = [
        { key: "reference_type_id", name: "Id" },
        { key: "type_name", name: "Type Name" },
        { key: "description", name: "Description" },
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

    return (
        <MenuContainer>
            <Header title="All Reference Type" type={true} />
            <Filter
                type={true}
                handleSearch={handleSearch}
                handleOrder={handleOrder}
                handleSortBy={handleSortBy}
            />
            <Table
                columns={columns}
                title="Reference Type Details"
                data={referenceTypeData?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={referenceTypeData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default Reference;
