import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import Spacer from "App/components/Spacer/Spacer";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import FilterBank from "Private/components/BankList/FilterBank";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/action";
import { CountryName, CurrencyName } from "App/helpers";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const Banks = (props) => {
    const dispatch = useDispatch();

    const { response: allBankData, loading: bank_loading } = useSelector((state) => state.get_all_bank_list);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        reset,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
    } = useListFilterStore({
        initialState,
    });

    useEffect(() => {
        dispatch(actions.get_all_bank_list(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Account Holder",
                accessorKey: "account_name",
            },
            {
                header: "Account Number",
                accessorKey: "account_number",
            },
            {
                header: "Bank Name",
                accessorKey: "bank_name",
            },
            {
                header: "Account Type",
                accessorKey: "account_type",
            },
            {
                header: "Holder Type",
                accessorKey: "holder_type",
            },
            {
                header: "Customer ID",
                accessorKey: "customer_id",
            },
            {
                header: "Routing Number",
                accessorKey: "routing_number",
            },
            {
                header: "Country/Currency",
                accessorKey: "country",
                cell: ({ row, getValue }) => {
                    return (
                        <Box>
                            <Typography component="p">{getValue() ? CountryName(getValue()) : "N/A"}</Typography>
                            <Typography color="grey.600" variant="caption">
                                {row?.original?.currency ? CurrencyName(row?.original?.currency) : "N/A"}
                            </Typography>
                        </Box>
                    );
                },
            },
        ],
        [],
    );

    const sortByOptions =
        allBankData?.data?.length > 0 &&
        Object.keys(allBankData?.data[0])?.map((item) => {
            return { value: item, label: item };
        });

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "bank_id",
            label: "Bank ID",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_id",
            label: "Customer ID",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "bank_name",
            label: "Bank Name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
    ];

    return (
        <PageContent
            documentTitle="Bank Lists"
            breadcrumbs={[
                {
                    label: "Customers",
                },
                {
                    label: "Bank Lists",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Bank Details"
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    open={isFilterOpen}
                    fields={filterFields}
                    values={filterSchema}
                />
                <PageContentContainer
                    title="All Bank Details"
                    topRightEndContent={
                        <TableGridQuickFilter
                            onSortByChange={onQuickFilter}
                            onOrderByChange={onQuickFilter}
                            sortByData={sortByOptions}
                            values={filterSchema}
                            disabled={bank_loading}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={allBankData?.data || []} loading={bank_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={allBankData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default Banks;
