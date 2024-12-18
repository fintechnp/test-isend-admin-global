import { styled } from "@mui/system";
import { Box, Grid } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import MuiIconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Delete } from "App/components";
import Column from "App/components/Column/Column";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import FilterLanguage from "../../../components/AddLanguage/FilterLanguage";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import LanguageValueModal from "../../../components/AddLanguage/AddLanguageValueModal";

import actions from "./store/actions";
import { permissions } from "Private/data/permissions";
import useListFilterStore from "App/hooks/useListFilterStore";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));
const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const initialState = {
    page_size: 10,
    page_number: 1,
};

const AddLanguage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading: getLanguageValueLoading, response: allLanguageValue } = useSelector(
        (state) => state.get_all_language_value,
    );

    const { success: addLanguageValueSuccess, loading: addLanguageValueLoading } = useSelector(
        (state) => state.add_language_value,
    );
    const { success: updateLanguageValueSuccess, loading: updateLanguageValueLoading } = useSelector(
        (state) => state.update_language_value,
    );
    const { success: deleteLanguageValueSuccess, loading: deleteLanguageValueLoading } = useSelector(
        (state) => state.delete_language_value,
    );

    const {
        filterSchema,
        isFilterOpen,
        openFilter,
        closeFilter,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        onQuickFilter,
        reset,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(actions.get_all_language_value(filterSchema));
        dispatch({ type: "DELETE_LANGUAGE_VALUE_RESET" });
        dispatch({ type: "UPDATE_LANGUAGE_VALUE_RESET" });
        dispatch({ type: "ADD_LANGUAGE_VALUE_RESET" });
    }, [filterSchema, dispatch, addLanguageValueSuccess, updateLanguageValueSuccess, deleteLanguageValueSuccess]);

    const sortByOptions =
        allLanguageValue?.data?.length > 0
            ? Object.keys(allLanguageValue?.data[0])?.map((item) => {
                  return { value: item, key: item };
              })
            : [];

    const handleDelete = (id) => {
        dispatch(actions.delete_language_value(id));
    };

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Language Key",
                accessorKey: "localization_key",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {getValue() ? getValue() : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Language Value",
                accessorKey: "localization_value",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {getValue() ? getValue() : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Translation Type",
                accessorKey: "translation_type",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {getValue() ? getValue() : "n/a"}
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
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Tooltip title="Language Details" arrow>
                            <IconButton
                                onClick={() => navigate(`/localization/details/${row?.original?.localization_id}`)}
                            >
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
                        <HasPermission permission={permissions.EDIT_LOCALIZATION}>
                            <LanguageValueModal update={true} update_data={row?.original} />
                        </HasPermission>
                        <HasPermission permission={permissions.DELETE_LOCALIZATION}>
                            <Delete
                                id={row?.original?.localization_id}
                                handleDelete={handleDelete}
                                loading={getLanguageValueLoading}
                                tooltext="Delete Language Value"
                            />
                        </HasPermission>
                    </Box>
                ),
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "localization_key",
            label: "Language Key",
        },
    ];

    return (
        <PageContent
            documentTitle="Add Language"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Localization",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Localizatin"
                    open={isFilterOpen}
                    values={filterSchema}
                    onSubmit={onFilterSubmit}
                    onClose={closeFilter}
                    onReset={reset}
                    fields={filterFields}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="Language Value"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                sortByData={sortByOptions}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_LOCALIZATION}>
                                <LanguageValueModal update={false} />
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        data={allLanguageValue?.data || []}
                        loading={getLanguageValueLoading}
                    />
                </PageContentContainer>
                <TablePagination
                    paginationData={allLanguageValue?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: permissions.READ_LOCALIZATION })(AddLanguage);

export const PageLimitSelect = ({ onChange }) => {
    return (
        <select onChange={onChange} style={{ padding: "0.5rem", outline: "none" }}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
        </select>
    );
};
