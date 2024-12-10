import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import ucwords from "App/helpers/ucwords";
import { b2bAccountActions as actions } from "./store";
import { localStorageGet } from "App/helpers/localStorage";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    Page: 1,
    PageSize: 10,
};
export default function ListB2bAccounts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = localStorageGet("country");

    const countriesOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const { response, loading } = useSelector((state) => state.get_all_b2b_account);
    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onRowsPerPageChange,
        onQuickFilter,
        reset,
    } = useListFilterStore({
        initialState,
        pageNumberKeyName: "Page",
        pageSizeKeyName: "PageSize",
    });

    useEffect(() => {
        dispatch(actions?.get_all_b2b_account(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Agent/Business",
                accessorKey: "relatedTo",
            },

            {
                header: "Account Type",
                accessorKey: "accountType",
            },
            {
                header: "Account Name",
                accessorKey: "accountName",
            },
            {
                header: "Country",
                accessorKey: "countryName",
            },
            {
                header: "Balance",
                accessorKey: "balance",
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "AccountName",
            label: "Account Name",
        },
        {
            type: fieldTypes.SELECT,
            name: "CountryId",
            label: "Country",
            options: countriesOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Balance Accounts"
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "Balance Accounts",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Balance Accounts"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                    values={filterSchema}
                />
                <PageContentContainer title="Balance Accounts">
                    <TanstackReactTable columns={columns} data={response?.data ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
