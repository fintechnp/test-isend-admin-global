import * as yup from "yup";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton, CancelButton } from "../AllButtons/Buttons";

import { BalanceRequestActions } from "Private/pages/BalanceRequest/store";

const actionOptions = [
    {
        label: "Approve",
        value: "approve",
    },
    {
        label: "Reject",
        value: "reject",
    },
];

const UpdateStatusFormValidation = yup.object().shape({
    action: yup.string().required("Action is required"),
    remarks: yup.string().required("Remarks is required"),
});

export default function UpdateBalanceRequestStatusForm({ setOpen }) {
    const methods = useForm({
        resolver: yupResolver(UpdateStatusFormValidation),
    });
    const dispatch = useDispatch();
    const { balanceRequestId } = useParams();

    const { loading, success } = useSelector((state) => state.update_balance_request_status);

    const handleSubmit = (data) => {
        try {
            dispatch(BalanceRequestActions.update_balance_request_status(balanceRequestId, data));
        } catch (error) {
            setOpen(false);
        }
    };
    useEffect(() => {
        if (success) {
            dispatch(BalanceRequestActions.get_balance_request_details(balanceRequestId));
            setOpen(false);
        }
    }, [success]);
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container item xs={12} direction="row" spacing={2}>
                <Grid item xs={12} sm={12}>
                    <FormSelect name="action" label="Action" options={actionOptions ?? []} showChooseOption={false} />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <FormTextField name="remarks" label="Remarks" />
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
