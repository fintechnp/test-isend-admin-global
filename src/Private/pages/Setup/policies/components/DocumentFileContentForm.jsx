import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";

import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import CKEditorComponent from "App/components/Editor/CkEditor";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const DocumentFileContentSchema = Yup.object().shape({
    order_id: Yup.number().required("Order ID is required").typeError("Order ID is required"),
    content_title: Yup.string().required("Content Title is required").typeError("Content Title is required"),
});

const DocumentFileContentForm = ({
    orderID,
    isAddMode,
    defaultType,
    loading,
    onSubmit,
    initialValues,
    handleClose,
}) => {
    const editorRef = useRef(null);

    const methods = useForm({
        defaultValues: {
            type: defaultType,
            content: initialValues?.content || "",
            content_title: initialValues?.content || "",
            order_id: isAddMode ? orderID + 1 : initialValues?.order_id || "",
        },
        resolver: yupResolver(DocumentFileContentSchema),
    });

    const { reset, setValue, watch } = methods;

    const getOrderValue = watch("order_id") || "";

    const contentValue = watch("content") || "";

    useEffect(() => {
        if (!isAddMode && initialValues) {
            setValue("order_id", initialValues?.order_id || "");
            setValue("content_title", initialValues?.content_title || "");
            setValue("content", initialValues?.content || "");
        }
    }, [isAddMode, initialValues, setValue]);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid display="none" item xs={12} md={6}>
                        <FormTextField type="number" name="order_id" label="Order Id" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormTextField name="content_title" label="Content Title" />
                    </Grid>

                    <Grid item md={12}>
                        <CKEditorComponent
                            required
                            name="content"
                            label="Content"
                            elementData={contentValue}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setValue("content", data);
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
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        sx={{
                            position: "fixed",
                            left: 0,
                            right: "1%",
                            top: "90%",
                            zIndex: 100,
                            marginTop: "0.5rem",
                        }}
                    >
                        <ButtonWrapper>
                            <CancelButton onClick={handleClose} disabled={loading}>
                                Cancel
                            </CancelButton>
                            <SubmitButton isLoading={loading} isAddMode={isAddMode} />
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
};

export default DocumentFileContentForm;
