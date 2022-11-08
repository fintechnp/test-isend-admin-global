import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import UpdateKyc from "./UpdateKyc";
import actions from "./../CreateCustomer/store/actions";
import {
    CountryName,
    FormatDate,
    ReferenceName,
} from "./../../../../App/helpers";
import NoResults from "./../Search/components/NoResults";

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

const ButtonWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    paddingTop: "16px",
    justifyContent: "flex-start",
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
        children: `${first.split(" ")[0][0]}${
            last ? last.split(" ")[0][0] : ""
        }`,
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
                <Label sx={{ fontWeight: 600, opacity: 0.8, lineHeight: 1.4 }}>
                    {label}:
                </Label>
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

    const {
        response: customersData,
        loading: l_loading,
        success,
    } = useSelector((state) => state.get_customer_byid);

    const { success: update_success } = useSelector(
        (state) => state.update_kyc
    );

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
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <Fetching>Fetching...</Fetching>
            </Box>
        );
    } else if (
        customersData?.data === undefined ||
        customersData?.data === null ||
        (customersData?.data != null && customersData?.data.length == 0)
    ) {
        return (
            <Grid container rowGap={1}>
                <Grid item xs={12}>
                    <Header>Customer Details</Header>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <NoResults text="Invalid Customer Id" />
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
                    <Header>Customer Details</Header>
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
                                            customersData?.data?.country_iso2 ||
                                            "US"
                                        }.svg`}
                                    />
                                }
                            >
                                <Avatar
                                    {...stringAvatar(
                                        customersData?.data?.first_name,
                                        customersData?.data?.last_name
                                    )}
                                />
                            </Badge>
                        </Box>
                        <NameField>
                            <RenderTopField
                                label="Name"
                                value={`${
                                    customersData?.data?.first_name
                                }${" "}${
                                    customersData?.data?.middle_name
                                        ? " " +
                                          customersData?.data?.middle_name +
                                          " "
                                        : " "
                                }${
                                    customersData?.data?.last_name
                                        ? customersData?.data?.last_name
                                        : ""
                                }`}
                            />
                            <RenderTopField
                                label="Customer Id"
                                value={customersData?.data?.customer_id}
                            />
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
                    <RenderField
                        label="Firstname"
                        value={customersData?.data?.first_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Mid-name"
                        value={customersData?.data?.middle_name}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Lastname"
                        value={customersData?.data?.last_name}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Gender"
                        value={
                            customersData?.data?.gender
                                ? ReferenceName(42, customersData?.data?.gender)
                                : ""
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Mobile Number"
                        value={customersData?.data?.mobile_number}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Title>Identity Information</Title>
                        <Divider sx={{ flexGrow: 1, ml: 1 }} />
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Id Type"
                        value={customersData?.data?.id_type}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Id Number"
                        value={customersData?.data?.id_number}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Id Issued State"
                        value={customersData?.data?.id_issued_state}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Id Issued Country"
                        value={customersData?.data?.id_issued_country_data}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Id Issued Date"
                        value={FormatDate(customersData?.data?.id_issue_date)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Id Expiry Date"
                        value={FormatDate(customersData?.data?.id_expiry_date)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="KYC Status"
                        value={
                            customersData?.data?.kyc_status
                                ? ReferenceName(
                                      21,
                                      customersData?.data?.kyc_status
                                  )
                                : ""
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
                                ? ReferenceName(
                                      37,
                                      customersData?.data?.customer_type
                                  )
                                : ""
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Email Address"
                        value={customersData?.data?.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Post Code"
                        value={customersData?.data?.postcode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Country"
                        value={customersData?.data?.country_data}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Nationality"
                        value={customersData?.data?.citizenship_country_data}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Date of Birth"
                        value={FormatDate(customersData?.data?.date_of_birth)}
                    />
                </Grid>{" "}
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Birth Country"
                        value={CountryName(customersData?.data?.birth_country)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Occupation"
                        value={customersData?.data?.occupation}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <RenderField
                        label="Source Of Income"
                        value={customersData?.data?.source_of_income}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InfoWrapper>
                        <LabelWrapper>Status:</LabelWrapper>
                        <ValueWrapper sx={{ wordBreak: "break-all" }}>
                            {customersData?.data?.is_active ? (
                                <Tooltip title="Active Customer" arrow>
                                    <CheckCircleOutlineIcon
                                        fontSize="small"
                                        sx={{ color: "success.main" }}
                                    />
                                </Tooltip>
                            ) : (
                                <Tooltip title="Inactive Customer." arrow>
                                    <DoNotDisturbOnIcon
                                        fontSize="small"
                                        sx={{ color: "warning.main" }}
                                    />
                                </Tooltip>
                            )}
                        </ValueWrapper>
                    </InfoWrapper>
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper mt={2} mb={0.5} columnGap={1.5}>
                        <BottomButton
                            size="small"
                            variant="outlined"
                            disableElevation
                            disableRipple
                            onClick={() =>
                                navigate(`/customer/all-beneficiary/${id}`)
                            }
                        >
                            Beneficiares
                        </BottomButton>
                        <BottomButton
                            size="small"
                            variant="outlined"
                            disableElevation
                            disableRipple
                            onClick={() => navigate(`/customer/remarks/${id}`)}
                        >
                            Remarks
                        </BottomButton>
                        <BottomButton
                            size="small"
                            variant="outlined"
                            disableElevation
                            disableRipple
                            onClick={() =>
                                navigate(`/customer/all-transactions/${id}`)
                            }
                        >
                            Transactions
                        </BottomButton>
                        <BottomButton
                            size="small"
                            variant="outlined"
                            disableElevation
                            disableRipple
                            onClick={() =>
                                navigate(`/customer/documents/${id}`)
                            }
                        >
                            Documents
                        </BottomButton>
                        <UpdateKyc />
                    </ButtonWrapper>
                </Grid>
            </DetailWrapper>
        </>
    );
}

export default CustomerDetails;
