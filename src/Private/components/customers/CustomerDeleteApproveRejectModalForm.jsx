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
import { CancelButton, AddButton } from "../AllButtons/Buttons";

import { customerDeleteActions } from "Private/pages/Customers/DeleteList/store";

const UpdateStatusFormValidation = yup.object().shape({
    // status: yup.string().required("Action is required"),
    remarks: yup.string().required("Remarks is required"),
    isApproved: yup.boolean(),
});

// const actionOptions = [
//     {
//         label: "Approve",
//         value: "approve",
//     },
//     {
//         label: "Reject",
//         value: "reject",
//     },
// ];
export default function CustomerDeleteApproveRejectModalForm({ setOpen }) {
    const methods = useForm({
        resolver: yupResolver(UpdateStatusFormValidation),
        defaultValues: {
            isApproved: false,
        },
    });
    const dispatch = useDispatch();

    const { id } = useParams();

    const { loading, success } = useSelector((state) => state.update_delete_request);

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
            <Grid container item xs={12} direction="row" spacing={2}>
                {/* <Grid item xs={12} sm={12}>
                    <FormSelect name="status" label="Status" options={actionOptions ?? []} showChooseOption={false} />
                </Grid> */}
                <Grid item xs={12} sm={12}>
                    <FormTextField name="remarks" label="Remarks" />
                </Grid>
                <Grid item xs={12}>
                    <FormCheckbox label="Is Approved" name="isApproved" />
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
                            >
                                Cancel
                            </CancelButton>
                        </Grid>
                        <Grid item>
                            <AddButton size="small" variant="outlined" type="submit" loading={loading}>
                                Update
                            </AddButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </HookForm>
    );
}
