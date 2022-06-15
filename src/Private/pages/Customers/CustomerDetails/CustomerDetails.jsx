import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import actions from "./../CreateCustomer/store/actions";
import {
    CurrencyName,
    CountryName,
    FormatDate,
    FormatNumber,
} from "./../../../../App/helpers";

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

const BeneficiaryBox = styled(Box)(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
}));

const BeneficiaryButton = styled(Button)(({ theme }) => ({
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

const Fetching = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: "16px",
    fontWeight: 400,
}));

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

function CustomerDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { response: customersData, loading: l_loading } = useSelector(
        (state) => state.get_customer_byid
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_customer_byid(id));
        }
    }, [dispatch, id]);

    if (l_loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                <Fetching>Fetching...</Fetching>
            </Box>
        );
    }

    return (
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
                                    alt="Remy Sharp"
                                    src="https://cdn11.bigcommerce.com/s-6e1n67clqw/product_images/uploaded_images/world-flag-decals-cat.jpg"
                                />
                            }
                        >
                            <Avatar
                                sx={{
                                    height: "50px",
                                    width: "50px",
                                }}
                                alt="Remy Sharp"
                                src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"
                            />
                        </Badge>
                    </Box>
                    <NameField>
                        <RenderTopField
                            label="Name"
                            value={`${customersData?.data?.first_name}${" "}${
                                customersData?.data?.middle_name
                            }${" "}${customersData?.data?.last_name}`}
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
                    value={customersData?.data?.gender}
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
            <Grid item xs={12}>
                <TitleWrapper>
                    <Title>Other Details</Title>
                    <Divider sx={{ flexGrow: 1, ml: 1 }} />
                </TitleWrapper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <RenderField
                    label="Customer Type"
                    value={customersData?.data?.customer_type}
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
            <Grid item xs={12}>
                <BeneficiaryBox>
                    <BeneficiaryButton
                        size="small"
                        variant="outlined"
                        disableElevation
                        disableRipple
                        onClick={() =>
                            navigate(`/customer/all-beneficiary/${id}`)
                        }
                    >
                        Show Beneficiary
                    </BeneficiaryButton>
                </BeneficiaryBox>
            </Grid>
        </DetailWrapper>
    );
}

export default CustomerDetails;
