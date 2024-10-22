import * as Yup from "yup";
import { isAfter } from "date-fns";
import styled from "@emotion/styled";
import { useEffect, useMemo } from "react";
import dateUtils from "App/utils/dateUtils";
import ReportActions from "../store/actions";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

import getFlagUrl from "App/helpers/getFlagUrl";
import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import routePaths from "Private/config/routePaths";
import ReferralCodeBadge from "./components/ReferralCodeBadge";
import ReferralStatusBadge from "./components/ReferralStatusBadge";

const schema = Yup.object().shape({
    from_date: Yup.string().nullable().optional(),
    to_date: Yup.string()
        .nullable()
        .optional()
        .when("from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                Yup.string().test({
                    name: "is-after",
                    message: "To Date must be after From Date",
                    test: function (value) {
                        const { from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(from_date)) : true;
                    },
                }),
            otherwise: (schema) => Yup.string().nullable().optional(),
        }),
});

const initialState = {
    page_size: 10,
    page_number: 1,
};

const CustomerDetailsWrapper = styled("Typography")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    color: theme.palette.text.secondary,
}));

export default function ListReferralReport() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onFilterSubmit,
        reset,
        onDeleteFilterParams,
        filterSchema,
        onPageChange,
        onRowsPerPageChange,
    } = methods;

    const { response: referralReport, loading: isLoading } = useSelector((state) => state.get_referral_reports);

    const referralReportData = referralReport?.data ?? [];

    useEffect(() => {
        dispatch(ReportActions.get_referral_reports(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
        },
        {
            header: "Referral",
            cell: ({ row }) => (
                <Column
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                    }}
                >
                    <BadgeAvatar
                        avatarUrl={getFlagUrl(row.original.referrer_iso2)}
                        avatarDimension={20}
                        smallAvatarDimension={0}
                    />
                    <Column>
                        <Typography variant="body1">
                            {!isEmpty(row.original.referrer_name) ? row.original.referrer_name : "N/A"} (
                            {!isEmpty(row.original.referrer_customer_id) ? row.original.referrer_customer_id : "-"})
                        </Typography>
                        <CustomerDetailsWrapper>
                            <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />
                            {!isEmpty(row.original.referrer_mobile_no) ? row.original.referrer_mobile_no : "n/a"}
                        </CustomerDetailsWrapper>
                    </Column>
                </Column>
            ),
        },
        {
            header: "Referee",
            cell: ({ row }) => (
                <Column
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 2,
                    }}
                >
                    <BadgeAvatar
                        avatarUrl={getFlagUrl(row.original.referee_iso2)}
                        avatarDimension={20}
                        smallAvatarDimension={0}
                    />
                    <Column>
                        <Typography variant="body1">
                            {!isEmpty(row.original.referee_name) ? row.original.referee_name : "N/A"} (
                            {!isEmpty(row.original.referee_customer_id) ? row.original.referee_customer_id : "-"})
                        </Typography>
                        <CustomerDetailsWrapper>
                            <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />
                            {!isEmpty(row.original.referee_mobile_no) ? row.original.referee_mobile_no : "n/a"}
                        </CustomerDetailsWrapper>
                    </Column>
                </Column>
            ),
        },
        {
            header: "Referral Code",
            accessorKey: "referrer_referral_code",
            cell: ({ getValue }) => <ReferralCodeBadge code={getValue() ?? "N/A"}></ReferralCodeBadge>,
        },

        {
            header: () => <Typography textAlign="center">Referee Status</Typography>,
            id: "referral-status",
            columns: [
                {
                    header: "Registration Date",
                    accessorKey: "referrer_registered_date",
                    cell: ({ getValue }) => (
                        <>{getValue() ? dateUtils.getFormattedDate(getValue(), "MM/DD/YYYY hh:mm A") : "-"}</>
                    ),
                },
                {
                    header: "KYC Status",
                    accessorKey: "referee_kyc_status_name",
                    cell: ({ row }) => <ReferralStatusBadge status={row.original.referee_kyc_status} />,
                },
            ],
        },

        {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => {
                return (
                    <Button
                        onClick={() => navigate(buildRoute(routePaths.ViewReferralReport, row?.original?.referral_id))}
                    >
                        View
                    </Button>
                );
            },
        },
    ]);

    const filterFields = [
        {
            type: fieldTypes.DATE,
            label: "From Date",
            name: "from_date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            label: "To Date",
            name: "to_date",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Customer ID",
            name: "customer_id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Customer Name",
            name: "customer_name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Mobile Number",
            name: "mobilenumber",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Email",
            name: "email",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Referral Code",
            name: "referral_code",
        },
    ];

    return (
        <PageContent
            documentTitle="Referral Report"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Generate Reports",
                },
                {
                    label: "Referral Report",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Referral Report"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    values={filterSchema}
                    fields={filterFields}
                    schema={schema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="Referral Report">
                    <TanstackReactTable columns={columns} data={referralReportData} loading={isLoading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={referralReport?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
