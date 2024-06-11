import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { change, Form, reduxForm } from "redux-form";
import { Grid, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import Divider from "@mui/material/Divider";
import * as Yup from "yup";

import { useForm } from "react-hook-form";
import FormTextField from "App/core/hook-form/FormTextField";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import { yupResolver } from "@hookform/resolvers/yup";

const deliveryOptionsSchema = Yup.object().shape({
    delivery_name: Yup.string().required("Delivery name is required"),
    country_code: Yup.string().required("Country is required"),
    currency_code: Yup.string().required("Currency name is required"),
    payment_type: Yup.string().required("Payment type name is required"),
    payout_agent_id: Yup.string().required("Payment agent is required"),
});

const Container = styled(Grid)(({ theme }) => ({
    maxWidth: "900px",
    borderRadius: "5px",
    [theme.breakpoints.up("sm")]: {
        minWidth: "350px",
    },
}));

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "6px 0px 16px",
    backgroundColor: theme.palette.background.light,
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 16px",
}));

const StatusText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    paddingTop: "6px",
    paddingBottom: "-6px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    paddingTop: "12px",
}));

const CancelButton = styled(Button)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
    },
}));

const CreateButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const DeliveryOptionForm = ({
    onSubmit,
    partnerList,
    update,
    handleAgent,
    loading,
    buttonText,
    payout_country,
    handleClose,
    initialValues,
}) => {
    const dispatch = useDispatch();
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(deliveryOptionsSchema),
    });
    const { reset, setValue, getValues } = methods;

    const countryDataChanged = getValues();

    const handleSubmit = (data) => {
        onSubmit(data);
    };

    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const countryOptions = country?.map((data) => {
        return { label: data.country, value: data.iso3 };
    });

    const currencyOptions = country?.map((data) => {
        return { label: data.currency_name, value: data.currency };
    });

    const referenceData = reference && reference?.filter((ref_data) => ref_data.reference_type === 1)[0];

    const referenceOptions = referenceData?.reference_data?.map((data) => {
        return { label: data.name, value: data.value };
    });

    const partnerOptions =
        partnerList &&
        partnerList?.map((data) => {
            return { label: data.name, value: data.agent_id };
        });

    useEffect(() => {
        if (payout_country && update) {
            handleAgent(payout_country);
        }
    }, [payout_country]);

    const convertCurrency = (iso3) => {
        const currency = country.filter((data) => data.iso3 === iso3);
        if (currency) {
            return currency[0].currency;
        }
    };

    useEffect(() => {
        const handleCurrency = (e) => {
            handleAgent(e);
            setValue("currency_code", convertCurrency(e));

            // if (update) {
            //     dispatch(change("update_delivery_option_form", "currency_code", convertCurrency(e)));
            // } else {
            //     dispatch(change("add_delivery_option_form", "currency_code", convertCurrency(e)));
            // }
        };
        if (countryDataChanged.country_code) {
            handleCurrency(countryDataChanged?.country_code);
        }
    }, [countryDataChanged.country_code]);

    return (
        // <Form onSubmit={handleSubmit}>
        //     <Container container direction="column">
        //         <Grid item xs={12}>
        //             <FormWrapper container direction="row">
        //                 <FieldWrapper item xs={12} sm={6}>
        //                     <Field
        //                         name="delivery_name"
        //                         label="Delivery Name"
        //                         type="text"
        //                         small={12}
        //                         component={TextField}
        //                         validate={[Validator.emptyValidator, Validator.minValue1]}
        //                     />
        //                 </FieldWrapper>
        //                 <FieldWrapper item xs={12} sm={6}>
        //                     <Field
        //                         name="country_code"
        //                         label="Country"
        //                         type="number"
        //                         small={12}
        //                         onChange={handleCurrency}
        //                         component={SelectField}
        //                         validate={[Validator.emptyValidator, Validator.minValue1]}
        //                     >
        //                         <option value="" disabled>
        //                             Select Country
        //                         </option>
        //                         {country &&
        //                             country.map((data) => (
        //                                 <option value={data.iso3} key={data.tid}>
        //                                     {data.country}
        //                                 </option>
        //                             ))}
        //                     </Field>
        //                 </FieldWrapper>
        //                 <FieldWrapper item xs={12} sm={6}>
        //                     <Field
        //                         name="currency_code"
        //                         label="Currency"
        //                         type="number"
        //                         small={12}
        //                         component={SelectField}
        //                         validate={[Validator.emptyValidator, Validator.minValue1]}
        //                     >
        //                         <option value="" disabled>
        //                             Select Currency
        //                         </option>
        //                         {country &&
        //                             country.map((data) => (
        //                                 <option value={data.currency} key={data.tid}>
        //                                     {data.currency_name}
        //                                 </option>
        //                             ))}
        //                     </Field>
        //                 </FieldWrapper>
        //                 <FieldWrapper item xs={12} sm={6}>
        //                     <Field
        //                         name="payment_type"
        //                         label="Payment Type"
        //                         type="text"
        //                         small={12}
        //                         component={SelectField}
        //                         validate={[Validator.emptyValidator, Validator.minValue1]}
        //                     >
        //                         <option value="" disabled>
        //                             Select Payment Type
        //                         </option>
        //                         {reference &&
        //                             reference
        //                                 ?.filter((ref_data) => ref_data.reference_type === 1)[0]
        //                                 .reference_data.map((data) => (
        //                                     <option value={data.value} key={data.reference_id}>
        //                                         {data.name}
        //                                     </option>
        //                                 ))}
        //                     </Field>
        //                 </FieldWrapper>
        //                 <FieldWrapper item xs={12} sm={6}>
        //                     <Field
        //                         name="payout_agent_id"
        //                         label="Payout Agent"
        //                         type="number"
        //                         small={12}
        //                         disabled={partnerList.length > 0 ? false : true}
        //                         component={SelectField}
        //                         validate={[Validator.emptyValidator, Validator.minValue1]}
        //                     >
        //                         <option value="" disabled>
        //                             Select Payout Agent
        //                         </option>
        //                         {partnerList &&
        //                             partnerList.map((data, index) => (
        //                                 <option value={data.agent_id} key={data?.tid}>
        //                                     {data.name}
        //                                 </option>
        //                             ))}
        //                     </Field>
        //                 </FieldWrapper>
        //                 {update && (
        //                     <FieldWrapper item xs={12} sm={6}>
        //                         <Grid container alignItems="flex-end" justifyContent="flex-end">
        //                             <Grid item xs={12}>
        //                                 <StatusText component="p">Status</StatusText>
        //                             </Grid>
        //                             <Grid item xs={12}>
        //                                 <Field
        //                                     name="is_active"
        //                                     label="Active"
        //                                     small={12}
        //                                     reverse="row-reverse"
        //                                     component={CheckboxField}
        //                                 />
        //                             </Grid>
        //                         </Grid>
        //                     </FieldWrapper>
        //                 )}
        //             </FormWrapper>
        //         </Grid>
        //         <Grid item>
        //             <Divider sx={{ pt: 1.2 }} />
        //         </Grid>
        //         <Grid item>
        //             <ButtonWrapper
        //                 container
        //                 columnGap={2}
        //                 direction="row"
        //                 justifyContent="flex-end"
        //                 alignItems="center"
        //             >
        //                 <Grid item>
        //                     <CancelButton size="small" variant="contained" onClick={handleClose}>
        //                         Cancel
        //                     </CancelButton>
        //                 </Grid>
        //                 <Grid item>
        //                     <CreateButton
        //                         size="small"
        //                         variant="outlined"
        //                         loading={loading}
        //                         endIcon={update ? <UpdateIcon /> : <AddIcon />}
        //                         type="submit"
        //                     >
        //                         {buttonText}
        //                     </CreateButton>
        //                 </Grid>
        //             </ButtonWrapper>
        //         </Grid>
        //     </Container>
        // </Form>
        <>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Container>
                    <Grid item xs={12}>
                        <FormWrapper container direction="row">
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormTextField name="delivery_name" label="Delivery Name" />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect label="Country" name="country_code" options={countryOptions} />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect label="Currency" name="currency_code" options={currencyOptions} />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect label="Payment Type" name="payment_type" options={referenceOptions} />
                            </FieldWrapper>
                            <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                                <FormSelect
                                    label="Payout Agent"
                                    name="payout_agent_id"
                                    options={partnerOptions}
                                    disabled={partnerList?.length > 0 ? false : true}
                                />
                            </FieldWrapper>
                            {update && (
                                <FieldWrapper item xs={12} sm={6}>
                                    <Grid container alignItems="flex-end" justifyContent="flex-end">
                                        <Grid item xs={12}>
                                            <StatusText component="p">Status</StatusText>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormCheckbox name="is_active" label="Active" />
                                        </Grid>
                                    </Grid>
                                </FieldWrapper>
                            )}
                        </FormWrapper>
                    </Grid>
                    <Grid>
                        <Grid item>
                            <Divider sx={{ pt: 1.2 }} />
                        </Grid>
                        <Grid item>
                            <ButtonWrapper
                                container
                                columnGap={2}
                                direction="row"
                                justifyContent="flex-end"
                                alignItems="center"
                            >
                                <Grid item>
                                    <CancelButton size="small" variant="contained" onClick={handleClose}>
                                        Cancel
                                    </CancelButton>
                                </Grid>
                                <Grid item>
                                    <CreateButton
                                        size="small"
                                        variant="outlined"
                                        loading={loading}
                                        endIcon={update ? <UpdateIcon /> : <AddIcon />}
                                        type="submit"
                                    >
                                        {buttonText}
                                    </CreateButton>
                                </Grid>
                            </ButtonWrapper>
                        </Grid>
                    </Grid>
                </Container>
            </HookForm>
        </>
    );
};

// export default React.memo(reduxForm({ form: ["form"] })(DeliveryOptionForm));

export default DeliveryOptionForm;
