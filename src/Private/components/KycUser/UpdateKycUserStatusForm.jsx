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

import { KycUserActions } from "Private/pages/KycUser/store";

const StatusOptions = [
    {
        label: "status1",
        value: 1,
    },

    {
        label: "status2",
        value: 2,
    },
];

const UpdateStatusFormValidation = yup.object().shape({
    status: yup.string().required("Status is required"),
    remarks: yup.string().required("Remarks is required"),
});

export default function UpdateKycUserStatusForm({ setOpen }) {
    const methods = useForm({
        resolver: yupResolver(UpdateStatusFormValidation),
    });
    const dispatch = useDispatch();
    const { kycUserId } = useParams();

    const { loading, success } = useSelector((state) => state.update_kyc_user_status);

    const handleSubmit = (data) => {
        try {
            dispatch(KycUserActions.update_kyc_user_status(kycUserId, data));
        } catch (error) {
            setOpen(false);
        }
    };
    useEffect(() => {
        if (success) {
            dispatch(KycUserActions.get_kyc_user_details(kycUserId));
            setOpen(false);
        }
    }, [success]);
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container item xs={12} direction="row" spacing={2}>
                <Grid item xs={12} sm={12}>
                    <FormSelect name="status" label="Status" options={StatusOptions ?? []} showChooseOption={false} />
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
