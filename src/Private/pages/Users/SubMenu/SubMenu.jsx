import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "./store/actions";
import Header from "./components/Header";
import AddSubMenu from "./components/AddSubMenu";
import { Delete } from "./../../../../App/components";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../App/components/Table";

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

const SubMenu = () => {
    const dispatch = useDispatch();
    const { id, name } = useParams();
    const [filterSchema, setFilterSchema] = useState({
        page_number: 1,
        page_size: 5,
    });
    const { response: menu_data, loading: g_loading } = useSelector(
        (state) => state.get_all_sub_menu
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_sub_menu
    );
    const { success: a_success } = useSelector((state) => state.add_sub_menu);
    const { success: u_success } = useSelector(
        (state) => state.update_sub_menu
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_all_sub_menu(id, filterSchema));
        }
        dispatch({ type: "ADD_SUB_MENU_RESET" });
        dispatch({ type: "UPDATE_SUB_MENU_RESET" });
        dispatch({ type: "DELETE_SUB_MENU_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "menu_id",
                maxWidth: 80,
            },
            {
                Header: "Title",
                accessor: "sub_title",
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
                    <Box textAlign="center">
                        <Typography>Order</Typography>
                    </Box>
                ),
                accessor: "menu_order",
                Cell: (data) => (
                    <Box textAlign="center">
                        <StyledText component="p">{data.value}</StyledText>
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
                                <Tooltip title="Hide Account Details" arrow>
                                    <IconButton>
                                        <VisibilityOffOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Show Account Details" arrow>
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
                        <AddSubMenu update={true} update_data={row?.original} />
                        <Delete
                            parent_id={row.original.parent_id}
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            loading={d_loading}
                            tooltext="Delete"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sub_columns = [
        { key: "menu_id", name: "Id" },
        { key: "sub_title", name: "Name" },
        { key: "menu_order", name: "Menu Order" },
        { key: "is_active", name: "Status" },
    ];

    const handleStatus = useCallback((is_active, sub_id, parent_id) => {
        dispatch(
            actions.update_sub_menu_status(sub_id, parent_id, {
                is_active: is_active,
            })
        );
    }, []);

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

    const handleDelete = (sub_id, id) => {
        dispatch(actions.delete_sub_menu(sub_id, id));
    };

    return (
        <MenuContainer>
            <Header name={name} />
            <Table
                columns={columns}
                title="Sub Menu"
                data={menu_data?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={5}
                renderPagination={() => (
                    <TablePagination
                        paginationData={menu_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default SubMenu;
