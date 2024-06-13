import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import { useParams, useNavigate } from "react-router-dom";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import UpdateKyc from "./UpdateKyc";
import Row from "App/components/Row/Row";
import Button from "@mui/material/Button";
import Paper from "App/components/Paper/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "App/components/Tooltip/Tooltip";
import actions from "./../CreateCustomer/store/actions";
import Clipboard from "App/components/Clipboard/Clipboard";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import KycStatusBadge from "../Search/components/KycStatusBadge";
import RecentlyAddedBeneficiaries from "./RecentlyAddedBeneficiaries";
import CustomerStatusBadge from "../Search/components/CustomerStatusBadge";
import UpdateCustomerAccountModal from "../Account/UpdateCustomerAccountModal";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { ReferenceName } from "App/helpers";
import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import getFlagUrl from "App/helpers/getFlagUrl";
import { useConfirm } from "App/core/mui-confirm";
import Column from "App/components/Column/Column";
import routePaths from "Private/config/routePaths";
import { customerType } from "Private/data/customerType";
import { getCustomerName } from "App/helpers/getFullName";
import referenceTypeId from "Private/config/referenceTypeId";
import SourceDetails from "App/core/source-detail/SourceDetails";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import customerActions from "Private/pages/Customers/Documents/store/actions";

const CustomerTypeContainer = styled("div")(({ theme }) => ({
    "& .MuiIconButton-root": {
        backgroundColor: theme.palette.surface.primarySecond,
        "&:hover": {
            backgroundColor: theme.palette.surface.primarySecond,
        },
        "& .MuiSvgIcon-root": {
            color: theme.palette.primary.main,
        },
    },
}));

function CustomerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = useConfirm();

    const { response: customersData, loading: isLoading } = useSelector((state) => state.get_customer_byid);

    const data = customersData?.data;

    const { success: update_success } = useSelector((state) => state.update_kyc);

    useEffect(() => {
        dispatch({ type: "GET_CUSTOMER_BYID_RESET" });
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_customer_byid(id));
            dispatch({ type: "UPDATE_KYC_RESET" });
        }
    }, [dispatch, id, update_success]);

    const handleKycReset = () => {
        confirm({
            description: "This action will a reset a KYC verification attempt limit for this customer?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(customerActions.reset_kyc_verification(id));
        });
    };

    const definition = useSourceDetail([
        {
            title: "Address Details",
            items: [
                {
                    label: "Country",
                    accessorKey: "country_data",
                },
                {
                    label: "Postal Code",
                    accessorKey: "postcode",
                },
                {
                    label: "City",
                    accessorKey: "city",
                },
                {
                    label: "Unit",
                    accessorKey: "unit",
                },
                {
                    label: "Street ",
                    accessorKey: "street",
                },
                {
                    label: "Street Type",
                    accessorKey: "street_type_data",
                },
                {
                    label: "State",
                    accessorKey: "state_data",
                },
                {
                    label: "Birth Country",
                    accessorKey: "birth_country_data",
                },
                {
                    label: "Nationality",
                    accessorKey: "citizenship_country_data",
                },
            ],
        },
        {
            title: "Document Details",
            items: [
                {
                    label: "Document Type",
                    accessorKey: "id_type",
                },
                {
                    label: "Document Number",
                    accessorKey: "id_number",
                },
                {
                    label: "Issued Country",
                    accessorKey: "id_issued_country_data",
                },
                {
                    label: "Issued Date",
                    cell: (data) => (data?.id_issue_date ? dateUtils.getDate(data?.id_issue_date) : "-"),
                },
                {
                    label: "Expiry Date",
                    cell: (data) => (data?.id_expiry_date ? dateUtils.getDate(data?.id_expiry_date) : "-"),
                },
            ],
        },
        {
            title: "Other Details",
            items: [
                {
                    label: "Occupation",
                    accessorKey: "occupation_data",
                },
                {
                    label: "Source of Income",
                    accessorKey: "source_of_income_data",
                },
                {
                    label: "Finicity Customer ID",
                    accessorKey: "finicity_customer_id",
                },
                {
                    label: "SSN Number",
                    accessorKey: "ssn_number",
                },
                {
                    label: "Registered Agent Id",
                    accessorKey: "register_agent_id",
                },
                {
                    label: "Registered Agent",
                    accessorKey: "register_agent_name",
                },
                {
                    label: "Account Status",
                    cell: (data) => <CustomerStatusBadge status={data?.is_active ? "active" : "blocked"} />,
                },
            ],
        },
    ]);

    return (
        <PageContent
            documentTitle="Customer Details"
            breadcrumbs={[
                {
                    label: "Customers",
                    link: routePaths.ListCustomer,
                },
                {
                    label: "View",
                },
            ]}
        >
            <Paper sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <Row gap="12px">
                    <BadgeAvatar
                        avatarUrl={data?.profile_picture}
                        altAvatarText={getCustomerName(data)}
                        smallAvatarUrl={getFlagUrl(data?.country_iso2)}
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
                                        <Typography variant="subtitle0">{getCustomerName(data)} (</Typography>
                                        <Clipboard
                                            content={data?.customer_id}
                                            label={<Typography variant="subtitle0">{data?.customer_id}</Typography>}
                                        />
                                        <Typography variant="subtitle0">)</Typography>
                                    </Row>
                                    <CustomerTypeContainer>
                                        <Tooltip title={data?.customer_type_data} placement="top" arrow>
                                            <IconButton size="small">
                                                {(() => {
                                                    if (customerType.isIndividual(data?.customer_type)) {
                                                        return <PersonRoundedIcon />;
                                                    }
                                                    if (customerType.isOrganization(data?.customer_type)) {
                                                        return <BusinessRoundedIcon />;
                                                    }
                                                })()}
                                            </IconButton>
                                        </Tooltip>
                                    </CustomerTypeContainer>
                                    <KycStatusBadge
                                        status={data?.kyc_status}
                                        label={
                                            data?.kyc_status
                                                ? ReferenceName(referenceTypeId.kycStatuses, data?.kyc_status)
                                                : ""
                                        }
                                    />
                                </Row>
                                <Tooltip></Tooltip>
                                <Typography variant="body1" color="text.secondary">
                                    {data?.date_of_birth?.substring(0, 10)} / {data?.gender}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {data?.email}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    +{data?.phone_country_code} - {data?.phone_number}
                                </Typography>
                            </>
                        )}
                    </Column>
                    <PopoverButton variant="button" disabled={isLoading}>
                        {({ onClose }) => (
                            <>
                                <ListItemButton
                                    onClick={() => navigate(buildRoute(routePaths.ListCustomerTransaction, id))}
                                >
                                    Transactions
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => navigate(buildRoute(routePaths.ListCustomerDocument, id))}
                                >
                                    Documents
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => {
                                        dispatch({
                                            type: "OPEN_UPDATE_CUSTOMER_ACCOUNT_MODAL",
                                            customer_id: id,
                                            initial_form_state: {
                                                country: customersData?.data?.country,
                                                phone_country_code: customersData?.data?.phone_country_code,
                                                mobile_number: customersData?.data?.mobile_number,
                                                email: customersData?.data?.email,
                                            },
                                        });
                                        onClose();
                                    }}
                                >
                                    Edit Account
                                </ListItemButton>
                                <UpdateKyc onClose={onClose} />
                                <ListItemButton onClick={() => navigate(buildRoute(routePaths.ListCustomerBank, id))}>
                                    Banks
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => navigate(buildRoute(routePaths.ListCustomerBeneficiary, id))}
                                >
                                    Beneficiaries
                                </ListItemButton>
                                <ListItemButton onClick={() => navigate(buildRoute(routePaths.ListCustomerRemark, id))}>
                                    Remarks
                                </ListItemButton>
                                <ListItemButton onClick={handleKycReset}> Reset KYC Limit</ListItemButton>
                            </>
                        )}
                    </PopoverButton>
                </Row>
                <Divider />
                <SourceDetails definition={definition} data={data} isLoading={isLoading} />
            </Paper>

            <PageContentContainer
                title="Beneficiaries"
                topRightContent={
                    <Button
                        onClick={() => navigate(buildRoute(routePaths.ListCustomerBeneficiary, id))}
                        endIcon={<ArrowForwardRoundedIcon />}
                        disabled={isLoading}
                    >
                        View all
                    </Button>
                }
            >
                <RecentlyAddedBeneficiaries />
            </PageContentContainer>
            <UpdateCustomerAccountModal />
        </PageContent>
    );
}

export default CustomerDetails;
