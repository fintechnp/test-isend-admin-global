import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import { useSelector } from "react-redux";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import { useFieldArray, useFormContext } from "react-hook-form";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import ucwords from "App/helpers/ucwords";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import FormRadio from "App/core/hook-form/FormRadio";
import FormSelect from "App/core/hook-form/FormSelect";
import apiEndpoints from "Private/config/apiEndpoints";
import { localStorageGet } from "App/helpers/localStorage";
import FormTextField from "App/core/hook-form/FormTextField";
import CancelButton from "App/components/Button/CancelButton";
import SubmitButton from "App/components/Button/SubmitButton";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";

import { relatedTo as relatedToConstant, relatedToOptions } from "Private/data/b2b";

export default function BusinessChargeForm({ isAddMode = true }) {
    const navigate = useNavigate();

    const [params, setParams] = useState({
        CountryId: null,
    });

    const {
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
        setError,
        getValues,
    } = useFormContext();

    const countries = localStorageGet("sendCountry");
    const allCountries = localStorageGet("country");
    const sendingCountry = watch("sendingCountry");

    useEffect(() => {
        setParams({
            ...params,
            CountryId: sendingCountry,
        });
    }, [sendingCountry]);

    const { loading: adding, success } = useSelector((state) => state.add_business_charge);

    const { loading: updating, success: updateSuccess } = useSelector((state) => state.update_business_charge);

    const { append, remove, fields } = useFieldArray({
        name: "chargeDetailRules",
        control,
    });

    useEffect(() => {
        if (success || updateSuccess) {
            navigate(routePaths.agent.listBusinessServiceCharge);
        }
    }, [success, updateSuccess]);

    const relatedTo = watch("relatedTo");

    const rules = watch("chargeDetailRules") ?? [];

    const registeredCountyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });
    const allRegisteredCountyOptions = allCountries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const handleAdd = () => {
        const previousIndex = rules.length - 1;

        const previousMinAmount = rules[rules.length - 1].min_no_of_txn;

        const previousMaxAmount = rules[rules.length - 1].max_no_of_txn;

        if (!previousMaxAmount) {
            setError(`chargeDetailRules.${previousIndex}.max_no_of_txn`, {
                message: "Required",
            });
            return;
        }

        if ((previousMaxAmount ?? 0) <= (previousMinAmount ?? 0)) {
            setError(`chargeDetailRules.${previousIndex}.max_no_of_txn`, {
                message: "Max amount must be greater than min amount",
            });
            return;
        }

        append({
            min_no_of_txn: previousMaxAmount ? +previousMaxAmount + 1 : null,
            max_no_of_txn: null,
            flat_amount: null,
        });
    };

    const handleRemove = (index) => {
        remove(index);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormRadio
                        name="relatedTo"
                        options={relatedToOptions ?? []}
                        disabled={!isAddMode}
                        onChange={() => {
                            setValue("relatedId", null);
                        }}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormSelect name="sendingCountry" label="Sending Country" options={registeredCountyOptions ?? []} />
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormSelect
                        name="receivingCountry"
                        label="Recieving Country"
                        options={allRegisteredCountyOptions ?? []}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    {isAddMode ? (
                        <>
                            <Box
                                sx={{
                                    display: relatedTo === relatedToConstant.BUSINESS ? "block" : "none",
                                }}
                            >
                                <FormSearchAutoComplete
                                    name="relatedId"
                                    label="Business"
                                    apiEndpoint={apiEndpoints.business.getAll}
                                    paramkey="BusinessName"
                                    valueKey="businessId"
                                    labelKey="name"
                                    disabled={!isAddMode}
                                    defaultQueryParams={{
                                        IsSelfRegistered: true,
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    display: relatedTo === relatedToConstant.AGENT ? "block" : "none",
                                }}
                            >
                                <FormSearchAutoComplete
                                    name="relatedId"
                                    label="Agent"
                                    apiEndpoint={apiEndpoints.marketMaker.getAll}
                                    paramkey="Name"
                                    valueKey="marketMakerId"
                                    labelKey="name"
                                    disabled={!isAddMode}
                                    pageNumberQueryKey="Page"
                                    defaultQueryParams={params}
                                    shouldRenderPrevData={!!params.sendingCountry}
                                />
                            </Box>
                        </>
                    ) : (
                        <FormTextField
                            name="name"
                            label={relatedTo === relatedToConstant.AGENT ? "Agent" : "Business"}
                            disabled
                        />
                    )}
                </Grid>

                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Min No of Txn</TableCell>
                                    <TableCell>Max No of Txn</TableCell>
                                    <TableCell>Flat Amount</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fields.map((item, index) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <FormTextField
                                                    name={`chargeDetailRules.${index}.min_no_of_txn`}
                                                    label="Min no of txn"
                                                    type="number"
                                                    disabled
                                                    error={errors?.chargeDetailRules?.[index]?.min_no_of_txn?.message}

                                                    // {...(index > 0
                                                    //     ? {
                                                    //           disabled: true,
                                                    //       }
                                                    //     : {})}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormTextField
                                                    name={`chargeDetailRules.${index}.max_no_of_txn`}
                                                    label="Max no of txn"
                                                    type="number"
                                                    error={errors?.chargeDetailRules?.[index]?.max_no_of_txn?.message}
                                                    disabled={index < rules.length - 1}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormTextField
                                                    name={`chargeDetailRules.${index}.flat_amount`}
                                                    label="Flat Amount"
                                                    type="number"
                                                    error={errors?.chargeDetailRules?.[index]?.flat_amount?.message}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <IconButton color="error" onClick={() => handleRemove(index)}>
                                                    <CloseOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Button onClick={handleAdd}>Add</Button>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Grid>

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
                            onClick={() => {
                                reset();
                            }}
                        >
                            Cancel
                        </CancelButton>
                    </Grid>
                    <Grid item>
                        <SubmitButton isAddMode={isAddMode} isLoading={adding || updating} />
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
