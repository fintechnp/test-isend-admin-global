import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo } from "react";

import actions from "./store/action";
import Spacer from "App/components/Spacer/Spacer";
import { TablePagination } from "App/components/Table";
import { CountryName, CurrencyName } from "App/helpers";
import PageContent from "App/components/Container/PageContent";
import FilterBank from "Private/components/BankList/FilterBank";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const Banks = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: allBankData, loading: bank_loading } = useSelector((state) => state.get_all_bank_list);

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

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: newPage + 1,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <PageContent title="Bank Lists">
            <FilterBank sortByOptions={sortByOptions || []} loading={bank_loading} />
            <Spacer />
            <TanstackReactTable
                columns={columns}
                title="All Bank Details"
                data={allBankData?.data || []}
                loading={bank_loading}
                rowsPerPage={10}
                totalPage={allBankData?.pagination?.totalPage || 1}
                renderPagination={() => (
                    <TablePagination
                        paginationData={allBankData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default Banks;
