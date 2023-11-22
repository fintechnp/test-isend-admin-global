import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import { AddButton } from "../AllButtons/Buttons";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import { RenderField, Title, TitleWrapper } from "Private/pages/Customers/CustomerDetails/CustomerDetails";

import { businessActions } from "Private/pages/Business/store";

import * as yup from "yup";

export const ApproveSchema = yup.object().shape({
    status: yup.number().required("Status is required"),
    remarks: yup.string().required("Remarks is required"),
});

export const statusOptions = [
    {
        label: "Profile Incomplete",
        value: 0,
    },
    {
        label: "Pending",
        value: 1,
    },
    {
        label: "Approved",
        value: 2,
    },
    {
        label: "Rejected",
        value: 3,
    },
    {
        label: "Blocked",
        value: 4,
    },
];

export default function BusinessKycDetail({ data, loading, relatedTo = "business" }) {
    const { businessId } = useParams();

    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(ApproveSchema),
    });

    const { loading: updating, success } = useSelector((state) => state.update_business_kyc_status);

    const { setValue } = methods;

    useEffect(() => {
        if (success) {
            dispatch(businessActions.get_business_kyc_details(data?.kycId));
            dispatch(businessActions.get_business_kyc({ businessId }));
            dispatch(businessActions.get_business_details(businessId));
        }
    }, [success]);

    useEffect(() => {
        if (data) {
            setValue("status", data?.status);
            setValue("remarks", data?.remarks);
        }
    }, [data]);

    const handleSubmit = (formData) => {
        dispatch(businessActions.update_business_kyc_status(data?.kycId, formData));
    };

    return (
        <>
            {data?.status === 1 && relatedTo === "business" && (
                <Box mt={2}>
                    <HookForm onSubmit={handleSubmit} {...methods}>
                        <Grid container item xs={12} spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <FormSelect name="status" label="Status" options={statusOptions || []} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormTextField name="remarks" label="Remarks" />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                                columnSpacing={2}
                                style={{ padding: "4px 0px", paddingRight: "4px" }}
                            >
                                <Grid item>
                                    <AddButton size="small" variant="outlined" type="submit" loading={updating}>
                                        Submit
                                    </AddButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </HookForm>
                </Box>
            )}

            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Detail</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Name" value={data?.fullName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Parent Kyb" value={data?.relatedKybName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Date of Birth" value={data?.dateOfBirth} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Gender" value={data?.genderName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Mobile Number" value={data?.mobileNumber} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Birth Country" value={data?.birthCountry?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity Type" value={data?.identityType} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity No " value={data?.identityNo} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity Issued Date " value={data?.identityIssuedDate} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity Issued By " value={data?.identityIssuedBy} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity issued country " value={data?.identityIssuedCountry?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Identity Expiry Date" value={data?.identityExpiryDate} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Status" value={data?.statusName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Remarks" value={data?.remarks} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Designation" value={data?.designationName} />
                    </Grid>

                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Temporary Address</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Address" value={data?.temporaryAddress?.address} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="City" value={data?.temporaryAddress?.city} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country" value={data?.temporaryAddress?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country Details" value={data?.temporaryAddress?.countryDetails?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Post Code" value={data?.temporaryAddress?.postCode} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="State" value={data?.temporaryAddress?.state} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Street" value={data?.temporaryAddress?.street} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Unit" value={data?.address?.unit} />
                    </Grid>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Permanent Address</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Address" value={data?.permanentAddress?.address} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="City" value={data?.permanentAddress?.city} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country" value={data?.permanentAddress?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country Details" value={data?.permanentAddress?.countryDetails?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Post Code" value={data?.permanentAddress?.postCode} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="State" value={data?.permanentAddress?.state} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Street" value={data?.permanentAddress?.street} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Unit" value={data?.permanentAddress?.unit} />
                    </Grid>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Documents</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>

                    {data?.documents?.map((item) => {
                        return (
                            <Grid xs={12} md={6} mt={2}>
                                <a
                                    href={item?.documentLink}
                                    target="_blank"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    {item?.fileType?.includes("image") ? (
                                        <>
                                            <Typography my={2}>{item?.documentName}</Typography>
                                            <img
                                                src={item?.documentLink}
                                                alt={item?.documentName}
                                                style={{
                                                    width: "100%",
                                                    height: "200px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        </>
                                    ) : (
                                        <Box
                                            sx={{
                                                bgcolor: "white",
                                                border: "1px solid #ccc",
                                                borderRadius: "5px",
                                                padding: "15px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Typography>{item?.documentName}</Typography>
                                        </Box>
                                    )}
                                </a>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </>
    );
}
