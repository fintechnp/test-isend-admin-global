import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { FormProvider, useForm } from "react-hook-form";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";

import Row from "../Row/Row";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FilterValueChip from "./FilterValueChip";
import isEmpty from "App/helpers/isEmpty";

const CloseButton = styled(Button)(({ theme }) => ({
    background: theme.palette.surface.primarySecond,
}));

const BuildFilterInput = ({ field }) => {
    if (field.type === "textfield") return <FormTextField name={field.name} label={field.label} />;

    if (field.type === "select") return <FormSelect name={field.name} label={field.label} options={field.options} />;

    if (field.type === "date")
        return (
            <FormDatePicker name={field.name} label={field.label} options={field.options} {...field.DatePickerProps} />
        );

    return <>Not implemented yet</>;
};

export default function FilterForm({ open, onClose, onSubmit, onReset, onDelete, fields = [], values }) {
    const methods = useForm();

    const { handleSubmit, reset } = methods;

    const handleOnSubmit = (data) => {
        onClose?.();
        onSubmit?.(data);
    };

    const handleOnReset = () => {
        reset({});
        onReset?.({});
    };

    return (
        <Box className="FilterFormContainer-root">
            <Box display="flex" gap="8px">
                {fields.map((field) => {
                    if (isEmpty(values?.[field.name])) return <></>;
                    return (
                        <FilterValueChip
                            label={
                                <>
                                    {field.label}: {values[field.name]}
                                </>
                            }
                        />
                    );
                })}
            </Box>
            <Collapse in={open} style={{ transformOrigin: "top center" }} {...(open ? { timeout: 300 } : {})}>
                <Paper elevation={0} sx={{ p: "16px" }}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            <Grid container spacing="16px">
                                <Grid item xs={12}>
                                    <Row alignItems="center" justifyContent="space-between">
                                        <Typography variant="h6">Search Customers</Typography>
                                        <Button endIcon={<CachedRoundedIcon />} onClick={handleOnReset}>
                                            Reset
                                        </Button>
                                    </Row>
                                </Grid>
                                {fields.map((field) => (
                                    <Grid item xs={12} md={6} lg={3}>
                                        <BuildFilterInput key={field.name} field={field} />
                                    </Grid>
                                ))}
                                <Grid item xs={12} display="flex" justifyContent="flex-end" gap="16px">
                                    <CloseButton onClick={onClose}>Close</CloseButton>
                                    <Button type="submit" variant="contained">
                                        Search
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </FormProvider>
                </Paper>
            </Collapse>
        </Box>
    );
}

FilterForm.propTypes = {
    onSubmit: PropTypes.func,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.oneOf(["textfield", "select", "multiselect", "date", "number"]).isRequired,
            name: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            options: PropTypes.arrayOf(
                PropTypes.shape({
                    label: PropTypes.string,
                    value: PropTypes.string,
                }),
            ),
            DatePickerProps: PropTypes.any,
        }),
    ),
    values: PropTypes.any,
};
