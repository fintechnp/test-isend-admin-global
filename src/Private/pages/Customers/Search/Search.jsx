import { reset } from "redux-form";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useState, useMemo, useRef } from "react";

import { Block } from "App/components";
import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import PhoneIcon from "App/components/Icon/PhoneIcon";
import KycStatusBadge from "./components/KycStatusBadge";
import CustomerAvatar from "./components/CustomerAvatar";
import FilterForm from "App/components/Filter/FilterForm";
import FilterButton from "App/components/Button/FilterButton";
import PopoverButton from "App/components/Button/PopoverButton";
import PageContent from "App/components/Container/PageContent";
import CustomerStatusBadge from "./components/CustomerStatusBadge";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";

import actions from "./store/actions";
import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import routePaths from "Private/config/routePaths";
import calculateAge from "App/helpers/calculateAge";
import getCustomerName from "App/helpers/getCustomerName";
import referenceTypeId from "Private/config/referenceTypeId";
import { TablePagination } from "App/components/Table";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";
import KycStat from "./components/KycStat";

const initialState = {
    page_number: 1,
    page_size: 15,
    name: "",
    // customer_id: 0,
    id_number: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const filter = {
    page_number: 1,
    page_size: 500,
    agent_type: "SEND",
    country: "",
    sort_by: "",
    order_by: "DESC",
};

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: customersData, loading: isLoading, isFilterOpen } = useSelector((state) => state.get_customers);
    const { success: b_success, loading: b_loading } = useSelector((state) => state.block_unblock_customer);

    const { response: SendPartner, loading: p_loading } = useSelector((state) => state.get_sending_partner);

    useEffect(() => {
        dispatch(reset("block_customer_form"));
        dispatch(reset("search_form_customer"));
        dispatch({ type: "GET_CUSTOMERS_RESET" });
        dispatch({ type: "GET_CUSTOMER_BYID_RESET" });
        dispatch({ type: "CREATE_CUSTOMERS_RESET" });
        dispatch({ type: "UPDATE_CUSTOMERS_RESET" });
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_customers(filterSchema));
            dispatch({ type: "BLOCK_UNBLOCK_CUSTOMER_RESET" });
        } else {
            isMounted.current = true;
            dispatch({
                type: "GET_SENDING_PARTNER",
                query: filter,
            });
        }
    }, [dispatch, filterSchema, b_success]);

    const handleBlock = (data) => {
        dispatch(actions.block_unblock_customer(data?.id, { is_active: !data?.is_active }, { remarks: data?.remarks }));
    };

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Customer Details",
                accessorKey: "first_name",
                cell: ({ row }) => (
                    <Row gap="8px">
                        <CustomerAvatar
                            name={getCustomerName(row.original)}
                            countryIso2Code={row.original.country_iso2}
                        />
                        <Column>
                            <Typography fontWeight={500}>
                                {getCustomerName(row.original)} ({row.original.customer_id})
                            </Typography>
                            <Row alignItems="center" gap="2px">
                                <PhoneIcon />
                                <Typography variant="caption">
                                    {row.original.phone_number}, {calculateAge(row.original.date_of_birth)}y /{" "}
                                    {row.original.gender ?? "-"}
                                </Typography>
                            </Row>
                        </Column>
                    </Row>
                ),
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Acc. Status",
                accessorKey: "is_active",
                cell: ({ getValue }) => <CustomerStatusBadge status={getValue() ? "active" : "blocked"} />,
            },
            {
                header: "Created Status",
                accessorKey: "created_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                        <Typography>By: {row.original.created_by}</Typography>
                    </Column>
                ),
            },
            {
                header: "KYC Status",
                accessorKey: "kyc_status",
                cell: ({ getValue }) => (
                    <KycStatusBadge
                        status={getValue()}
                        label={getValue() ? ReferenceName(referenceTypeId.kycStatuses, getValue()) : ""}
                    />
                ),
            },
            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            <ListItemButton onClick={() => navigate(`/customer/details/${row.original.tid}`)}>
                                View
                            </ListItemButton>
                            <ListItemButton onClick={() => navigate(`/customer/update/${row.original.tid}`)}>
                                Edit
                            </ListItemButton>
                            <Block
                                enablePopoverAction
                                id={row.original.tid}
                                name="Customer"
                                destroyOnUnmount
                                enableReinitialize
                                remark={true}
                                initialValues={{
                                    id: row.original.tid,
                                    is_active: row.original.is_active,
                                    remarks: "",
                                }}
                                onSubmit={handleBlock}
                                loading={b_loading}
                                form={`block_form_customer${row.original.tid}`}
                                status={row?.original?.is_active}
                            />
                        </PopoverButton>
                    );
                },
            },
        ],
        [handleBlock, b_loading],
    );

    const filterFields = [
        {
            type: "date",
            name: "from_date",
            label: "From Date",
        },
        {
            type: "date",
            name: "to_date",
            label: "To Date",
        },
        {
            type: "textfield",
            name: "name",
            label: "Customer Name",
        },
        {
            type: "textfield",
            name: "customer_id",
            label: "Customer ID",
        },
        {
            type: "textfield",
            name: "id_number",
            label: "Identity Number",
        },
        {
            type: "textfield",
            name: "mobile_number",
            label: "Mobile Number",
        },
        {
            type: "textfield",
            name: "email",
            label: "Email",
        },
        {
            type: "date",
            name: "date_of_birth",
            label: "Date of birth",
        },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Customer ID", value: "customer_id" },
        { key: "Name", value: "first_name" },
        { key: "Country", value: "country" },
    ];

    const handleQuickFilter = (name, value) => {
        const updatedFilterSchema = {
            ...filterSchema,
            [name]: value,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleOnSubmit = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            ...data,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleOnReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "GET_CUSTOMERS_RESET" });
    };

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    useEffect(() => {
        handleOnSubmit();
    }, []);

    return (
        <PageContent
            documentTitle="Customers"
            topRightEndContent={
                <FilterButton
                    size="small"
                    onClick={() => dispatch(isFilterOpen ? actions.close_filter() : actions.open_filter())}
                />
            }
            breadcrumbs={[
                {
                    label: "Dashboard",
                },
                {
                    label: "Customer",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    open={isFilterOpen}
                    onClose={() => dispatch(actions.close_filter())}
                    onSubmit={handleOnSubmit}
                    onReset={handleOnReset}
                    fields={filterFields}
                    values={filterSchema}
                />
                <Paper sx={{ p: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <Row alignItems="center" justifyContent="space-between">
                        <Typography variant="h6">Customers</Typography>
                        <Row gap="16px">
                            <TableGridQuickFilter
                                onSortByChange={handleQuickFilter}
                                onOrderByChange={handleQuickFilter}
                                disabled={isLoading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_CUSTOMER}>
                                <Button variant="contained" onClick={() => navigate(routePaths.customer.create)}>
                                    Create Customer
                                </Button>
                            </HasPermission>
                        </Row>
                    </Row>
                    <TanstackReactTable columns={columns} data={customersData?.data ?? []} loading={isLoading} />
                </Paper>

                <TablePagination
                    paginationData={customersData?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />

                <KycStat />
            </Column>
        </PageContent>
    );
}

export default Search;
