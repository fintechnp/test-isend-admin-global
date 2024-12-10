import { styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import { Delete } from "App/components";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Column from "App/components/Column/Column";
import AddSanction from "./components/AddSanction";
import ViewSanction from "./components/ViewSanction";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import { CountryName, FormatDate, ReferenceName } from "App/helpers";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
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
    opacity: 0.9,
    fontSize: "14px",
    color: "border.main",
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "name",
    order_by: "DESC",
};

const sortData = [
    { key: "None", value: "" },
    { key: "Name", value: "name" },
    { key: "Type", value: "type" },
    { key: "Country", value: "country" },
];

const SanctionList = () => {
    const dispatch = useDispatch();

    const { response: sanctionList, loading: l_loading } = useSelector((state) => state.get_sanction_list);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_sanction);
    const { success: a_success } = useSelector((state) => state.add_sanction);
    const { success: u_success } = useSelector((state) => state.update_sanction);
    const { success: i_success, loading: i_loading } = useSelector((state) => state.import_sanction);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        reset,
        onPageChange,
        onRowsPerPageChange,
        onFilterSubmit,
        onDeleteFilterParams,
        onQuickFilter,
    } = useListFilterStore({ initialState });

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
                header: "Id",
                accessorKey: "tid",
            },
            {
                header: "Name",
                accessorKey: "name",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {getValue() ? getValue() : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {row?.original?.type ? ReferenceName(30, row?.original?.type) : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: "Address",
                accessorKey: "country",
                cell: ({ getValue, row }) => (
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
                            {getValue() ? CountryName(getValue()) : "N/A"}
                        </StyledName>
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.8 }}>
                            {row?.original?.address ? row?.original?.address : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>DOB</Typography>
                    </Box>
                ),
                accessorKey: "dob",
                cell: ({ getValue }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {getValue() ? FormatDate(getValue()) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Source</Typography>
                    </Box>
                ),
                accessorKey: "source",
                cell: ({ getValue }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {getValue() ? getValue() : "N/A"}
                        </StyledName>
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
                                <ViewSanction data={row?.original} onClose={onClose} />
                                <HasPermission permission={permissions.EDIT_SANCTION}>
                                    <AddSanction update={true} update_data={row?.original} enablePopoverAction />
                                </HasPermission>
                                <HasPermission permission={permissions.DELETE_SANCTION}>
                                    <Delete
                                        id={row?.original.tid}
                                        handleDelete={handleDelete}
                                        loading={d_loading}
                                        tooltext="Delete Sanction"
                                        enablePopoverAction
                                    />
                                </HasPermission>
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "name", name: "Name", type: "default" },
        { key: "type", name: "Type", type: "reference", ref_value: 30 },
        { key: "address", name: "Address", type: "default" },
        { key: "country", name: "Country", type: "country" },
        { key: "dob", name: "DOB", type: "date" },
        { key: "source", name: "Source", type: "default" },
        { key: "remarks", name: "Remarks", type: "default" },
        { key: "ref1", name: "Ref 1", type: "default" },
        { key: "ref2", name: "Ref 2", type: "default" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const handleDelete = (id) => {
        dispatch(actions.delete_sanction(id));
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
            documentTitle="Sanction"
            breadcrumbs={[
                {
                    label: "Compliance",
                },
                {
                    label: "Sanction Lists",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Sanction"
                    fields={filterFields}
                    values={filterSchema}
                    onClose={closeFilter}
                    onDelete={onDeleteFilterParams}
                    open={isFilterOpen}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                />
                <PageContentContainer
                    title="Sanction Lists"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                values={filterSchema}
                                sortByData={sortData}
                                disabled={l_loading}
                            />
                            <Header loading={i_loading} />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={sanctionList?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={sanctionList?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: permissions.READ_SANCTION })(SanctionList);
