import * as Yup from "yup";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { format, isAfter, parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import Row from "App/components/Row/Row";
import { ReferenceName } from "App/helpers";
import Column from "App/components/Column/Column";
import PhoneIcon from "App/components/Icon/PhoneIcon";
import { TablePagination } from "App/components/Table";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import CustomerAvatar from "App/components/Avatar/CustomerAvatar";
import KycStat from "Private/pages/Customers/Search/components/KycStat";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import KycStatusBadge from "Private/pages/Customers/Search/components/KycStatusBadge";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import PartnerType from "App/data/PartnerType";
import calculateAge from "App/helpers/calculateAge";
import { GenderStringOptions } from "App/data/Gender";
import { getCustomerName } from "App/helpers/getFullName";
import referenceTypeId from "Private/config/referenceTypeId";

const schema = Yup.object().shape({
    created_from_date: Yup.string().nullable().optional(),
    created_to_date: Yup.string()
        .nullable()
        .optional()
        .when("created_from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                Yup.string().test({
                    name: "is-after",
                    message: "To Date must be after From Date",
                    test: function (value) {
                        const { created_from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(created_from_date)) : true;
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
    page_size: 10,
    created_from_date: dateUtils.getDateBeforeTwoWeeks(),
    created_to_date: dateUtils.getTodayDate(),
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

    const IdTypeOptions = reference
        ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.identityTypes)[0]
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
        resetInitialStateDate: true,
        fromDateParamName: "created_from_date",
        toDateParamName: "created_to_date",
    });

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "created_from_date",
            label: "From Date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "created_to_date",
            label: "To Date",
            props: {
                withEndDayTimezone: true,
            },
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
            label: "Date of Birth",
        },
        {
            type: fieldTypes.SELECT,
            name: "gender",
            label: "Gender",
            options: GenderStringOptions,
        },
        {
            type: fieldTypes.DATE,
            name: "registered_kyc_date",
            label: "KYC Filled Date",
        },
        {
            type: fieldTypes.DATE,
            name: "id_issue_date",
            label: "Id Issue Date",
        },
        {
            type: fieldTypes.DATE,
            name: "id_expiry_date",
            label: "Id Expiry Date",
        },
        {
            type: fieldTypes.SELECT,
            name: "id_type",
            label: "Id Type",
            options: IdTypeOptions,
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "id_number",
            label: "Id Number",
        },
        {
            type: fieldTypes.SELECT,
            name: "kyc_status",
            label: "KYC Status",
            options: KycStatusOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "is_active",
            label: "Account Status",
            options: [
                {
                    label: "Active",
                    value: true,
                },
                {
                    label: "Inactive",
                    value: false,
                },
            ],
        },
        {
            type: fieldTypes.SELECT,
            name: "is_deleted",
            label: "Is Deleted",
            options: [
                {
                    label: "Yes",
                    value: true,
                },
                {
                    label: "No",
                    value: false,
                },
            ],
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
                                countryIso2Code={row.original.country_ios2}
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
                header: "Address Details",
                accessorKey: "address",
                cell: ({ row, getValue }) => {
                    return (
                        <Column>
                            <Typography>{getValue() ? getValue() : ""}</Typography>
                            <Typography>
                                {row.original.street ? `${row.original.street},` : ""}
                                {row.original.city ? row.original.city : ""}
                            </Typography>
                            <Typography>
                                {row.original.state ? `${row.original.state},` : ""}
                                {row.original.country ? row.original.country : ""}
                            </Typography>
                        </Column>
                    );
                },
            },
            {
                header: "Contact Details",
                accessorKey: "email",
                cell: ({ row, getValue }) => (
                    <Column>
                        <Typography>
                            {!isEmpty(row.original.phone_number)
                                ? row.original.phone_number
                                : row.original.mobile_number}
                        </Typography>
                        <Typography sx={{ color: (theme) => theme.palette.text.main }}>
                            {getValue() ? getValue() : ""}
                        </Typography>
                    </Column>
                ),
            },
            {
                header: "KYC Document Type",
                accessorKey: "id_type",
                cell: ({ getValue }) => (
                    <>{getValue() ? ReferenceName(referenceTypeId.kycDocuments, getValue()) : ""}</>
                ),
            },
            {
                header: "Document Number",
                accessorKey: "id_number",
            },

            {
                header: "Document Details",
                accessorKey: "id_issue_date",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>
                            {getValue() ? `Issue: ${dateUtils.getFormattedDate(getValue(), "MMM DD, YYYY")}` : ""}
                        </Typography>
                        <Typography>
                            {row.original.id_expiry_date
                                ? `Expiry: ${dateUtils.getFormattedDate(row.original.id_expiry_date, "MMM DD, YYYY")}`
                                : ""}
                        </Typography>
                    </Column>
                ),
            },
            {
                header: "KYC Status",
                accessorKey: "kyc_status",
                cell: ({ row, getValue }) => (
                    <KycStatusBadge
                        status={getValue()}
                        label={getValue() ? ReferenceName(referenceTypeId.kycStatuses, getValue()) : "Not Started"}
                    />
                ),
            },
            {
                header: "Registered At/By",
                accessorKey: "created_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                        <Typography>{row.original?.created_by ? row.original?.created_by : ""}</Typography>
                    </Column>
                ),
            },

            {
                header: "Updated At/By",
                accessorKey: "updated_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                        <Typography>{row.original?.updated_by ? row.original?.updated_by : ""}</Typography>
                    </Column>
                ),
            },
            {
                header: "Account Status",
                accessorKey: "is_active",
                cell: ({ getValue }) => <CustomerStatusBadge status={getValue() ? "active" : "blocked"} />,
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
        { label: "Created At", key: "created_ts" },
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
                        <Filter
                            fileName="CustomerReport"
                            success={pd_success}
                            loading={pd_loading}
                            csvReport={csvReport}
                            state={filterSchema}
                            downloadData={downloadData}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={CustomerReports?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={CustomerReports?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
                <KycStat
                    fromDate={filterSchema?.created_from_date}
                    toDate={filterSchema?.created_to_date}
                    pageName="customer_report"
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_CUSTOMER_REPORT] })(CustomerReports);
