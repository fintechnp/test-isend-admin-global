import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import NoResults from "./../../Search/components/NoResults";
import actions from "./../store/actions";
import { CountryName, FormatDate, ReferenceName, CurrencyName } from "./../../../../../App/helpers";

const DetailWrapper = styled(Grid)(({ theme }) => ({
    padding: "8px 16px 16px 16px",
    width: "100%",
    minHeight: "200px",
    borderRadius: "6px",
    background: theme.palette.background.light,
}));

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

const Value = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    lineHeight: 1.5,
    fontSize: "15px",
    fontWeight: 400,
    textTransform: "capitalize",
}));

const EmailValue = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    lineHeight: 1.5,
    fontSize: "15px",
    fontWeight: 400,
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

const RenderField = ({ label, prevalue, value }) => {
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
                {prevalue && (
                    <Value component="span" sx={{ paddingRight: "6px" }}>
                        {prevalue}
                    </Value>
                )}
                <Value component="span">{value ? value : "N/A"}</Value>
            </Box>
        </Box>
    );
};

const RenderEmailField = ({ label, prevalue, email }) => {
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
                <EmailValue component="span">{email ? email : "N/A"}</EmailValue>
            </Box>
        </Box>
    );
};

const RenderMobileField = ({ label, prevalue, value }) => {
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
                {prevalue && (
                    <Value component="span" sx={{ paddingRight: "6px" }}>
                        +{prevalue}
                    </Value>
                )}
                <Value component="span">{value ? value : "N/A"}</Value>
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

function BeneficiaryDetails(props) {
    const dispatch = useDispatch();
    const { bene_id } = useParams();

    const {
        response: beneficiaryData,
        loading: l_loading,
        success,
    } = useSelector((state) => state.get_beneficiary_byid);

    useEffect(() => {
        if (bene_id) {
            dispatch(actions.get_beneficiary_byid(bene_id));
        }
    }, [dispatch, bene_id]);

    if (l_loading && !success) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <Fetching>Fetching...</Fetching>
            </Box>
        );
    } else if (
        beneficiaryData?.data === undefined ||
        beneficiaryData?.data === null ||
        (beneficiaryData?.data != null && beneficiaryData?.data.length == 0)
    ) {
        return (
            <Grid container rowGap={1}>
                <Grid item xs={12}>
                    <Header>Beneficiary Details</Header>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <NoResults text="Invalid Beneficiary Id" />
                </Grid>
            </Grid>
        );
    }

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <DetailWrapper container>
                <Grid item xs={12}>
                    <Header>Beneficiary Details</Header>
                    <Divider />
                </Grid>
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
                                            beneficiaryData?.data?.country_iso2 || "US"
                                        }.svg`}
                                    />
                                }
                            >
                                <Avatar
                                    {...stringAvatar(
                                        beneficiaryData?.data?.first_name,
                                        beneficiaryData?.data?.last_name,
                                    )}
                                />
                            </Badge>
                        </Box>
                        <NameField>
                            <RenderTopField
                                label="Name"
                                value={`${beneficiaryData?.data?.first_name}${" "}${
                                    beneficiaryData?.data?.middle_name
                                        ? " " + beneficiaryData?.data?.middle_name + " "
                                        : " "
                                }${beneficiaryData?.data?.last_name ? beneficiaryData?.data?.last_name : ""}`}
                            />
                            <RenderTopField label="Beneficiary Id" value={beneficiaryData?.data?.beneficiary_id} />
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
                    <RenderField label="Firstname" value={beneficiaryData?.data?.first_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Mid-name" value={beneficiaryData?.data?.middle_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Lastname" value={beneficiaryData?.data?.last_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Gender" value={beneficiaryData?.data?.gender} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderMobileField
                        label="Mobile Number"
                        value={beneficiaryData?.data?.mobile_number}
                        prevalue={beneficiaryData?.data?.phone_country_code}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderMobileField
                        label="Phone Number"
                        value={beneficiaryData?.data?.phone_number}
                        prevalue={beneficiaryData?.data?.phone_country_code}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderEmailField label="Email" email={beneficiaryData?.data?.email} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Type" value={beneficiaryData?.data?.receiver_type_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Reciever Type" value={beneficiaryData?.data?.receiver_type} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Customer Id" value={beneficiaryData?.data?.customer_id} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Title" value={beneficiaryData?.data?.title} />
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Collection Information</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Payment Type"
                        value={
                            beneficiaryData?.data?.payment_type
                                ? ReferenceName(1, beneficiaryData?.data?.payment_type)
                                : ""
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Bank Name" value={beneficiaryData?.data?.bank_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Bank Branch Name" value={beneficiaryData?.data?.bank_branch_name} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Account Number" value={beneficiaryData?.data?.account_number} />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField label="Registered From" value={beneficiaryData?.data?.registered_from} />
                </Grid>
                {beneficiaryData?.data?.account_type_data && (
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Account Type" value={beneficiaryData?.data?.account_type_data} />
                    </Grid>
                )}
                {beneficiaryData?.data?.bank_identifier_value && (
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Bank Identifier" value={beneficiaryData?.data?.bank_identifier_value} />
                    </Grid>
                )}
                {beneficiaryData?.data?.branch_identifier_type && (
                    <Grid item xs={12} sm={6}>
                        <RenderField
                            label="Branch Identifier Type"
                            value={beneficiaryData?.data?.branch_identifier_type}
                        />
                    </Grid>
                )}
                {beneficiaryData?.data?.branch_identifier_value && (
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Branch Identifier" value={beneficiaryData?.data?.branch_identifier_value} />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Other Information</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InfoWrapper>
                        <LabelWrapper>Status:</LabelWrapper>
                        <ValueWrapper sx={{ wordBreak: "break-all" }}>
                            {beneficiaryData?.data?.is_active ? (
                                <Tooltip title="Active Beneficiary" arrow>
                                    <CheckCircleOutlineIcon fontSize="small" sx={{ color: "success.main" }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Inactive Beneficiary." arrow>
                                    <DoNotDisturbOnIcon fontSize="small" sx={{ color: "warning.main" }} />
                                </Tooltip>
                            )}
                        </ValueWrapper>
                    </InfoWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Unit" value={beneficiaryData?.data?.unit} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Street" value={beneficiaryData?.data?.street} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="City" value={beneficiaryData?.data?.city} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="State" value={beneficiaryData?.data?.state} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Address" value={beneficiaryData?.data?.address} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Country" value={CountryName(beneficiaryData?.data?.country)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Currency" value={CurrencyName(beneficiaryData?.data?.currency)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Post Code" value={beneficiaryData?.data?.postcode} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Date of Birth" value={FormatDate(beneficiaryData?.data?.date_of_birth)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Birth Country" value={beneficiaryData?.data?.birth_country} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Relation" value={beneficiaryData?.data?.relation} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Relation Data" value={beneficiaryData?.data?.relation_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Reason For Remittance" value={beneficiaryData?.data?.reason_for_remittance} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Source Of Income" value={beneficiaryData?.data?.source_of_income} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Delivery Option ID" value={beneficiaryData?.data?.delivery_option_id} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Payout Location ID" value={beneficiaryData?.data?.payout_location_id} />
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Identity Information</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Type" value={beneficiaryData?.data?.id_type} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Number" value={beneficiaryData?.data?.id_number} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Issued State" value={beneficiaryData?.data?.id_issued_state} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Citizenship Issued Country"
                        value={beneficiaryData?.data?.citizenship_country}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Issued Country" value={beneficiaryData?.data?.id_issued_country_data} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Issued Date" value={FormatDate(beneficiaryData?.data?.id_issue_date)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField label="Id Expiry Date" value={FormatDate(beneficiaryData?.data?.id_expiry_date)} />
                </Grid>
            </DetailWrapper>
        </>
    );
}

export default BeneficiaryDetails;
