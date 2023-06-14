import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import UpdateKyc from "./UpdateKyc";
import Button from "App/components/Button/Button";
import actions from "./../CreateCustomer/store/actions";
import NoResults from "./../Search/components/NoResults";
import PageContent from "App/components/Container/PageContent";
import UpdateCustomerAccountModal from "../Account/UpdateCustomerAccountModal";

import { CountryName, FormatDate, ReferenceName } from "App/helpers";

const Header = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    lineHeight: 1.5,
    fontSize: "20px",
    fontWeight: 600,
    padding: "4px 0px",
    color: theme.palette.primary.dark,
}));

const NameBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    alignItems: "center",
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 18,
    height: 18,
    border: `1px solid ${theme.palette.primary.contrastText}`,
}));

const NameField = styled(Box)(({ theme }) => ({
    flexGrow: 1,
}));

const BottomButton = styled(Button)(({ theme }) => ({
    minWidth: "120px",
    padding: "4px 10px",
    textTransform: "capitalize",
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    paddingBottom: "2px",
    paddingTop: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
}));

const Title = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    paddingRight: 2,
    lineHeight: 1.4,
    fontSize: "16px",
    fontWeight: 600,
    color: theme.palette.primary.dark,
}));

const Label = styled(Typography)(({ theme }) => ({
    paddingRight: "3px",
    lineHeight: 1.5,
    fontSize: "15px",
    fontWeight: 500,
}));

const Value = styled(Typography)(({ value }) => ({
    opacity: 0.8,
    lineHeight: 1.5,
    fontSize: "15px",
    fontWeight: 400,
    textTransform: value === "Email Address" ? "lowercase" : "capitalize",
}));

const InfoWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const LabelWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.9,
    minWidth: "40%",
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.dark,
}));

const ValueWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.8,
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
}));

const Fetching = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: "16px",
    fontWeight: 400,
}));

function stringToColor(string = "Avatar") {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(first = "A", last) {
    return {
        sx: {
            bgcolor: stringToColor(first),
            height: "50px",
            width: "50px",
            textTransform: "uppercase",
        },
        children: `${first.split(" ")[0][0]}${last ? last.split(" ")[0][0] : ""}`,
    };
}

const RenderField = ({ label, value }) => {
    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Box sx={{ width: "40%" }}>
                <Label>{label}:</Label>
            </Box>
            <Box sx={{ width: "60%" }}>
                <Value value={label}>{value ? value : "N/A"}</Value>
            </Box>
        </Box>
    );
};

