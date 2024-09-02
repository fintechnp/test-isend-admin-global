import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

import { campaignEventTypesOptions } from "Private/pages/PromoCode/data/campaignEventTypesEnums";

const schema = Yup.object().shape({
    attributeName: Yup.string().required("Attribute name is required"),
    attributeTypeValue: Yup.string().required("Attribute Type value is required"),
});

const AttributeFamilyForm = ({ handleClose, loading, isAddMode = true, initialValues, onSubmit }) => {
    const methods = useForm({
        defaultValues: initialValues,
        resolver: yupResolver(schema),
    });

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Grid container rowSpacing={2} spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormTextField label="Attribute Name" name="attributeName" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelect
                        label="Attribute Type Value"
                        name="attributeTypeValue"
                        options={campaignEventTypesOptions}
                    />
                </Grid>
                <Grid marginY={2} item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose}>Cancel</CancelButton>
                        <SubmitButton isloading={loading} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

AttributeFamilyForm.prototype = {
    handleClose: PropTypes.func,
    loading: PropTypes.bool,
    isAddMode: PropTypes.bool,
    initialValues: PropTypes.object,
    onSubmit: PropTypes.func,
};

export default AttributeFamilyForm;
