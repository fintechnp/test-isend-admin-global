import * as yup from "yup";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton, CancelButton } from "../AllButtons/Buttons";

import { creditLimitActions } from "Private/pages/CreditLimit/store";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

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

export default function UpdateStatusForm({ setOpen }) {
    const methods = useForm({
        resolver: yupResolver(UpdateStatusFormValidation),
    });
    const dispatch = useDispatch();
    const { creditLimitId } = useParams();

    const { watch } = methods;

    const buttonName = watch("action");

    const remarks = watch("remarks");

    const { loading, success } = useSelector((state) => state.update_credit_limit);

    const handleSubmit = (data) => {
        try {
            dispatch(creditLimitActions.update_credit_limit(creditLimitId, data));
        } catch (error) {
            setOpen(false);
        }
    };
    useEffect(() => {
        if (success) {
            dispatch(creditLimitActions.get_credit_limit_details(creditLimitId));
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
                            <AddButton
                                size="small"
                                variant="outlined"
                                type="submit"
                                loading={loading}
                                disabled={!remarks || remarks === ""}
                            >
                                {buttonName || "Submit"}
                            </AddButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </HookForm>
    );
}
