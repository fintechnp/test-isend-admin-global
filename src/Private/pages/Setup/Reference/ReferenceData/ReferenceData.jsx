import Box from "@mui/material/Box";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import Header from "./../components/Header";
import Filter from "./../components/Filter";
import Column from "App/components/Column/Column";
import { Delete } from "../../../../../App/components";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import AddReferenceData from "./../components/AddReferenceData";
import PopoverButton from "App/components/Button/PopoverButton";
import ViewReferenceData from "../components/ViewReferenceData";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import Table, { TablePagination } from "./../../../../../App/components/Table";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./../store/actions";
import { permissions } from "Private/data/permissions";
import useListFilterStore from "App/hooks/useListFilterStore";

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
    sort_by: "name",
    order_by: "DESC",
};

const ReferenceData = (props) => {
    const { id, name } = useParams();
    const dispatch = useDispatch();

    const { response: referenceData, loading: g_loading } = useSelector((state) => state.get_reference_data);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_reference_data);
    const { success: a_success } = useSelector((state) => state.add_reference_data);
    const { success: u_success } = useSelector((state) => state.update_reference_data);

    const {
        isFilterOpen,
        closeFilter,
        filterSchema,
        openFilter,
        onPageChange,
        onDeleteFilterParams,
        onRowsPerPageChange,
        onFilterSubmit,
        onQuickFilter,
        reset,
    } = useListFilterStore({ initialState });

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
            header: "SN",
            accessorKey: "f_serial_no",
        },
        {
            header: "ID",
            accessorKey: "reference_id",
        },
        {
            header: "Name",
            accessorKey: "name",
            cell: ({ row }) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                        {row?.original?.name ? row?.original?.name : "n/a"}
                    </StyledName>
                </Box>
            ),
        },
        {
            header: () => (
                <Box>
                    <Typography>Value</Typography>
                </Box>
            ),
            accessorKey: "value",
            cell: ({ row }) => (
                <Box>
                    <StyledText component="p">{row?.original?.value ? row?.original?.value : "n/a"}</StyledText>
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
            header: () => (
                <Box textAlign="center">
                    <Typography>Actions</Typography>
                </Box>
            ),
            accessorKey: "show",
            cell: ({ row }) => (
                <PopoverButton>
                    {({ onClose }) => (
                        <>
                            <ViewReferenceData data={row?.original} onClose={onClose} />
                            <HasPermission permission={permissions.EDIT_REFERENCE_DATA}>
                                <AddReferenceData update={true} update_data={row?.original} enablePopoverAction />
                            </HasPermission>
                            <HasPermission permission={permissions.DELETE_REFERENCE_DATA}>
                                <Delete
                                    handleDelete={handleDelete}
                                    d_loading={d_loading}
                                    id={row.original?.tid}
                                    tooltext="Delete Reference Data"
                                    enablePopoverAction
                                />
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
        { key: "name", name: "Name", type: "default" },
        { key: "description", name: "Description", type: "defautl" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const sortData = [
        { key: "None", value: "" },
        { key: "Name", value: "name" },
        { key: "Created Date", value: "created_ts" },
    ];

    const handleDelete = (d_id) => {
        dispatch(actions.delete_reference_data(d_id));
    };

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
    ];

    return (
        <PageContent
            documentTitle="Reference Data"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "References",
                },
                {
                    label: "Reference Data",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Seach Reference Data"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    values={filterSchema}
                    fields={filterFields}
                />
                <PageContentContainer
                    title={name}
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                values={filterSchema}
                                disabled={g_loading}
                                sortByData={sortData}
                            />
                            <Header type={false} id={id} name={""} />
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        title="Reference Data Details"
                        data={referenceData?.data || []}
                        sub_columns={sub_columns}
                        loading={g_loading}
                    />
                    <TablePagination
                        paginationData={referenceData?.pagination}
                        handleChangePage={onPageChange}
                        handleChangeRowsPerPage={onRowsPerPageChange}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_REFERENCE_DATA] })(ReferenceData);
