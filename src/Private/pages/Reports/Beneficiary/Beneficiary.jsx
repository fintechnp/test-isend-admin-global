import * as Yup from "yup";
import { isAfter } from "date-fns";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filter from "../Shared/Filter";
import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import PhoneIcon from "App/components/Icon/PhoneIcon";
import { TablePagination } from "App/components/Table";
import ExportPdfTable from "./components/ExportBeneficiary";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import CustomerAvatar from "App/components/Avatar/CustomerAvatar";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import ActiveBlockedStatusBadge from "App/components/Badge/ActiveBlockedStatusBadge";

import actions from "../store/actions";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import calculateAge from "App/helpers/calculateAge";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import { CountryName, ReferenceName } from "App/helpers";
import { getCustomerName } from "App/helpers/getFullName";
import useListFilterStore from "App/hooks/useListFilterStore";

const schema = Yup.object().shape({
    created_from_date: Yup.string()
        .nullable()
        .test({
            name: "from-to-pair",
            message: "From Date is required",
            test: function (value) {
                const { created_to_date } = this.parent;
                return !created_to_date || !!value;
            },
        })
        .optional(),

    created_to_date: Yup.string()
        .nullable()
        .test({
            name: "from-to-pair",
            message: "To Date is required",
            test: function (value) {
                const { created_from_date } = this.parent;
                return !created_from_date || !!value;
            },
        })
        .when("created_from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                schema.test({
                    name: "is-after",
                    message: "To Date must be after From Date",
                    test: function (value) {
                        const { created_from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(created_from_date)) : true;
                    },
                }),
        }),
});

const initialState = {
    page_number: 1,
    page_size: 10,
    created_from_date: dateUtils.getDateBeforeTwoWeeks(),
    created_to_date: dateUtils.getTodayDate(),
    sort_by: "created_ts",
    order_by: "DESC",
};

function BeneficiaryReports() {
    const dispatch = useDispatch();

    const { response: BeneficiaryReports, loading: l_loading } = useSelector((state) => state.get_beneficiary_report);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "BENEFICIARY_REPORT_RESET" });
    }, [dispatch]);

    const {
        openFilter,
        closeFilter,
        isFilterOpen,
        filterSchema,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
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
            type: fieldTypes.TEXTFIELD,
            name: "beneficiary_id",
            label: "Beneficiary ID",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_id",
            label: "Customer ID",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "name",
            label: "Beneficiary Name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "id_number",
            label: "Customer Id Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_mobile_number",
            label: "Customer Phone Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "beneficiary_mobile_number",
            label: "Beneficiary Phone Number",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },
        {
            type: fieldTypes.SELECT,
            name: "status",
            label: "Status",
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
    ];

    useEffect(() => {
        dispatch(actions.get_beneficiary_report(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Beneficiary Details",
                accessorKey: "first_name",
                cell: ({ row }) => {
                    const age = calculateAge(row.original?.date_of_birth ?? "");

                    const caption = [age ? `${age} y` : "", row.original.gender].filter((value) => !isEmpty(value));

                    return (
                        <Row gap="8px">
                            <CustomerAvatar
                                name={getCustomerName(row.original)}
                                countryIso2Code={row.original?.country_iso2 ?? ""}
                            />
                            <Column>
                                <Typography fontWeight={500}>
                                    {getCustomerName(row.original)} ({row.original.beneficiary_id})
                                </Typography>
                                <Row alignItems="center" gap="2px">
                                    <PhoneIcon />
                                    <Typography variant="caption">
                                        {!isEmpty(row.original.phone_number)
                                            ? row.original.phone_number
                                            : row.original.beneficiary_mobile_number}
                                        {caption.length > 0 ? ", " : null} {caption.join(" / ")}
                                    </Typography>
                                </Row>
                            </Column>
                        </Row>
                    );
                },
            },
            {
                header: "Beneficiary Address",
                accessorKey: "country",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{`${row?.original?.street} ${row?.original?.address ?? ""} ${row?.original?.city ?? ""}, `}</Typography>
                        <Typography>
                            {`${row?.original?.state ? row?.original?.state + "," : ""} ${CountryName(getValue())}`}
                        </Typography>
                    </Column>
                ),
            },
            {
                header: "Relation",
                accessorKey: "relation",
            },
            {
                header: "Customer Name",
                accessorKey: "customer_name",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography fontWeight={500}>
                            {getValue()} ({row.original.customer_id})
                        </Typography>
                        {!isEmpty(row.original.customer_mobile_number) && (
                            <Row alignItems="center" gap="2px">
                                <PhoneIcon />
                                <Typography variant="caption">{row.original.customer_mobile_number}</Typography>
                            </Row>
                        )}
                    </Column>
                ),
            },
            {
                header: "Delivery Method",
                accessorKey: "payment_type",
                cell: ({ getValue, row }) => <>{getValue() ? ReferenceName(1, getValue()) : ""}</>,
            },
            {
                header: "Delivery Details",
                accessorKey: "bank_name",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ?? ""}</Typography>
                        <Typography>{row?.original?.account_number ? row?.original?.account_number : ""}</Typography>
                    </Column>
                ),
            },
            {
                header: "Created At/By",
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
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue, row }) => <ActiveBlockedStatusBadge status={getValue() ? "active" : "blocked"} />,
            },
        ],
        [],
    );

    //Downloads
    const headers = [
        { label: "Name", key: "first_name" },
        { label: "Country", key: "country" },
        { label: "Customer", key: "customer_id" },
        { label: "Contact", key: "mobile_number" },
        { label: "Bank Name", key: "bank_name" },
        { label: "Pay. Type", key: "payment_type" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Beneficiary",
        start: dateUtils.getLocalDateFromUTC(filterSchema?.created_from_date),
        end: dateUtils.getLocalDateFromUTC(filterSchema?.created_to_date),
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/beneficiary"));
    };

    return (
        <PageContent
            documentTitle="Beneficiary Report"
            breadcrumbs={[{ label: "Generate Report" }, { label: "Beneficiaries" }]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
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
                    title="Search Beneficiary"
                    onReset={reset}
                />

                <PageContentContainer
                    title="Beneficiaries"
                    topRightContent={
                        <Filter
                            fileName="BeneficiaryReport"
                            success={pd_success}
                            loading={pd_loading}
                            csvReport={csvReport}
                            state={filterSchema}
                            downloadData={downloadData}
                            custompdfTable={<ExportPdfTable reportData={csvReport} />}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={BeneficiaryReports?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={BeneficiaryReports?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_BENEFICIARY_REPORT] })(BeneficiaryReports);
