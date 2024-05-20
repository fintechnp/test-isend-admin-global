import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import { TablePagination } from "App/components/Table";
import { b2bAccountActions as actions } from "./store";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import AccountFilterForm from "Private/components/B2bAcount/AccountFilterForm";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

const initialState = {
    Page: 1,
    PageSize: 10,
};
export default function ListB2bAccounts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response, loading } = useSelector((state) => state.get_all_b2b_account);

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

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            Page: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            PageSize: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };
    return (
        <PageContent title="Balance Accounts">
            <AccountFilterForm setFilterSchema={setFilterSchema} />
            <TanstackReactTable
                columns={columns}
                title="B2b Accounts"
                data={response?.data ?? []}
                loading={loading}
                renderPagination={() => (
                    <TablePagination
                        paginationData={response?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
}
