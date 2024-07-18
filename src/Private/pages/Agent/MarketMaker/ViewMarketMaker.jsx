import Box from "@mui/material/Box";
import List from "@mui/material/List";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Row from "App/components/Row/Row";
import Tabs from "App/components/Tab/Tabs";
import Users from "../User/components/Users";
import Spacer from "App/components/Spacer/Spacer";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import SourceDetails from "App/core/source-detail/SourceDetails";
import PageContentContainer from "App/components/Container/PageContentContainer";
import IndividualStakeholders from "../Stakeholder/components/IndividualStakeholders";
import OrganizationStakeholders from "../Stakeholder/components/OrganizationStakeholders";

import { relatedTo } from "Private/data/b2b";
import { CountryNameById } from "App/helpers";
import buildRoute from "App/helpers/buildRoute";
import { MarketMakerActions as actions } from "./store";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import MarketMakerStatusBadge from "./components/MarketMakerStatusBade";

export default function ViewMarketMaker() {
    const dispatch = useDispatch();

    const { agentId } = useParams();

    const navigate = useNavigate();

    const { response, loading, loading: isLoading } = useSelector((state) => state.get_market_maker_details);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const id = open ? "simple-popover" : undefined;

    const definition = useSourceDetail([
        {
            title: "Basic Information",
            items: [
                {
                    label: "Agent Name",
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
                    label: "Registration Number",
                    accessorKey: "registrationNo",
                },
                {
                    label: "Registered Country",
                    cell: (data) => CountryNameById(data.registeredCountryId),
                },
                {
                    label: "Registered Date",
                    accessorKey: "registeredDate",
                },
                {
                    label: "Contact Number",
                    contactNo: "contactNo",
                },
                {
                    label: "Email",
                    accessorKey: "email",
                },
                {
                    label: "Website",
                    accessorKey: "website",
                },
                {
                    label: "Allowed Countries",
                    cell: (data) => (
                        <Row justifyContent="center">
                            <Typography fontWeight="600" maxWidth="200px" textOverflow="ellipsis" overflow="hidden">
                                {(data.allowedCountries ?? []).map((c) => c.countryName).join(", ")}
                            </Typography>
                            {data?.allowedCountries.length > 1 && (
                                <div>
                                    <Button size="small" aria-describedby={id} variant="outlined" onClick={handleClick}>
                                        View All
                                    </Button>
                                    <Popover
                                        id={id}
                                        open={open}
                                        anchorEl={anchorEl}
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right",
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right",
                                        }}
                                    >
                                        <List>
                                            {(data.allowedCountries ?? []).map((c) => (
                                                <ListItem>{c.countryName}</ListItem>
                                            ))}
                                        </List>
                                    </Popover>
                                </div>
                            )}
                        </Row>
                    ),
                },
                {
                    label: "Status",
                    cell: (data) => <MarketMakerStatusBadge statusId={data.status} label={data.status_value} />,
                },
            ],
        },
        {
            title: "Address Information",
            items: [
                {
                    label: "Country",
                    cell: (data) => CountryNameById(data.address.countryId),
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
                    label: "Postal Code",
                    accessorKey: "address.postCode",
                },
                {
                    label: "Unit",
                    accessorKey: "address.unit",
                },
                {
                    label: "Street",
                    accessorKey: "address.street",
                },
                {
                    label: "Street",
                    accessorKey: "address.address",
                },
            ],
        },
        {
            title: "Contact Person Information",
            items: [
                {
                    label: "Name",
                    accessorKey: "contactPerson.name",
                },
                {
                    label: "Designation",
                    accessorKey: "contactPerson.designation",
                },
                {
                    label: "Email",
                    accessorKey: "contactPerson.email",
                },
                {
                    label: "Country",
                    accessorKey: "contactPerson.country.country",
                },
                {
                    label: "Phone Number",
                    accessorKey: "contactPerson.phoneNo",
                    cell: ({ contactPerson }) =>
                        contactPerson.phoneNo ? `+${contactPerson.extension} - ${contactPerson.phoneNo}` : null,
                },
                {
                    label: "Mobile Number",
                    accessorKey: "contactPerson.mobileNo",
                    cell: ({ contactPerson }) =>
                        contactPerson.mobileNo ? `+${contactPerson.extension} - ${contactPerson.mobileNo}` : null,
                },
            ],
        },
    ]);

    useEffect(() => {
        dispatch(actions.get_market_maker_details(agentId));
    }, []);

    const tabs = [
        {
            key: "organization-stakeholders",
            tabName: "Organization Stakeholders",
            tabContent: (
                <OrganizationStakeholders
                    relatedTo={relatedTo.AGENT}
                    relatedId={agentId}
                    onAddStakeholder={() =>
                        navigate(buildRoute(routePaths.CreateAgentOrganizationStakeholder, agentId))
                    }
                    onEditStakeholder={(stakeholderId) =>
                        navigate(
                            buildRoute(routePaths.EditAgentOrganizationStakeholder, {
                                agentId,
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
                    relatedTo={relatedTo.AGENT}
                    relatedId={agentId}
                    onAddStakeholder={() => navigate(buildRoute(routePaths.CreateAgentIndividualStakeholder, agentId))}
                    onEditStakeholder={(stakeholderId) =>
                        navigate(
                            buildRoute(routePaths.EditAgentIndividualStakeholder, {
                                agentId,
                                stakeholderId,
                            }),
                        )
                    }
                />
            ),
        },
        {
            key: "user",
            tabName: "Users",
            tabContent: <Users agentId={agentId} />,
        },
    ];

    const data = response && response?.data;

    return (
        <PageContent
            documentTitle="Agents"
            breadcrumbs={[
                {
                    label: "Agents",
                    link: routePaths.ListAgent,
                },
                {
                    label: "View",
                },
            ]}
            topRightEndContent={
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                        navigate(buildRoute(routePaths.EditAgent, agentId));
                    }}
                >
                    Edit Agent
                </Button>
            }
        >
            <PageContentContainer title="Agent Details">
                <SourceDetails definition={definition} data={data} isLoading={isLoading} />
                <Divider />
                <Typography variant="h6">Documents</Typography>
                <Row gap={1}>
                    {data?.documents?.map((item, i) => {
                        return (
                            <Box key={i}>
                                <Typography variant="subtitle1" mb={1}>
                                    {item?.documentName}
                                </Typography>
                                <a href={item?.documentLink} target="_blank">
                                    <img
                                        src={item?.documentLink}
                                        alt={item?.documentName}
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            objectFit: "cover",
                                        }}
                                    />
                                </a>
                            </Box>
                        );
                    })}
                </Row>
            </PageContentContainer>
            <Spacer />
            <PageContentContainer>
                <Tabs tabs={tabs} />
            </PageContentContainer>
        </PageContent>
    );
}
