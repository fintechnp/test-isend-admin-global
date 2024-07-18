import Switch from "@mui/material/Switch";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";

import Row from "App/components/Row/Row";
import Tabs from "App/components/Tab/Tabs";
import Link from "App/components/Link/Link";
import Documents from "../Stakeholder/components/Documents";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import PageContentContainer from "App/components/Container/PageContentContainer";
import ChangeBusinessStatusModal from "./ChangeBusinessStatusModal";
import IndividualStakeholders from "../Stakeholder/components/IndividualStakeholders";
import OrganizationStakeholders from "../Stakeholder/components/OrganizationStakeholders";
import OrganizationStakeholderStatusBadge from "../Stakeholder/components/OrganizationStakeholderStatusBadge";

import { businessActions } from "./store";
import { relatedTo } from "Private/data/b2b";
import useModal from "Private/hooks/useModal";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { permissions } from "Private/data/permissions";
import { businessStatus } from "./data/businessStatus";
import SourceDetails from "App/core/source-detail/SourceDetails";
import HasPermission from "Private/components/shared/HasPermission";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import ToggleBusinessActiveStatus from "./components/ToggleBusinessActiveStatus";

export default function ViewBusiness() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { businessId } = useParams();

    const { isModalOpen, openModal, closeModal } = useModal("ChangeBusinessStatus");

    const { response, loading } = useSelector((state) => state.get_business_details);

    const data = response?.data;

    const fetchBusiness = () => dispatch(businessActions.get_business_details(businessId));

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "Business Name",
                    accessorKey: "name",
                },
                {
                    label: "Business Type",
                    accessorKey: "businessType",
                },
                {
                    label: "Brand Name",
                    accessorKey: "brandName",
                },
                {
                    label: "Email",
                    accessorKey: "email",
                },
                {
                    label: "Phone Number ",
                    cell: (data) => `+${data.registeredCountryPhoneExt} - ${data.phoneNo}`,
                },
                {
                    label: "Registered Country",
                    accessorKey: "registeredCountryName",
                },
                {
                    label: "Currency",
                    accessorKey: "currency",
                },
                {
                    label: "Registered Date ",
                    accessorKey: "registeredDate",
                },
                {
                    label: "Registration Number",
                    accessorKey: "registrationNo",
                },
                {
                    label: "Website",
                    accessorKey: "website",
                },
                {
                    label: "Is Self Registered ?",
                    cell: (data) => (data.isSelfRegistered ? "Yes" : "No"),
                },
                ...(!data?.isSelfRegistered
                    ? [
                          {
                              label: "Registered By Agent",
                              accessorKey: "marketMakerName",
                          },
                      ]
                    : []),
                {
                    label: "Status",
                    cell: (data) => <OrganizationStakeholderStatusBadge label={data.status} statusId={data.statusId} />,
                },
                {
                    label: "Active/Inactive Status",
                    cell: (data) => (
                        <ToggleBusinessActiveStatus
                            businessId={businessId}
                            statusId={data.activeStatusId}
                            onSuccess={fetchBusiness}
                        />
                    ),
                },
            ],
        },
        {
            title: "Address Details",
            items: [
                {
                    label: "Country",
                    accessorKey: "address.country",
                },
                {
                    label: "State",
                    accessorKey: "address.state",
                },
                {
                    label: "City",
                    accessorKey: "address.city",
                },
                {
                    label: "Address",
                    accessorKey: "address.address",
                },
                {
                    label: "Postal Code",
                    accessorKey: "address.postCode",
                },
                {
                    label: "Unit",
                    accessorKey: "address.unit",
                },
            ],
        },
        {
            title: "Contact Person Details",
            items: [
                {
                    label: "Name",
                    accessorKey: "contactPersonName",
                },
                {
                    label: "Designation",
                    accessorKey: "contactPersonDesignation",
                },
                {
                    label: "Country",
                    accessorKey: "contactPersonCountry.country",
                },
                {
                    label: "Email",
                    accessorKey: "contactPersonEmail",
                },
                {
                    label: "Phone Number",
                    cell: (data) =>
                        data.contactPersonPhoneNumber
                            ? `+${data.contactPersonExtension} - ${data.contactPersonPhoneNumber}`
                            : null,
                },
                {
                    label: "MobileNumber Number",
                    cell: (data) =>
                        data.contactPersonMobileNumber
                            ? `+${data.contactPersonExtension} - ${data.contactPersonMobileNumber}`
                            : null,
                },
            ],
        },
    ]);

    const tabData = [
        {
            key: "organization-stakeholders",
            tabName: "Organization Stakeholders",
            tabContent: (
                <OrganizationStakeholders
                    relatedTo={relatedTo.BUSINESS}
                    relatedId={businessId}
                    onAddStakeholder={() =>
                        navigate(buildRoute(routePaths.CreateBusinessOrganizationStakeholder, businessId))
                    }
                    onEditStakeholder={(stakeholderId) =>
                        navigate(
                            buildRoute(routePaths.EditBusinessOrganizationStakeholder, {
                                businessId,
                                stakeholderId,
                            }),
                        )
                    }
                />
            ),
        },
        {
            key: "individual-stakeholders",
            tabName: "Individual Stakeholders",
            tabContent: (
                <IndividualStakeholders
                    relatedTo={relatedTo.BUSINESS}
                    relatedId={businessId}
                    onAddStakeholder={() =>
                        navigate(buildRoute(routePaths.CreateBusinessIndividualStakeholder, businessId))
                    }
                    onEditStakeholder={(stakeholderId) =>
                        navigate(
                            buildRoute(routePaths.EditBusinessIndividualStakeholder, {
                                businessId,
                                stakeholderId,
                            }),
                        )
                    }
                />
            ),
        },
    ];

    useEffect(() => {
        fetchBusiness();
    }, []);

    return (
        <PageContent
            documentTitle={"B2B | Business"}
            breadcrumbs={[
                {
                    label: "Businesses",
                    link: routePaths.ListBusiness,
                },
                {
                    label: "View",
                },
            ]}
        >
            <PageContentContainer
                title="Business Details"
                topRightContent={
                    <>
                        {data?.statusId != businessStatus.PROFILE_INCOMPLETE && (
                            <PopoverButton variant="button">
                                {({ onClose }) => (
                                    <>
                                        <HasPermission permission={permissions.EDIT_B2B_BUSINESS}>
                                            {data?.statusId != businessStatus.APPROVED &&
                                                data?.statusId != businessStatus.PROFILE_INCOMPLETE && (
                                                    <ListItemButton
                                                        onClick={() =>
                                                            navigate(buildRoute(routePaths.EditBusiness, businessId))
                                                        }
                                                    >
                                                        Edit
                                                    </ListItemButton>
                                                )}
                                            <ListItemButton onClick={() => (openModal(), onClose())}>
                                                Update Status
                                            </ListItemButton>
                                        </HasPermission>
                                    </>
                                )}
                            </PopoverButton>
                        )}
                    </>
                }
            >
                {!loading && data?.statusId == businessStatus.PROFILE_INCOMPLETE && (
                    <Row>
                        <Typography>Business KYB is incomplete. To complete business KYB </Typography>&nbsp;{" "}
                        <Link
                            to={buildRoute(routePaths.CreateBusinessKYB, businessId)}
                            sx={{ textDecoration: "underline" }}
                        >
                            Click Here.
                        </Link>
                    </Row>
                )}
                <Row justifyContent="flex-end"></Row>
                <SourceDetails definition={definition} data={data} isLoading={loading} />
                <Divider />
                <Documents data={data?.documents ?? []} isLoading={loading} />
                {data && (
                    <ChangeBusinessStatusModal
                        open={isModalOpen}
                        onClose={closeModal}
                        businessId={businessId}
                        onSuccess={fetchBusiness}
                        currentStatusId={data.statusId}
                    />
                )}
            </PageContentContainer>
            {data?.statusId !== businessStatus.PROFILE_INCOMPLETE && (
                <PageContentContainer>
                    <Tabs tabs={tabData} />
                </PageContentContainer>
            )}
        </PageContent>
    );
}
