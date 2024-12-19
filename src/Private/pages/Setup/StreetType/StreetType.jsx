import { Box, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Delete } from "App/components";
import { CountryName } from "App/helpers";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import StreetTypeModal from "Private/components/StreetType/AddStreetTypeModal";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import actions from "./store/action";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_size: 10,
    page_number: 1,
};

const StreetType = ({ title }) => {
    const dispatch = useDispatch();

    const { can } = useAuthUser();

    const { loading: streetTypeLoading, response: allStreetType } = useSelector((state) => state.get_street_type);

    const { success: addStreetTypeSuccess, loading: addStreetTypeLoading } = useSelector(
        (state) => state.add_street_type,
    );
    const { success: updateStreetTypeSuccess, loading: updateStreetTypeLoading } = useSelector(
        (state) => state.update_street_type,
    );
    const { success: deleteStreetTypeSuccess, loading: deleteStreetTypeLoading } = useSelector(
        (state) => state.delete_street_type,
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
        dispatch(actions.get_street_type("AUS", filterSchema));
        dispatch({ type: "DELETE_STREET_TYPE_RESET" });
        dispatch({ type: "ADD_STREET_TYPE_RESET" });
        dispatch({ type: "UPDATE_STREET_TYPE_RESET" });
    }, [filterSchema, dispatch, deleteStreetTypeSuccess, addStreetTypeSuccess, updateStreetTypeSuccess]);

    const sortByOptions =
        allStreetType?.data?.length > 0
            ? Object.keys(allStreetType?.data[0])?.map((item) => {
                  return { value: item, key: item };
              })
            : [];

    const handleDelete = (id) => {
        dispatch(actions.delete_street_type(id));
    };

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Country",
                accessorKey: "country",
                cell: ({ row, getValue }) => {
                    return (
                        <Box>
                            <Typography component="p">{getValue() ? CountryName(getValue()) : "N/A"}</Typography>
                        </Box>
                    );
                },
            },
            {
                header: "Street Code",
                accessorKey: "street_code",
            },
            {
                header: "Street Name",
                accessorKey: "street_name",
            },
            ...(can([permissions.EDIT_STREET_TYPE, permissions.DELETE_STREET_TYPE])
                ? [
                      {
                          header: "Actions",
                          accessorKey: "show",
                          cell: ({ row }) => {
                              return (
                                  <TableRowActionContainer>
                                      <HasPermission permission={permissions.EDIT_STREET_TYPE}>
                                          <StreetTypeModal update={true} update_data={row?.original} />
                                      </HasPermission>
                                      <HasPermission permission={permissions.DELETE_STREET_TYPE}>
                                          <Delete
                                              id={row.original.street_type_id}
                                              handleDelete={handleDelete}
                                              loading={deleteStreetTypeLoading}
                                              tooltext="Delete Street Type"
                                          />
                                      </HasPermission>
                                  </TableRowActionContainer>
                              );
                          },
                      },
                  ]
                : []),
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },
    ];

    return (
        <PageContent
            documentTitle={title}
            breadcrumbs={[{ label: "Setup" }, { label: "Street Type" }]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Street Type"
                    open={isFilterOpen}
                    values={filterSchema}
                    onSubmit={onFilterSubmit}
                    onClose={closeFilter}
                    onReset={reset}
                    fields={filterFields}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="Street Type"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                sortByData={sortByOptions}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_STREET_TYPE}>
                                <StreetTypeModal update={false} />
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        data={allStreetType?.data || []}
                        loading={streetTypeLoading}
                    />
                </PageContentContainer>
                <TablePagination
                    paginationData={allStreetType?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_STREET_TYPE] })(StreetType);

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