const RenderTopField = ({ label, value }) => {
    return (
        <Box
            sx={{
                marginLeft: 1,
                width: "100%",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Box sx={{ minWidth: "15%" }}>
                <Label sx={{ fontWeight: 600, opacity: 0.8, lineHeight: 1.4 }}>{label}:</Label>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Value>{value ? value : "N/A"}</Value>
            </Box>
        </Box>
    );
};

function CustomerDetails(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { response: customersData, loading: l_loading, success } = useSelector((state) => state.get_customer_byid);

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

    if (l_loading && !success) {
        return (
            <PageContent title="Customer Details">
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                    <Fetching>Fetching...</Fetching>
                </Box>
            </PageContent>
        );
    } else if (
        customersData?.data === undefined ||
        customersData?.data === null ||
        (customersData?.data != null && customersData?.data.length == 0)
    ) {
        return (
            <PageContent title="Customer Details">
                <Grid container rowGap={1}>
                    <Grid item xs={12}>
                        <NoResults text="Invalid Customer Id" />
                    </Grid>
                </Grid>
            </PageContent>
        );
    }

    return (
        <PageContent title="Customer Details">
            <Grid container rowSpacing={1}>
                <Grid item xs={12}>
                    <NameBox>
                        <Box sx={{ p: 1.5 }}>
                            <Badge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                badgeContent={
                                    <SmallAvatar
                                        alt="flag iso3"
                                        src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${
                                            customersData?.data?.country_iso2 || "US"
                                        }.svg`}
                                    />
                                }
                            >
                                <Avatar
                                    {...stringAvatar(customersData?.data?.first_name, customersData?.data?.last_name)}
                                />
                            </Badge>
                        </Box>
                        <NameField>
                            <RenderTopField
                                label="Name"
                                value={`${customersData?.data?.first_name}${" "}${
                                    customersData?.data?.middle_name
                                        ? " " + customersData?.data?.middle_name + " "
                                        : " "
                                }${customersData?.data?.last_name ? customersData?.data?.last_name : ""}`}
                            />
                            <RenderTopField label="Customer Id" value={customersData?.data?.customer_id} />
                        </NameField>
                    </NameBox>
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Basic Information</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Firstname" value={customersData?.data?.first_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Mid-name" value={customersData?.data?.middle_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Lastname" value={customersData?.data?.last_name} />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Gender"
                        value={customersData?.data?.gender ? ReferenceName(42, customersData?.data?.gender) : ""}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Mobile Number" value={customersData?.data?.mobile_number} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Phone Number" value={customersData?.data?.phone_number} />
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Identity Information</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Type" value={customersData?.data?.id_type} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Number" value={customersData?.data?.id_number} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Phone Country Code" value={customersData?.data?.phone_country_code} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="SSN Number" value={customersData?.data?.ssn_number} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Finicity Customer ID" value={customersData?.data?.finicity_customer_id} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Issued State" value={customersData?.data?.id_issued_state} />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Issued Country" value={customersData?.data?.id_issued_country_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Issued Date" value={FormatDate(customersData?.data?.id_issue_date)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Expiry Date" value={FormatDate(customersData?.data?.id_expiry_date)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="KYC Status"
                        value={
                            customersData?.data?.kyc_status ? ReferenceName(21, customersData?.data?.kyc_status) : ""
                        }
                    />
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Other Details</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Customer Type"
                        value={
                            customersData?.data?.customer_type
                                ? ReferenceName(37, customersData?.data?.customer_type)
                                : ""
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Email Address" value={customersData?.data?.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Title" value={customersData?.data?.title} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Post Code" value={customersData?.data?.postcode} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Address" value={customersData?.data?.address} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Country" value={customersData?.data?.country_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="City" value={customersData?.data?.city} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Unit" value={customersData?.data?.unit} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Street" value={customersData?.data?.street} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Street Type" value={customersData?.data?.street_type} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Street No" value={customersData?.data?.street_no} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="State" value={customersData?.data?.state} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="State Data" value={customersData?.data?.state_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Citizenship Country" value={customersData?.data?.citizenship_country} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Nationality" value={customersData?.data?.citizenship_country_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Date of Birth" value={customersData?.data?.date_of_birth?.substring(0, 10)} />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField label="Birth Country" value={CountryName(customersData?.data?.birth_country)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Occupation" value={customersData?.data?.occupation_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Source Of Income " value={customersData?.data?.source_of_income_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Register Agent ID" value={customersData?.data?.register_agent_id} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Register Agent" value={customersData?.data?.register_agent_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InfoWrapper>
                        <LabelWrapper>Status:</LabelWrapper>
                        <ValueWrapper sx={{ wordBreak: "break-all" }}>
                            {customersData?.data?.is_active ? (
                                <Tooltip title="Active Customer" arrow>
                                    <CheckCircleOutlineIcon fontSize="small" sx={{ color: "success.main" }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Inactive Customer." arrow>
                                    <DoNotDisturbOnIcon fontSize="small" sx={{ color: "warning.main" }} />
                                </Tooltip>
                            )}
                        </ValueWrapper>
                    </InfoWrapper>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" gap={2}>
                        <Button onClick={() => navigate(`/customer/all-beneficiary/${id}`)}>Beneficiaries</Button>
                        <Button onClick={() => navigate(`/customer/remarks/${id}`)}>Remarks</Button>
                        <Button onClick={() => navigate(`/customer/all-transactions/${id}`)}>Transactions</Button>
                        <Button onClick={() => navigate(`/customer/documents/${id}`)}>Documents</Button>
                        <UpdateKyc />
                        <UpdateCustomerAccountModal />
                        <Button
                            onClick={() =>
                                dispatch({
                                    type: "OPEN_UPDATE_CUSTOMER_ACCOUNT_MODAL",
                                    customer_id: id,
                                    initial_form_state: {
                                        country: customersData?.data?.country,
                                        phone_country_code: customersData?.data?.phone_country_code,
                                        mobile_number: customersData?.data?.mobile_number,
                                        email: customersData?.data?.email,
                                    },
                                })
                            }
                        >
                            Account
                        </Button>
                        <Button onClick={() => navigate(`/customer/banks/${id}`)}>Banks</Button>
                    </Box>
                </Grid>
            </Grid>
        </PageContent>
    );
}

export default CustomerDetails;
