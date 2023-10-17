import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";

import { localStorageGet } from "App/helpers/localStorage";
import ucwords from "App/helpers/ucwords";
import FormSelect from "App/core/hook-form/FormSelect";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";
import apiEndpoints from "Private/config/apiEndpoints";
import { useFieldArray, useFormContext } from "react-hook-form";
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TableRow,
} from "@mui/material";
import FormTextField from "App/core/hook-form/FormTextField";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "App/components/Button/Button";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import { useSelector } from "react-redux";
import FormRadio from "App/core/hook-form/FormRadio";
import { useNavigate } from "react-router-dom";
import routePaths from "Private/config/routePaths";

export const relatedToEnum = {
    business: "business",
    marketmaker: "marketmaker",
};
const relatedToOptions = [
    {
        label: "Business",
        value: relatedToEnum.business,
    },
    {
        label: "Market Maker",
        value: relatedToEnum.marketmaker,
    },
];

export default function BusinessChargeForm({ isAddMode = true }) {
    const navigate = useNavigate();
    const {
        control,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();
    const countries = localStorageGet("country");

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

    useEffect(() => {
        setValue("relatedId", null);
    }, [relatedTo]);

    const registeredCountyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const handleAdd = () => {
        append({
            min_no_of_txn: "",
            max_no_of_txn: "",
            flat_amount: "",
        });
    };

    const handleRemove = (index) => {
        remove(index);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormRadio name="relatedTo" options={relatedToOptions ?? []} disabled={!isAddMode} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelect name="sendingCountry" label="Sending Country" options={registeredCountyOptions ?? []} />
                </Grid>

                <Grid item xs={12} md={6}>
                    <FormSelect
                        name="receivingCountry"
                        label="Recieving Country"
                        options={registeredCountyOptions ?? []}
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    {(() => {
                        if (relatedTo === relatedToEnum.business) {
                            return (
                                <Grid item xs={12} sm={6}>
                                    <FormSearchAutoComplete
                                        name="relatedId"
                                        label="Business Id"
                                        apiEndpoint={apiEndpoints.business.getAll}
                                        paramkey="BusinessName"
                                        valueKey="businessId"
                                        labelKey="name"
                                        disabled={!isAddMode}
                                    />
                                </Grid>
                            );
                        } else if (relatedTo === relatedToEnum.marketmaker) {
                            return (
                                <Grid item xs={12} sm={6}>
                                    <FormSearchAutoComplete
                                        name="relatedId"
                                        label="Market Maker Id"
                                        apiEndpoint={apiEndpoints.marketMaker.getAll}
                                        paramkey="Name"
                                        valueKey="marketMakerId"
                                        labelKey="name"
                                        disabled={!isAddMode}
                                    />
                                </Grid>
                            );
                        }
                    })()}
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
                            size="small"
                            variant="outlined"
                            onClick={() => {
                                reset();
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
                            loading={adding || updating}
                            disabled={adding || updating}
                        >
                            {isAddMode ? "Add" : "Update"}
                        </AddButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
