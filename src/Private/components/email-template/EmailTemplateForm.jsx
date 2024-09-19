import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import FormHelperText from "@mui/material/FormHelperText";
import React, { useCallback, useEffect, useRef } from "react";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import CKEditorComponent from "App/components/Editor/CkEditor";

import { useDispatch, useSelector } from "react-redux";
import referenceTypeId from "Private/config/referenceTypeId";
import emailTemplateActions from "./store/emailTemplateActions";
import { templateForLabels, templateForOptions, templateFor as TemplateForConstant } from "./data/template-for";

const schema = Yup.object().shape({
    email_subject: Yup.string().required("Email subject is required"),
    email_format: Yup.string().required("Email format is required"),
    template_type: Yup.string().required("Email template type  is required"),
    header_element_id: Yup.string().required("Email header is required"),
    footer_element_id: Yup.string().required("Email footer is required"),
});

const EmailTemplateForm = ({
    initialValues,
    onSubmit,
    handleClose,
    isAddMode,
    loading,
    insertTag,
    setPreviewData,
    openPreviewModal,
    tagClicked = false,
}) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const { response: emailElementData, loading: emailElementLoading } = useSelector(
        (state) => state.get_email_element,
    );

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues,
    });

    const {
        watch,
        setValue,
        formState: { errors },
        getValues,
    } = methods;

    const editorRef = useRef(null);
    const templateFor = watch("template_for");
    const emailFormat = watch("email_format");

    const referenceTypeIdForTemplateType =
        templateFor === TemplateForConstant.ADMIN
            ? referenceTypeId.emailTemplateTypeForAdmin
            : templateFor === TemplateForConstant.CUSTOMER
              ? referenceTypeId.emailTemplateTypeForCustomer
              : templateFor === TemplateForConstant.ADMINTOCUSTOMER
                ? referenceTypeId.emailTemplateTypeForAdminToCustomer
                : null;

    const emailElementHeader = emailElementData?.data.filter((el) => el.element_type === "header") || [];

    const emailElementFooter = emailElementData?.data.filter((el) => el.element_type === "footer") || [];

    const emailHeaderOptions = emailElementHeader?.map((el) => ({
        label: `${el.element_label} ${templateForLabels[el.element_for]}`,
        value: el.element_id,
    }));

    const emailFooterOptions = emailElementFooter?.map((el) => ({
        label: `${el.element_label} ${templateForLabels[el.element_for]}`,
        value: el.element_id,
    }));

    const referenceData = referenceTypeIdForTemplateType
        ? (reference
              ?.filter((ref_data) => ref_data.reference_type === referenceTypeIdForTemplateType)[0]
              .reference_data.map((ref) => ({
                  label: ref.name,
                  value: ref.value,
              })) ?? [])
        : [];

    const insertTagAtCursor = useCallback(
        (insertTag) => {
            if (insertTag && editorRef.current) {
                const editor = editorRef.current;
                // Get the current selection (caret position)
                const selection = editor.model.document.selection;
                const position = selection.getFirstPosition();

                // Create a text node for the tag to insert
                const insertText = editor.model.change((writer) => {
                    return writer.createText(insertTag, { bold: true });
                });

                // Insert the tag at the caret position
                editor.model.change((writer) => {
                    writer.insert(insertText, position); // Insert at the caret position
                });
            }
        },
        [editorRef],
    );

    useEffect(() => {
        if (insertTag) {
            insertTagAtCursor(insertTag);
        }
    }, [insertTag, tagClicked]);

    useEffect(() => {
        dispatch(emailTemplateActions.get_email_element());
    }, []);

    return (
        <HookForm onSubmit={onSubmit} {...methods}>
            <Stack direction="column" spacing={3} columnSpacing={5}>
                <Stack item xs={12} md={6}>
                    <FormSelect name="template_for" label="Template For" options={templateForOptions} />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormSelect name="template_type" label="Template Type" options={referenceData} />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormTextField name="email_subject" label="Email Subject" />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormSelect name="header_element_id" label="Email Header" options={emailHeaderOptions} />
                </Stack>
                <Stack item xs={12} md={6}>
                    <FormSelect name="footer_element_id" label="Email Footer" options={emailFooterOptions} />
                </Stack>

                <Stack item xs={12} md={6}>
                    <Typography>Email Format</Typography>
                    <CKEditorComponent
                        elementData={emailFormat}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setValue("email_format", data);
                        }}
                        onReady={(editor) => {
                            editorRef.current = editor;
                            editor.ui.view.editable.element.style.minHeight = "300px";
                        }}
                        onBlur={(event, editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle("height", `300px`, editor.editing.view.document.getRoot());
                            });
                        }}
                        onFocus={(event, editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle("height", `300px`, editor.editing.view.document.getRoot());
                            });
                        }}
                    />
                    <FormHelperText error={true}>{errors?.email_format?.message}</FormHelperText>
                </Stack>

                <Grid container>
                    <Grid item xs={6}>
                        <Button
                            size="small"
                            variant="contained"
                            onClick={() => {
                                isAddMode ? setPreviewData({ ...getValues() }) : "";
                                openPreviewModal(true);
                            }}
                        >
                            Preview
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <ButtonWrapper>
                            <CancelButton onClick={handleClose} disabled={loading}>
                                Cancel
                            </CancelButton>
                            <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </Stack>
        </HookForm>
    );
};

export default EmailTemplateForm;

EmailTemplateForm.propTypes = {
    initialValues: PropTypes.shape({
        email_subject: PropTypes.string,
        email_format: PropTypes.string,
        template_for: PropTypes.string,
        template_type: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    isAddMode: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    insertTag: PropTypes.string,
};
