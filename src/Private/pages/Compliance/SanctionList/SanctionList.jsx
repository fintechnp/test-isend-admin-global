import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import AddSanction from "./components/AddSanction";
import Table, { TablePagination } from "./../../../../App/components/Table";
import {
    CountryName,
    FormatDate,
    ReferenceName,
} from "./../../../../App/helpers";
import { Delete } from "./../../../../App/components";

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

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "name",
    order_by: "DESC",
};

const SanctionList = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: sanctionList, loading: l_loading } = useSelector(
        (state) => state.get_sanction_list
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_sanction
    );
    const { success: a_success } = useSelector((state) => state.add_sanction);
    const { success: u_success } = useSelector(
        (state) => state.update_sanction
    );
    const { success: i_success, loading: i_loading } = useSelector(
        (state) => state.import_sanction
    );

    useEffect(() => {
        dispatch(actions.get_sanction_list(filterSchema));
        dispatch({ type: "ADD_SANCTION_RESET" });
        dispatch({ type: "UPDATE_SANCTION_RESET" });
        dispatch({ type: "DELETE_SANCTION_RESET" });
        dispatch({ type: "IMPORT_SANCTION_LIST_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success, i_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Name",
                accessor: "name",
                maxWidth: 140,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data.value}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            {ReferenceName(37, data?.row?.original?.type)}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "Address",
                accessor: "country",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                            }}
                        >
                            {CountryName(data.value)}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{ paddingLeft: "2px", opacity: 0.7 }}
                        >
                            {data?.row?.original?.address}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>DOB</Typography>
                    </Box>
                ),
                accessor: "dob",
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {FormatDate(data.value)}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Source</Typography>
                    </Box>
                ),
                accessor: "source",
                maxWidth: 90,
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value}
                        </StyledName>
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
                                <Tooltip title="Hide Sanction Details" arrow>
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
                                <Tooltip title="Show Sanction Details" arrow>
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
                        <AddSanction
                            update={true}
                            update_data={row?.original}
                        />
                        <Delete
                            id={row?.original.tid}
                            handleDelete={handleDelete}
                            loading={d_loading}
                            tooltext="Delete Sanction"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sub_columns = [
        { key: "tid", name: "Id" },
        { key: "type", name: "Type" },
        { key: "name", name: "Name" },
        { key: "address", name: "Address" },
        { key: "country", name: "Country" },
        { key: "dob", name: "DOB" },
        { key: "source", name: "Source" },
        { key: "amount", name: "Amount" },
        { key: "remarks", name: "Remarks" },
        { key: "ref1", name: "Ref 1" },
        { key: "ref2", name: "Ref 2" },
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
        const type = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: type,
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

    const handleDelete = (id) => {
        dispatch(actions.delete_sanction(id));
    };

    return (
        <MenuContainer>
            <Header loading={i_loading} />
            <Filter
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
            />
            <Table
                columns={columns}
                title="Payment Rules"
                data={sanctionList?.data || []}
                sub_columns={sub_columns}
                loading={l_loading}
                rowsPerPage={8}
                handleDelete={handleDelete}
                renderPagination={() => (
                    <TablePagination
                        paginationData={sanctionList?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default SanctionList;
