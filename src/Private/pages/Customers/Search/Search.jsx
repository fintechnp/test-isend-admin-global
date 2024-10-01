import * as Yup from "yup";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useMemo, useState } from "react";

import { Block } from "App/components";
import Row from "App/components/Row/Row";
import KycStat from "./components/KycStat";
import Checkbox from "@mui/material/Checkbox";
import Column from "App/components/Column/Column";
import PhoneIcon from "App/components/Icon/PhoneIcon";
import { TablePagination } from "App/components/Table";
import KycStatusBadge from "./components/KycStatusBadge";
import CustomerAvatar from "./components/CustomerAvatar";
import FilterButton from "App/components/Button/FilterButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import CustomerStatusBadge from "./components/CustomerStatusBadge";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import PartnerType from "App/data/PartnerType";
import routePaths from "Private/config/routePaths";
import calculateAge from "App/helpers/calculateAge";
import { permissions } from "Private/data/permissions";
import { getCustomerName } from "App/helpers/getFullName";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 10,
    name: "",
    id_number: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
    sort_by: "created_ts",
    order_by: "DESC",
    is_deleted: null,
};

const allDeletedOptions = [
    { label: "All", value: "all" },
    { label: "Active", value: false },
    { label: "Closed", value: true },
];

const schema = Yup.object().shape({
    from_date: Yup.string()
        .nullable()
        .test({
            name: "required_when_to_date_is_not_empty",
            message: "Form Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.to_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.to_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.to_date) && !isEmpty(value);
            },
        }),
    to_date: Yup.string()
        .nullable()
        .test({
            name: "required_when_from_date_is_not_empty",
            message: "To Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.from_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.from_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.from_date) && !isEmpty(value);
            },
        }),
});

function Search() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onQuickFilter,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        onDeleteFilterParams,
        reset,
    } = useListFilterStore({
        initialState,
    });

    const { response: customersData, loading: isLoading } = useSelector((state) => state.get_customers);

    const { success: b_success, loading: b_loading } = useSelector((state) => state.block_unblock_customer);

    useEffect(() => {
        dispatch(actions.get_customers(filterSchema));
        dispatch({ type: "BLOCK_UNBLOCK_CUSTOMER_RESET" });
    }, [dispatch, filterSchema, b_success]);

    const handleBlock = (data) => {
        dispatch(actions.block_unblock_customer(data?.id, { is_active: !data?.is_active }, { remarks: data?.remarks }));
    };

    const handleChangeIsDeleted = (e) => {
        onFilterSubmit({
            ...filterSchema,
            is_deleted: e.target.value === "all" ? null : e.target.value,
        });
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
                cell: ({ row }) => {
                    const age = calculateAge(row.original.date_of_birth);

                    const caption = [age ? `${age} y` : "", row.original.gender].filter((value) => !isEmpty(value));

                    return (
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
                                        {!isEmpty(row.original.phone_number)
                                            ? row.original.phone_number
                                            : row.original.mobile_number}
                                        {caption.length > 0 ? ", " : null} {caption.join(" / ")}
                                    </Typography>
                                </Row>
                            </Column>
                        </Row>
                    );
                },
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
                        <Typography>{getValue() ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"}</Typography>
                        <Typography>By: {row.original.created_by}</Typography>
                    </Column>
                ),
            },
            {
                header: "KYC Status",
                accessorKey: "kyc_status",
                cell: ({ getValue, row }) => (
                    <Column alignItems="flex-start" gap="4px">
                        <KycStatusBadge
                            status={getValue()}
                            label={getValue() ? ReferenceName(referenceTypeId.kycStatuses, getValue()) : ""}
                        />
                        {row.original.kyc_updated_ts
                            ? dateUtils.getLocalDateTimeFromUTC(row.original.kyc_updated_ts)
                            : null}
                    </Column>
                ),
            },
            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <ListItemButton onClick={() => navigate(`/customer/details/${row.original.tid}`)}>
                                        View
                                    </ListItemButton>
                                    <HasPermission permission={permissions.EDIT_CUSTOMER}>
                                        <ListItemButton
                                            onClick={() => navigate(`/customer/update/${row.original.tid}`)}
                                        >
                                            Edit
                                        </ListItemButton>
                                    </HasPermission>
                                    <HasPermission permission={permissions.BLOCK_CUSTOMER}>
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
                                            onClosePopover={onClose}
                                        />
                                    </HasPermission>
                                </>
                            )}
                        </PopoverButton>
                    );
                },
            },
        ],
        [handleBlock, b_loading],
    );

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "from_date",
            label: "From Date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "to_date",
            label: "To Date",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "name",
            label: "Customer Name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_id",
            label: "Customer ID",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "id_number",
            label: "Identity Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "mobile_number",
            label: "Mobile Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "email",
            label: "Email",
        },
        {
            type: fieldTypes.DATE,
            name: "date_of_birth",
            label: "Date of birth",
        },
        {
            type: fieldTypes.PARTNER_SELECT,
            name: "agent_id",
            label: "Partner",
            props: {
                partnerType: PartnerType.SEND,
            },
        },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Customer ID", value: "customer_id" },
        { key: "Name", value: "first_name" },
        { key: "Country", value: "country" },
    ];

    useEffect(() => {
        dispatch(actions.get_customers(filterSchema));
    }, []);

    return (
        <PageContent
            documentTitle="Customers"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Customers",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                    schema={schema}
                    title="Search Customers"
                    onReset={reset}
                />
                <PageContentContainer
                    title="Customers"
                    topRightContent={
                        <>
                            <FormControlLabel
                                sx={{ marginRight: 0 }}
                                control={
                                    <Select
                                        size="small"
                                        name="is_deleted"
                                        onChange={handleChangeIsDeleted}
                                        value={filterSchema.is_deleted === null ? "all" : filterSchema.is_deleted}
                                    >
                                        {allDeletedOptions.map((option, index) => (
                                            <MenuItem key={index} value={option.value} selected={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                }
                            />

                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={isLoading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_CUSTOMER}>
                                <Button variant="contained" onClick={() => navigate(routePaths.customer.create)}>
                                    Create Customer
                                </Button>
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={customersData?.data ?? []} loading={isLoading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={customersData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
                <KycStat fromDate={filterSchema?.from_date} toDate={filterSchema?.to_date} />
            </Column>
        </PageContent>
    );
}

export default Search;
