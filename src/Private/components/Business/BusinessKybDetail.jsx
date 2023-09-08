import { Box, Divider, Grid } from "@mui/material";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import HookForm from "App/core/hook-form/HookForm";
import React, { useEffect } from "react";
import { ApproveSchema, statusOptions } from "./BusinessKycDetail";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import { Loading } from "App/components";
import { RenderField, Title, TitleWrapper } from "Private/pages/Customers/CustomerDetails/CustomerDetails";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { businessActions } from "Private/pages/Business/store";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

export default function BusinessKybDetail({ data, loading, relatedTo }) {
    const methods = useForm({
        resolver: yupResolver(ApproveSchema),
    });
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const { loading: updating, success } = useSelector((state) => state.update_business_kyb_status);

    const { setValue } = methods;

    useEffect(() => {
        if (success) {
            dispatch(businessActions.get_business_kyb_details(data?.kybId));
            dispatch(businessActions.get_business_kyb({ businessId }));
            dispatch(businessActions.get_business_details(businessId));
        }
    }, [success]);

    useEffect(() => {
        if (data) {
            setValue("remarks", data?.remarks);
            setValue("status", data?.statusId);
        }
    }, [data]);

    const handleSubmit = (formData) => {
        dispatch(businessActions.update_business_kyb_status(data?.kybId, formData));
    };
    return (
        <>
            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <>
                    {data?.status === "Pending" && relatedTo === "business" && (
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
                                        style={{
                                            padding: "4px 0px",
                                            paddingRight: "4px",
                                        }}
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
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Details</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Name" value={data?.name} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Brand Name" value={data?.brandName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registration No" value={data?.registrationNo} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registration Date" value={data?.registeredDate} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registered Country" value={data?.registeredCountry?.country} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registered Entity" value={data?.registeredEntity} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Business Type" value={data?.businessType} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Parent" value={data?.parentId} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Status" value={data?.status} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Remarks" value={data?.remarks} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Related To" value={data?.relatedTo} />
                        </Grid>

                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Address</Title>
                                <Divider sx={{ flexGrow: 1, ml: 1 }} />
                            </TitleWrapper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Address" value={data?.address?.address} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="City" value={data?.address?.city} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Country" value={data?.address?.country} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <RenderField label="Post Code" value={data?.address?.postCode} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="State" value={data?.address?.state} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Street" value={data?.address?.street} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Unit" value={data?.address?.unit} />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
