import Box from "@mui/material/Box";
import React, { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Paper from "App/components/Paper/Paper";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import Clipboard from "App/components/Clipboard/Clipboard";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import PageContent from "App/components/Container/PageContent";

import actions from "./../store/actions";
import { CurrencyName } from "App/helpers";
import dateUtils from "App/utils/dateUtils";
import getFlagUrl from "App/helpers/getFlagUrl";
import buildRoute from "App/helpers/buildRoute";
import useCountries from "App/hooks/useCountries";
import routePaths from "Private/config/routePaths";
import { getCustomerName } from "App/helpers/getFullName";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

const ValueWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.8,
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
}));

function BeneficiaryDetails(props) {
    const dispatch = useDispatch();
    const { id, bene_id } = useParams();
    const { getCountryByIso3 } = useCountries();

    const { response: beneficiaryData, loading: isLoading } = useSelector((state) => state.get_beneficiary_byid);

    const definition = useSourceDetail([
        {
            title: "Basic Information",
            items: [
                { label: "First Name", accessorKey: "first_name" },
                { label: "Middle Name", accessorKey: "middle_name" },
                { label: "Last Name", accessorKey: "last_name" },
                { label: "Gender", accessorKey: "gender" },
                {
                    label: "Mobile Number",
                    accessorKey: "mobile_number",
                    cell: (data) => `+${data?.phone_country_code} - ${data?.mobile_number}`,
                },
                {
                    label: "Phone Number",
                    accessorKey: "phone_number",
                    cell: (data) => `+${data?.phone_country_code} - ${data?.phone_number ?? "-"}`,
                },
                { label: "Email", accessorKey: "email" },
                { label: "Type", accessorKey: "receiver_type_data" },
                { label: "Receiver Type", accessorKey: "receiver_type" },
                { label: "Customer Id", accessorKey: "customer_id" },
                { label: "Title", accessorKey: "title" },
            ],
        },
        {
            title: "Collection Information",
            items: [
                { label: "Payment Type", accessorKey: "payment_type" },
                { label: "Bank Name", accessorKey: "bank_name" },
                { label: "Bank Branch Name", accessorKey: "bank_branch_name" },
                { label: "Account Number", accessorKey: "account_number" },
                { label: "Registered From", accessorKey: "registered_from" },
                { label: "Account Type", accessorKey: "account_type_data" },
                { label: "Branch Identifier", accessorKey: "branch_identifier_value" },
            ],
        },
        {
            title: "Other Information",
            items: [
                {
                    label: "Status",
                    accessorKey: "is_active",
                    cell: (data) => (
                        <ValueWrapper sx={{ wordBreak: "break-all" }}>
                            {data?.is_active ? (
                                <Tooltip title="Active Beneficiary" arrow>
                                    <CheckCircleOutlineIcon fontSize="small" sx={{ color: "success.main" }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Inactive Beneficiary." arrow>
                                    <DoNotDisturbOnIcon fontSize="small" sx={{ color: "warning.main" }} />
                                </Tooltip>
                            )}
                        </ValueWrapper>
                    ),
                },
                { label: "Unit", accessorKey: "unit" },
                { label: "Street", accessorKey: "street" },
                { label: "City", accessorKey: "city" },
                { label: "State", accessorKey: "state" },
                { label: "Address", accessorKey: "address" },
                {
                    label: "Country",
                    accessorKey: "country",
                    cell: (data) => <StyledTypography>{getCountryByIso3(data?.country)?.country}</StyledTypography>,
                },
                {
                    label: "Currency",
                    accessorKey: "currency",
                    cell: (data) => CurrencyName(data?.currency),
                },
                { label: "Post Code", accessorKey: "postcode" },
                {
                    label: "Date of Birth",
                    accessorKey: "date_of_birth",
                    cell: (data) => (
                        <StyledTypography>
                            {data?.date_of_birth ? dateUtils.getDate(data?.date_of_birth) : "-"}
                        </StyledTypography>
                    ),
                },
                { label: "Birth Country", accessorKey: "birth_country" },
                { label: "Relation", accessorKey: "relation" },
                { label: "Reason For Remittance", accessorKey: "reason_for_remittance" },
                { label: "Source of Income", accessorKey: "source_of_income" },
                { label: "Delivery Option ID", accessorKey: "delivery_option_id" },
                { label: "Payment Location ID", accessorKey: "payout_location_id" },
            ],
        },
        {
            title: "Identity Information",
            items: [
                {
                    label: "Id Type",
                    accessorKey: "id_type",
                },
                { label: "Id Number", accessorKey: "id_number" },
                { label: "Id Issued State", accessorKey: "id_issued_state" },
                { label: "Citizenship Issued Country", accessorKey: "citizenship_country" },
                { label: "Id Issued Country", accessorKey: "id_issued_country" },
                {
                    label: "Id Issued Date",
                    accessorKey: "id_issued_date",
                    cell: (data) => (
                        <StyledTypography>
                            {data?.id_issued_date ? dateUtils.getDate(data.id_issued_date) : "-"}
                        </StyledTypography>
                    ),
                },
                {
                    label: "Id Expiry Date",
                    accessorKey: "id_expiry_date",
                    cell: (data) => (
                        <StyledTypography>
                            {data?.id_expiry_date ? dateUtils.getDate(data.id_expiry_date) : "-"}
                        </StyledTypography>
                    ),
                },
            ],
        },
    ]);

    useEffect(() => {
        if (bene_id) {
            dispatch(actions.get_beneficiary_byid(bene_id));
        }
    }, [dispatch, bene_id]);

    return (
        <PageContent
            documentTitle="Beneficary Details"
            breadcrumbs={[
                {
                    label: "Customers",
                    link: routePaths.ListCustomer,
                },
                {
                    label: id,
                    link: buildRoute(routePaths.ViewCustomer, id),
                },
                {
                    label: "Beneficiaries",
                    link: buildRoute(routePaths.ListCustomerBeneficiary, id),
                },
                {
                    label: "View",
                },
            ]}
        >
            <Paper sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Row gap="12px">
                    <BadgeAvatar
                        avatarUrl={beneficiaryData?.data?.profile_picture}
                        altAvatarText={getCustomerName(beneficiaryData.data)}
                        smallAvatarUrl={getFlagUrl(beneficiaryData.data?.country_iso2)}
                        enableSkeleton={isLoading}
                    />
                    <Column>
                        {isLoading ? (
                            <>
                                <Skeleton width="250px" height="24px" />
                                <Skeleton width="150px" />
                                <Skeleton width="130px" />
                                <Skeleton width="100px" />
                            </>
                        ) : (
                            <>
                                <Row alignItems="center" gap="4px">
                                    <Row alignItems="center">
                                        <Typography variant="subtitle0">
                                            {getCustomerName(beneficiaryData?.data)} (
                                        </Typography>
                                        <Clipboard
                                            content={beneficiaryData?.data?.beneficiary_id}
                                            label={
                                                <Typography variant="subtitle0">
                                                    {beneficiaryData?.data?.beneficiary_id}
                                                </Typography>
                                            }
                                        />
                                        <Typography variant="subtitle0">)</Typography>
                                    </Row>
                                </Row>
                                <Typography variant="body1" color="text.secondary">
                                    {beneficiaryData?.data?.date_of_birth
                                        ? `${beneficiaryData?.data?.date_of_birth?.substring(0, 10)} /
                                    ${beneficiaryData?.data?.gender ?? "-"}`
                                        : "-"}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {beneficiaryData?.data?.email}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    +{beneficiaryData.data?.phone_country_code} - {beneficiaryData?.data?.phone_number}
                                </Typography>
                            </>
                        )}
                    </Column>
                </Row>
                <Divider />
                <SourceDetails definition={definition} data={beneficiaryData?.data} isLoading={isLoading} />
            </Paper>
        </PageContent>
    );
}

export default BeneficiaryDetails;
