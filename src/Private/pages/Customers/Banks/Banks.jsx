import React, { useState, useEffect, useMemo, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { Delete } from "App/components";
// import Filter from "./components/Filter";
import PageContent from "App/components/Container/PageContent";
// import AddDeliveryOption from "./components/AddDeliveryOption";
import { TablePagination, TableSwitch } from "App/components/Table";

import Spacer from "App/components/Spacer/Spacer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

// import actions from "./store/actions";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import actions from "./store/actions";
import { useParams } from "react-router-dom";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const Banks = (props) => {
    const dispatch = useDispatch();
    const { customerId } = useParams();

    const [filterSchema, setFilterSchema] = useState(initialState);
    const { response: bankData, loading: bank_loading } = useSelector((state) => state.get_bank_details);

    useEffect(() => {
        dispatch(actions.get_bank_details(customerId, filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "ID",
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

    // const sub_columns = [
    //     { key: "delivery_option_id", name: "Id", type: "default" },
    //     { key: "delivery_name", name: "Name", type: "default" },
    //     { key: "payout_agent", name: "Payout Agent", type: "default" },
    //     { key: "country_code", name: "Country", type: "country" },
    //     { key: "currency_code", name: "Currency", type: "currency" },
    //     {
    //         key: "payment_type",
    //         name: "Payment Type",
    //         type: "reference",
    //         ref_value: 1,
    //     },
    //     { key: "is_active", name: "Status", type: "boolean" },
    //     { key: "created_ts", name: "Created Date", type: "date" },
    // ];

    // const handleSearch = useCallback(
    //     (e) => {
    //         const searchValue = e.target.value;
    //         const updatedFilterSchema = {
    //             ...filterSchema,
    //             search: searchValue,
    //         };
    //         setFilterSchema(updatedFilterSchema);
    //     },
    //     [filterSchema],
    // );

    // const handleCountry = (e) => {
    //     const country = e.target.value;
    //     const updatedFilterSchema = {
    //         ...filterSchema,
    //         payout_country: country,
    //     };
    //     setFilterSchema(updatedFilterSchema);
    // };

    // const handleOrder = (e) => {
    //     const order = e.target.value;
    //     const updatedFilterSchema = {
    //         ...filterSchema,
    //         order_by: order,
    //     };
    //     setFilterSchema(updatedFilterSchema);
    // };

    // const handlePayemntType = (e) => {
    //     const payment = e.target.value;
    //     const updatedFilterSchema = {
    //         ...filterSchema,
    //         payment_type: payment,
    //     };
    //     setFilterSchema(updatedFilterSchema);
    // };

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_number: 1,
            page_size: pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    return (
        <PageContent title="Bank Details">
            <Spacer />
            <TanstackReactTable
                columns={columns}
                title="Bank Details"
                data={bankData?.data || []}
                // sub_columns={sub_columns}
                loading={bank_loading}
                rowsPerPage={10}
                totalPage={bankData?.pagination?.totalPage || 1}
                renderPagination={() => (
                    <TablePagination
                        paginationData={bankData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default Banks;
