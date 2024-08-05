import styled from "@emotion/styled";
import Row from "App/components/Row/Row";
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
import FilterForm from "App/components/Filter/FilterForm";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import routePaths from "Private/config/routePaths";
import ReferralCode from "./components/ReferralCodeBadge";
import KycStatusBadge from "Private/pages/Customers/Search/components/KycStatusBadge";

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
                        avatarUrl={getFlagUrl(row.original.iso2)}
                        avatarDimension={20}
                        smallAvatarDimension={0}
                    />
                    <Column>
                        <Typography variant="body1">
                            {row.original.customer_name ? row.original.customer_name : "-"} (
                            {row.original.customer_id ? row.original.customer_id : "-"})
                        </Typography>
                        <CustomerDetailsWrapper>
                            <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />
                            {row.original.mobile_number ? row.original.mobile_number : "n/a"}
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
                        avatarUrl={getFlagUrl(row.original.referreriso2)}
                        avatarDimension={20}
                        smallAvatarDimension={0}
                    />
                    <Column>
                        <Typography variant="body1">
                            {row.original.referred_by ? row.original.referred_by : "-"} (
                            {row.original.referred_by_customer_id ? row.original.referred_by_customer_id : "-"})
                        </Typography>
                        <CustomerDetailsWrapper>
                            <PhoneOutlinedIcon sx={{ marginRight: 1 }} fontSize="12px" />
                            {row.original.referred_by_mobilenumber ? row.original.referred_by_mobilenumber : "n/a"}
                        </CustomerDetailsWrapper>
                    </Column>
                </Column>
            ),
        },
        {
            header: "Referral Code",
            accessorKey: "referral_code",
            cell: ({ getValue }) => <ReferralCode code={getValue()}></ReferralCode>,
        },

        {
            header: () => <Typography textAlign="center">Referee Status</Typography>,
            id: "referral-status",
            columns: [
                {
                    header: "Registration Date",
                    accessorKey: "created_ts",
                    cell: ({ getValue }) => <>{dateUtils.getLocalDateTimeFromUTC(getValue())}</>,
                },
                {
                    header: "KYC Status",
                    accessorKey: "kyc_status_name",
                    cell: ({ row }) => (
                        <>{<KycStatusBadge status={row.original.kyc_status} label={row.original.kyc_status_name} />}</>
                    ),
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
            type: "date",
            label: "From Date",
            name: "from_date",
        },
        {
            type: "date",
            label: "To Date",
            name: "to_date",
        },
        {
            type: "text",
            label: "Customer ID",
            name: "customer_id",
        },
        {
            type: "text",
            label: "Customer Name",
            name: "customer_name",
        },
        {
            type: "textfield",
            label: "Mobile Number",
            name: "mobile_number",
        },
        {
            type: "text",
            label: "Email",
            name: "email",
        },
        {
            type: "text",
            label: "Referral Code",
            name: "referral_code",
        },
    ];

    return (
        <PageContent
            title="Referral Report"
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
                    fields={filterFields}
                    schema={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer>
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
