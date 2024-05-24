import * as yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormCheckbox from "App/core/hook-form/FormCheckbox";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";

import { customerDeleteActions } from "Private/pages/Customers/DeleteList/store";
import { DeleteAccountStatus } from "Private/pages/Customers/DeleteList/data/DeleteAccountStatus";

const UpdateStatusFormValidation = yup.object().shape({
    remarks: yup.string().required("Remarks is required"),
});

export default function CustomerDeleteApproveRejectModalForm({ setOpen, status }) {
    const methods = useForm({
        resolver: yupResolver(UpdateStatusFormValidation),
    });

    const { setValue, getValues, watch } = methods;

    const dispatch = useDispatch();

    const { id } = useParams();

    const s = watch("status");

    const { loading, success } = useSelector((state) => state.update_delete_request);

    useEffect(() => {
        if (status) {
            setValue("status", status);
        }
    }, [status]);

    const handleSubmit = (data) => {
        try {
            dispatch(customerDeleteActions.update_delete_request(id, data));
        } catch (error) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (success) {
            dispatch(customerDeleteActions.get_customer_delete_details(id));
            setOpen(false);
        }
    }, [success]);

    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            {JSON.stringify({ s })}
            <Grid container item xs={12} direction="row" spacing={2}>
                <Grid item xs={12} sm={12}>
                    <FormTextField name="remarks" label="Remarks" multiline />
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
                            <CancelButton
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                    setOpen(false);
                                }}
                                disabled={loading}
                            >
                                Cancel
                            </CancelButton>
                        </Grid>
                        <Grid item>
                            <SubmitButton
                                submitText={status === DeleteAccountStatus.APPROVED ? "Approve" : "Reject"}
                                submittingText="Approving"
                                isLoading={loading}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </HookForm>
    );
}
