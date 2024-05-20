import React, { useEffect } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Radio from "@mui/material/Radio";
import { useForm } from "react-hook-form";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import FormControlLabel from "@mui/material/FormControlLabel";

import SubmitButton from "App/components/Button/SubmitButton";

import { userProfileSetupActions } from "../store";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";

const schema = Yup.object().shape({
    role_name: Yup.string().required("Required").min(1, "Required"),
    is_active: Yup.boolean().required("Required"),
});

export default function AddProfileSetupTableRowForm({ isSubmitting = false }) {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        response: userProfileSetup,
        loading: isCreating,
        success: isCreated,
    } = useSelector((state) => state.add_user_profile_setup);

    const methods = useForm({
        defaultValues: {
            is_active: true,
        },
        resolver: yupResolver(schema),
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = methods;

    const isActive = watch("is_active");

    const handleChange = (e) => {
        setValue("is_active", e.target.value === "true");
    };

    const onSubmit = (data) => {
        dispatch(userProfileSetupActions.add_user_profile_setup(data));
    };

    useEffect(() => {
        if (isCreated) {
            dispatch(userProfileSetupActions.add_user_profile_setup_reset());
            navigate(buildRoute(routePaths.users.editProfileSetup, userProfileSetup.data));
        }
    }, [isCreated]);

    useEffect(() => {
        dispatch(userProfileSetupActions.add_user_profile_setup_reset());
    }, []);

    return (
        <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
                <TextField
                    {...register("role_name")}
                    size="small"
                    placeholder="Enter a name"
                    error={!!errors?.name?.message}
                    helperText={errors?.name?.message}
                />
            </TableCell>
            <TableCell align="center">
                <FormControl>
                    <RadioGroup row value={isActive} onChange={handleChange}>
                        <FormControlLabel value={true} control={<Radio />} label="Active" />
                        <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                    </RadioGroup>
                </FormControl>
            </TableCell>
            <TableCell colSpan={4}></TableCell>
            <TableCell>
                <SubmitButton
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                    submitText="Create"
                    submittingText="Creating"
                    isLoading={isCreating}
                />
            </TableCell>
        </TableRow>
    );
}

AddProfileSetupTableRowForm.propTypes = {
    isSubmitting: PropTypes.bool,
};
