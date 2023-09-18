import React from "react";
import Grid from "@mui/material/Grid";

import { localStorageGet } from "App/helpers/localStorage";
import ucwords from "App/helpers/ucwords";
import FormSelect from "App/core/hook-form/FormSelect";
import FormSearchAutocomplete from "App/core/hook-form/FormSearchAutocomplete";
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

export default function BusinessChargeForm({ isAddMode = true }) {
    const { control, reset } = useFormContext();
    const countries = localStorageGet("country");

    const { loading: adding } = useSelector((state) => state.add_business_charge);

    const { append, remove, fields } = useFieldArray({
        name: "chargeDetailRules",
        control,
    });

    const registeredCountyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.country),
            value: c.country_id,
        };
    });

    const handleAdd = () => {
        append({
            min_no_of_txn: undefined,
            max_no_of_txn: undefined,
            flat_amount: undefined,
        });
    };

    const handleRemove = (index) => {
        remove(index);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <FormSelect name="sendingCountry" label="Sending Country" options={registeredCountyOptions ?? []} />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormSearchAutocomplete
                        name="businessId"
                        label="Business Id"
                        apiEndpoint={apiEndpoints.business.getAll}
                        paramkey="BusinessName"
                        valueKey="businessId"
                        labelKey="name"
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                    <FormSelect
                        name="receivingCountry"
                        label="Recieving Country"
                        options={registeredCountyOptions ?? []}
                    />
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
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormTextField
                                                    name={`chargeDetailRules.${index}.flat_amount`}
                                                    label="Flat Amount"
                                                    type="number"
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
                        <AddButton size="small" variant="outlined" type="submit" loading={adding} disabled={adding}>
                            {isAddMode ? "Add" : "Update"}
                        </AddButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}
