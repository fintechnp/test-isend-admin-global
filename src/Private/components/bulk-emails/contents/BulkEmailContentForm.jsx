import React, { useEffect } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import isEmpty from "App/helpers/isEmpty";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCkEditor from "App/core/hook-form/FormCkEditor";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SelectBulkEmailGroup from "Private/components/shared/SelectBulkEmailGroup";

const schema = Yup.object().shape({
    send_to_whom: Yup.string().required("Select whom you want to send email"),
    send_to: Yup.string().when("send_to_whom", {
        is: (value) => value === "email",
        then: (schema) => schema.email("Enter a valid email address").required("Email is required"),
    }),
    group_id: Yup.string().when("send_to_whom", {
        is: (value) => value === "group",
        then: (schema) => schema.required("Select a group"),
    }),
    email_subject: Yup.string("Email Subject must be at most 50 characters").max(50).required("Enter a subject"),
    email_body: Yup.string().required("Enter a email body"),
    is_active: Yup.boolean(),
});

const BulkEmailContentForm = ({ onSubmit, isAddMode, initialState, isProcessing, onCancel }) => {
    const methods = useForm({
        defaultValues: isAddMode
            ? {
                  is_active: true,
              }
            : initialState,
        resolver: yupResolver(schema),
    });

    const {
        setValue,
        formState: { errors },
        watch,
    } = methods;

    const sendToWhom = watch("send_to_whom");

    useEffect(() => {
        if (sendToWhom === "email") {
            setValue("group_id", "");
        } else if (sendToWhom === "group") {
            setValue("send_to", "");
        }
    }, [sendToWhom]);

    useEffect(() => {
        if (initialState?.send_to) {
            setValue("send_to_whom", "email");
        } else if (initialState?.group_id) {
            setValue("send_to_whom", "group");
        }
    }, [JSON.stringify(initialState)]);

    const handleSubmit = (data) => {
        if (data?.send_to_whom === "email") {
            delete data["group_id"];
            delete data["send_to_whom"];
        } else if (data?.send_to_whom === "group") {
            delete data["send_to"];
            delete data["send_to_whom"];
        }
        onSubmit(data);
    };

    console.log(errors);

    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormSelect
                        name="send_to_whom"
                        label="Send To"
                        options={[
                            {
                                label: "Email",
                                value: "email",
                            },
                            {
                                label: "Group",
                                value: "group",
                            },
                        ]}
                    />
                </Grid>
                {sendToWhom === "email" && (
                    <Grid item xs={12} md={6}>
                        <FormTextField name="send_to" label="Email" />
                    </Grid>
                )}
                {sendToWhom === "group" && (
                    <Grid item xs={12} md={6}>
                        <SelectBulkEmailGroup
                            name="group_id"
                            label="Group"
                            error={!!errors?.group_id}
                            helperText={errors?.group_id?.message ?? ""}
                            value={isAddMode ? undefined : initialState?.group_id}
                            onSelected={(v) => {
                                setValue("group_id", v);
                            }}
                        />
                    </Grid>
                )}
                <Grid item xs={12}>
                    <FormTextField name="email_subject" label="Subject" />
                </Grid>
                <Grid item xs={12}>
                    <FormCkEditor name="email_body" label="Content" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormCheckbox name="is_active" label="Is Active ?" />
                </Grid>
                <Grid item xs={12}>
                    <ButtonWrapper>
                        <CancelButton onClick={onCancel} disabled={isProcessing}>
                            Cancel
                        </CancelButton>
                        <SubmitButton isLoading={isProcessing} isAddMode={isAddMode} />
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default React.memo(BulkEmailContentForm);

BulkEmailContentForm.propTypes = {
    isAddMode: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    isProcessing: PropTypes.bool,
    initialState: PropTypes.object,
};
