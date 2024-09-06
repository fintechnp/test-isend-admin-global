import * as Yup from "yup";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import Grid from "@mui/material/Grid";
import React, { useRef } from "react";
import Stack from "@mui/material/Stack";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import FormHelperText from "@mui/material/FormHelperText";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

import { templateForOptions, emailElementTypeOptions } from "./data/template-for";

const schema = Yup.object().shape({
    element_type: Yup.string().required("Email Type is required"),
    element_for: Yup.string().required("Email For is required"),
    element_content: Yup.string().required("Email Content is required"),
});

const EmailElementForm = ({ initialValues, onSubmit, handleClose, isAddMode, loading }) => {
    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    const {
        watch,
        setValue,
        formState: { errors },
    } = methods;

    const editorRef = useRef(null);
    const elementContent = watch("element_content");

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Stack direction="column" spacing={3} columnSpacing={5}>
                <Stack item xs={12} md={6}>
                    <FormSelect name="element_for" label="Element For" options={templateForOptions} />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormSelect name="element_type" label="Element Type" options={emailElementTypeOptions} />
                </Stack>

                <Stack item xs={12} md={6}>
                    <Typography>Element Content</Typography>
                    <ReactQuill
                        theme="snow"
                        value={elementContent}
                        onChange={(v) => setValue("element_content", v)}
                        ref={editorRef}
                    />
                    <FormHelperText error={true}>{errors?.element_content?.message}</FormHelperText>
                </Stack>

                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={handleClose} disabled={loading}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Stack>
        </HookForm>
    );
};

export default EmailElementForm;

EmailElementForm.propTypes = {
    initialValues: PropTypes.shape({
        element_type: PropTypes.string,
        element_for: PropTypes.string,
        element_content: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    isAddMode: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
};
