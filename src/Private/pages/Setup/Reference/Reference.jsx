import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import AddReference from "./components/AddReference";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import Column from "App/components/Column/Column";
import { permissions } from "Private/data/permissions";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import ViewReferenceType from "./components/ViewReferenceType";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

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
    order_by: "DESC",
};

const Reference = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: referenceTypeData, loading: g_loading } = useSelector((state) => state.get_all_reference);
    const { success: a_success } = useSelector((state) => state.add_reference);
    const { success: u_success } = useSelector((state) => state.update_reference);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onQuickFilter,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onRowsPerPageChange,
        filterSchema,
        reset,
    } = useListFilterStore({ initialState });

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
            header: "S.N.",
            accessorKey: "f_serial_no",
        },
        {
            header: "Type ID",
            accessorKey: "reference_type_id",
        },
        {
            header: "Name",
            accessorKey: "type_name",
            cell: ({ row }) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                        {row?.original?.type_name ? row?.original?.type_name : "n/a"}
                    </StyledName>
                </Box>
            ),
        },
        {
            header: () => (
                <Box>
                    <Typography>Description</Typography>
                </Box>
            ),
            accessorKey: "description",
            cell: ({ row }) => (
                <Box>
                    <StyledText component="p">
                        {row?.original?.description ? row?.original?.description : "n/a"}
                    </StyledText>
                </Box>
            ),
        },
        {
            header: "Actions",
            accessorKey: "show",
            cell: ({ row }) => (
                <PopoverButton>
                    {({ onClose }) => (
                        <>
                            <ViewReferenceType data={row?.original} onClose={onClose} />
                            <HasPermission permission={permissions.EDIT_REFERENCE_TYPE}>
                                <AddReference update={true} update_data={row?.original} enablePopoverAction={true} />
                            </HasPermission>
                            <HasPermission permission={permissions.READ_REFERENCE_DATA}>
                                <ListItemButton
                                    onClick={() => {
                                        navigate(
                                            `/setup/reference/data/${row?.original?.type_name}/${row?.original?.reference_type_id}`,
                                        );
                                        onClose();
                                    }}
                                >
                                    View Sub Data
                                </ListItemButton>
                                {/* <Tooltip title="Show Sub Data" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/setup/reference/data/${row?.original?.type_name}/${row?.original?.reference_type_id}`,
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
                        </Tooltip> */}
                            </HasPermission>
                        </>
                    )}
                </PopoverButton>
            ),
        },
    ]);

    const sub_columns = [
        { key: "reference_type_id", name: "Id", type: "default" },
        { key: "type_name", name: "Type Name", type: "default" },
        { key: "description", name: "Description", type: "defautl" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
    ];

    const sortData = [
        { key: "None", value: "type_name" },
        { key: "Name", value: "name" },
        { key: "Created Date", value: "created_ts" },
    ];

    return (
        <PageContent
            documentTitle="Reference Type"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "References",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Reference Type"
                    fields={filterFields}
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    values={filterSchema}
                />
                <PageContentContainer
                    title="All Reference Type"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                sortByData={sortData}
                                values={filterSchema}
                                disabled={g_loading}
                            />
                            <Header type={true} />
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        title="Reference Type Details"
                        data={referenceTypeData?.data || []}
                        sub_columns={sub_columns}
                        loading={g_loading}
                    />
                    <TablePagination
                        paginationData={referenceTypeData?.pagination}
                        handleChangePage={onPageChange}
                        handleChangeRowsPerPage={onRowsPerPageChange}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_REFERENCE_TYPE] })(Reference);
