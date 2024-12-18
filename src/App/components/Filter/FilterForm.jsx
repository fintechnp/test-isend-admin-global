import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import React, { useMemo } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import CachedRoundedIcon from "@mui/icons-material/CachedRounded";

import Row from "../Row/Row";
import FilterValueChip from "./FilterValueChip";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDatePicker from "App/core/hook-form/FormDatePicker";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import FormSearchAutocomplete from "App/core/hook-form/FormSearchAutocomplete";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import FormPartnerSelect from "App/core/hook-form/FormPartnerSelect";

const CloseButton = styled(Button)(({ theme }) => ({
    background: theme.palette.surface.primarySecond,
}));

const ClearAllButton = styled(Chip)(({ theme }) => ({
    background: "transparent",
    fontWeight: 600,
    color: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.surface.primarySecond,
        textDecoration: "underline",
    },
}));

export const fieldTypes = {
    TEXTFIELD: "textfield",
    SELECT: "select",
    DATE: "date",
    COUNTRY_SELECT: "country-select",
    SEARCH_AUTOCOMPLETE_API: "search-autocomplete-api",
    PARTNER_SELECT: "partner-select",
};

const BuildFilterInput = ({ field }) => {
    if (field.type === fieldTypes.TEXTFIELD) return <FormTextField name={field.name} label={field.label} />;

    if (field.type === fieldTypes.SELECT)
        return (
            <FormSelect
                name={field.name}
                label={field.label}
                options={field.options}
                defaultValue={field?.defaultValue}
                onChange={field?.onChange}
                {...field.props}
            />
        );

    if (field.type === fieldTypes.DATE)
        return <FormDatePicker name={field.name} label={field.label} options={field.options} {...field.props} />;

    if (field.type === fieldTypes.SEARCH_AUTOCOMPLETE_API)
        return (
            <FormSearchAutocomplete
                name={field.name}
                label={field.label}
                apiEndpoint={field.apiEndpoint}
                paramkey={field.searchParamName}
                valueKey={field.valueKey}
                labelKey={field.labelKey}
                shouldRenderPrevData={field?.shouldRenderPrevData}
                pageNumberQueryKey={field?.pageNumberQueryKey}
            />
        );

    if (field.type === fieldTypes.COUNTRY_SELECT)
        return (
            <FormSelectCountry name={field.name} label={field.label} {...field.props} onSelected={field?.onChange} />
        );

    if (field.type === fieldTypes.PARTNER_SELECT)
        return (
            <FormPartnerSelect
                name={field.name}
                label={field.label}
                {...field.props}
                partnerType={field?.partnerType}
            />
        );

    return <>Not implemented yet</>;
};

export default function FilterForm({ open, onClose, onSubmit, onReset, onDelete, fields = [], values, title, schema }) {
    const methods = useForm({
        ...(schema
            ? {
                  resolver: yupResolver(schema),
              }
            : undefined),
    });

    const { handleSubmit, reset } = methods;

    const handleOnSubmit = (data) => {
        onClose?.();
        onSubmit?.(data);
    };

    const handleOnReset = () => {
        reset({});
        onReset?.({});
    };

    const hasFiltered = useMemo(() => fields.some((field) => !isEmpty(values?.[field.name])), [values]);

    const getValue = (value) => {
        if (!isNaN(value)) return value;

        const regexPatterns = [
            /\b(0[1-9]|1[0-2])[-/.](0[1-9]|[12][0-9]|3[01])[-/.]\d{4}\b/, // MM-DD-YYYY, MM/DD/YYYY, MM.DD.YYYY
            /\b(0[1-9]|[12][0-9]|3[01])[-/.](0[1-9]|1[0-2])[-/.]\d{4}\b/, // DD-MM-YYYY, DD/MM/YYYY, DD.MM.YYYY
            /\b\d{4}[-/.](0[1-9]|1[0-2])[-/.](0[1-9]|[12][0-9]|3[01])\b/, // YYYY-MM-DD, YYYY/MM/DD, YYYY.MM.DD
            /\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\b/,
        ];

        const isDate = regexPatterns.some((pattern) => pattern.test(value));

        if (!isDate) return value;

        const date = new Date(value);

        if (date instanceof Date && !isNaN(date)) {
            return dateUtils.getLocalDateFromUTC(value);
        }

        return value;
    };

    return (
        <Box className="FilterFormContainer-root">
            <Collapse in={!open} style={{ transformOrigin: "top center" }} {...(open ? { timeout: 300 } : {})}>
                <Box display="flex" gap="8px">
                    {fields.map((field) => {
                        if (isEmpty(values?.[field.name])) return <React.Fragment key={field.name}></React.Fragment>;
                        return (
                            <FilterValueChip
                                key={field.name}
                                label={
                                    <Row justifyContent="center" alignItems="center" gap="7px">
                                        {field.label}: {getValue(values[field.name])}
                                        <svg
                                            width="8"
                                            height="8"
                                            viewBox="0 0 8 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            onClick={() => onDelete(field.name)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <path
                                                d="M7 1L1 7M7 7.00001L1 1.00001"
                                                stroke="#105BB7"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </Row>
                                }
                            />
                        );
                    })}
                    {hasFiltered && (
                        <ClearAllButton size="small" onClick={handleOnReset} label="Clear all">
                            Clear All
                        </ClearAllButton>
                    )}
                </Box>
            </Collapse>
            <Collapse in={open} style={{ transformOrigin: "top center" }} {...(open ? { timeout: 300 } : {})}>
                <Paper elevation={0} sx={{ p: "16px" }}>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(handleOnSubmit)}>
                            <Grid container spacing="16px">
                                <Grid item xs={12}>
                                    <Row alignItems="center" justifyContent="space-between">
                                        <Typography variant="h6">{title}</Typography>
                                        <Button endIcon={<CachedRoundedIcon />} onClick={handleOnReset}>
                                            Reset
                                        </Button>
                                    </Row>
                                </Grid>
                                {fields.map((field) => (
                                    <Grid key={field.name} item xs={12} md={6} lg={3}>
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
    onDelete: PropTypes.func,
    schema: PropTypes.any,
    title: PropTypes.string,
};
