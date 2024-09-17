import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider } from "react-hook-form";
import Typography from "@mui/material/Typography";

import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextArea from "App/core/hook-form/FormTextArea";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const CreateForm = ({ handleSubmit, handleClose, loading, isAddMode, initialValues }) => {
    const methods = useForm({
        defaultValues: initialValues,
    });
    const [id, setId] = useState("topic");
    const [name, setName] = useState("Topic");

    const reference = JSON.parse(localStorage.getItem("reference"));

    const fcmType = reference && reference?.filter((ref_data) => ref_data?.reference_type === 89)[0];

    const fcmTypeOptions = fcmType?.reference_data?.map((ref_data) => {
        return { label: ref_data?.name, value: ref_data?.value };
    });

    const onSubmit = (data) => {
        const formattedData = {
            body: data.body,
            detail_content: data.detail_content,
            display_notification: data.display_notification,
            image_url: data.image_url,
            redirect_url: data.redirect_url,
            title: data.title,
            type: data.type,
            topic: data.topic,
            ...(data.customer_id ? { customer_id: data.customer_id } : {}),
            ...(data.topic ? { topic: data.topic } : {}),
        };

        handleSubmit(formattedData);
    };

    const handleId = (e) => {
        setId(e.target.value);
        if (e.target.value === "customer_id") {
            setName("Customer Id");
        } else {
            setName("Topic");
        }
    };

    const handleTargetOptions = [
        { value: "customer_id", label: "Customer Id" },
        { value: "topic", label: "Topic" },
    ];

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <FormTextField name="title" label="Title" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormSelect name="type" label="Select Type" options={fcmTypeOptions} />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormTextField name="redirect_url" label="Redirect URL" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormTextField name="image_url" label="Image URL" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormSelect
                            name="target"
                            label="Select Customer / Topic"
                            onChange={handleId}
                            options={handleTargetOptions}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormTextField
                            name={id}
                            type={id === "topic" ? "text" : "number"}
                            label={id === "topic" ? "Topic" : "Customer ID"}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <FormTextField name="body" label="Body" />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography> Display Notification</Typography>
                        <FormCheckbox name="display_notification" label="Show" />
                    </Grid>

                    <Grid item xs={12} md={12}>
                        <FormTextArea name="detail_content" label="Content" placeholder="Write Content...." />
                    </Grid>

                    <Grid item xs={12}>
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

export default CreateForm;
