import * as Yup from "yup";
import { isAfter } from "date-fns";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo } from "react";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import { CountryName, ReferenceName, FormatDateTime } from "App/helpers";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import KycStatusBadge from "Private/pages/Customers/Search/components/KycStatusBadge";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import isEmpty from "App/helpers/isEmpty";
import PartnerType from "App/data/PartnerType";
import referenceTypeId from "Private/config/referenceTypeId";

const schema = Yup.object().shape({
    created_from_date: Yup.string().nullable().optional(),
    created_to_date: Yup.string()
        .nullable().optional()
        .when("created_from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                Yup.string().test({
                    name: "is-after",
                    message: "Member To must be after Member From",
                    test: function (value) {
                        const { created_from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(created_from_date)) : true;
                    },
                }),
            otherwise: (schema) => Yup.string().nullable().optional(),
        }),
    kyc_from_date: Yup.string().nullable().optional(),
    kyc_to_date: Yup.string()
        .nullable().optional()
        .when("kyc_from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                Yup.string().test({
                    name: "is-after",
                    message: "KYC To date must be after KYC From date",
                    test: function (value) {
                        const { kyc_from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(kyc_from_date)) : true;
                    },
                }),
            otherwise: (schema) => Yup.string().nullable().optional(),
        }),
});

const StyledMail = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    width: "90%",
    display: "block",
    fontSize: "14px",
    color: theme.palette.text.main,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

const stateSend = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function CustomerReports(props) {
    const dispatch = useDispatch();
    const [filterPartner, setFilterPartner] = useState(stateSend);
    const reference = JSON.parse(localStorage.getItem("reference"));

    const KycStatusOptions = reference
        ?.filter((ref_data) => ref_data.reference_type === 21)[0]
        .reference_data.map((data) => ({ ...data, label: data.name }));

    const { response: CustomerReports, loading: l_loading } = useSelector((state) => state.get_customer_report);

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

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_id",
            label: "Customer Id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "name",
            label: "Name",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "nationality",
            label: "Nationality",
        },
        {
            type: fieldTypes.PARTNER_SELECT,
            name: "agent_id",
            label: "Partner",
            props: {
                partnerType: PartnerType.SEND,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "id_number",
            label: "Id Number",
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
            name: "created_from_date",
            label: "Member From",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "created_to_date",
            label: "Member To",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "date_of_birth",
            label: "Date of Birth",
        },
        {
            type: fieldTypes.SELECT,
            name: "kyc_status",
            label: "Status",
            options: KycStatusOptions,
        },
        {
            type: fieldTypes.DATE,
            name: "kyc_from_date",
            label: "Kyc Date From",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "kyc_to_date",
            label: "Kyc Date To",
            props: {
                withEndDayTimezone: true,
            },
        },
    ];

    const {
        response: ReportsDownload,
        loading: pd_loading,

        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "CUSTOMER_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_customer_report(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
                cell: ({ row, getValue }) => (
                    <Link to={`/customer/details/${row.original.tid}`} style={{ textDecoration: "none" }}>
                        {getValue() ? getValue() : "N/A"}
                    </Link>
                ),
            },
            {
                header: "Name",
                accessorKey: "first_name",
                cell: ({ row, getValue }) => (
                    <>
                        <Typography>
                            {getValue()} {row.original?.middle_name} {row.original?.last_name}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {row.original?.customer_type_data ? row.original?.customer_type_data : "-"}
                        </Typography>
                    </>
                ),
            },
            {
                header: "Identity",
                accessorKey: "id_type",
                cell: ({ row, getValue }) => (
                    <>
                        <Typography>{getValue() ? getValue() : ""}</Typography>
                        <Typography
                            sx={{
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {row.original?.id_number ? row.original?.id_number : "-"}
                        </Typography>
                    </>
                ),
            },
            {
                header: "Address",
                accessorKey: "country",
                cell: ({ row, getValue }) => (
                    <>
                        <Typography>
                            {row.original?.postcode} {row.original?.unit} {row.original?.street} {row.original?.address}
                        </Typography>
                        <Typography sx={{ paddingLeft: "2px", opacity: 0.8 }}>
                            {row.original?.state}
                            {row.original?.state && ","} {CountryName(getValue())}
                        </Typography>
                    </>
                ),
            },
            {
                header: "Contact",
                accessorKey: "mobile_number",
                cell: ({ row, getValue }) => (
                    <>
                        <Typography
                            sx={{
                                fontSize: "13px",
                            }}
                        >
                            {getValue() ? getValue() : "-"}
                        </Typography>
                        <Tooltip title={row.original?.email} arrow>
                            <StyledMail
                                component="p"
                                sx={{
                                    fontSize: "13px",
                                    opacity: 0.6,
                                }}
                            >
                                {row.original?.email ? row.original?.email : "N/A"}
                            </StyledMail>
                        </Tooltip>
                    </>
                ),
            },
            {
                header: "KYC Status",
                accessorKey: "kyc_status",
                cell: ({ row, getValue }) => (
                    <>
                        <KycStatusBadge
                            status={getValue()}
                            label={getValue() ? ReferenceName(referenceTypeId.kycStatuses, getValue()) : "Not Started"}
                        />
                        <Typography mt="5px">{row.original?.address ? row.original?.address : "-"}</Typography>
                    </>
                ),
            },
            {
                header: "Since/Status",
                accessorKey: "created_ts",
                cell: ({ row, getValue }) => (
                    <>
                        <Typography mb="5px">{FormatDateTime(getValue())}</Typography>
                        <CustomerStatusBadge status={row.original?.is_active ? "active" : "blocked"} />
                    </>
                ),
            },
        ],
        [],
    );

    //Filter
    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Customer ID", value: "customer_id" },
        { key: "Name", value: "first_name" },
        { key: "Partner", value: "register_agent_id" },
        { key: "Country", value: "country" },
    ];

    const handlePartner = (e) => {
        const updatedFilterSchema = {
            ...filterPartner,
            country: e.target.value,
        };
        setFilterPartner(updatedFilterSchema);
    };

    //Downloads
    const headers = [
        { label: "Name", key: "first_name" },
        { label: "Country", key: "country" },
        { label: "Customer Id", key: "customer_id" },
        { label: "Kyc Status", key: "kyc_status" },
        { label: "Mobile Number", key: "mobile_number" },
        { label: "Created By", key: "created_by" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Customers",
        start: filterSchema?.created_from_date,
        end: filterSchema?.created_to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/customer"));
    };

    return (
        <PageContent
            documentTitle="Filter Customers"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Generate Reports",
                },
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
                            <Filter
                                fileName="CustomerReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                state={filterSchema}
                                downloadData={downloadData}
                            />
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={l_loading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={CustomerReports?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={CustomerReports?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_CUSTOMER_REPORT] })(CustomerReports);
