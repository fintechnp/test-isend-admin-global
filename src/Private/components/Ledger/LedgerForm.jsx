import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import React, { useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import IconButton from "@mui/material/IconButton";
import TableFooter from "@mui/material/TableFooter";
import TableContainer from "@mui/material/TableContainer";
import { useFieldArray, useFormContext } from "react-hook-form";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import FormSelect from "App/core/hook-form/FormSelect";
import apiEndpoints from "Private/config/apiEndpoints";
import { localStorageGet } from "App/helpers/localStorage";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import FormSearchAutocomplete from "App/core/hook-form/FormSearchAutocomplete";

const TransactionType = [
    {
        label: "Debit",
        value: 0,
    },
    {
        label: "Credit",
        value: 1,
    },
];

export default function LedgerForm({ loading }) {
    const navigate = useNavigate();
    const {
        control,
        watch,
        formState: { errors },
    } = useFormContext();

    const { append, remove, fields } = useFieldArray({
        control,
        name: "createLedgerDetail",
    });

    useEffect(() => {
        if (fields.length === 0) {
            append({
                accountId: "",
                transactionType: "",
                amount: "",
                remarks: "",
            });
        }
    }, []);

    const sendCountryOptions =
        localStorageGet("sendCountry")?.map((item) => ({
            label: item.country,
            value: item.country_id,
        })) ?? [];

    const countryId = watch("country");

    const handleAdd = () => {
        append({
            accountId: "",
            transactionType: "",
            amount: "",
            remarks: "",
        });
    };

    const handleRemove = (index) => {
        remove(index);
    };

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormTextField name="narration" label="Title" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormSelect name="country" label="Select Country" options={sendCountryOptions} />
                </Grid>

                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Account</TableCell>
                                    <TableCell>Transaction Type</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Remarks</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fields.map((item, index) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <FormSearchAutocomplete
                                                    name={`createLedgerDetail.${index}.accountId`}
                                                    label="Account"
                                                    apiEndpoint={apiEndpoints.account.getAll}
                                                    paramkey="AccountName"
                                                    valueKey="id"
                                                    labelKey="accountName"
                                                    defaultQueryParams={{
                                                        CountryId: countryId,
                                                    }}
                                                    refetchKey={countryId}
                                                    disabled={countryId === ""}
                                                    error={errors?.createLedgerDetail?.[index]?.accountId?.message}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormSelect
                                                    name={`createLedgerDetail.${index}.transactionType`}
                                                    label="Transaction Type"
                                                    options={TransactionType}
                                                    showChooseOption={false}
                                                    error={
                                                        errors?.createLedgerDetail?.[index]?.transactionType?.message
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormTextField
                                                    name={`createLedgerDetail.${index}.amount`}
                                                    label="Amount"
                                                    type="number"
                                                    error={errors?.createLedgerDetail?.[index]?.amount?.message}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <FormTextField
                                                    name={`createLedgerDetail.${index}.remarks`}
                                                    label="Remarks"
                                                    error={errors?.createLedgerDetail?.[index]?.remarks?.message}
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
                            navigate(routePaths.agent.listLedger);
                        }}
                    >
                        Cancel
                    </CancelButton>
                </Grid>
                <Grid item>
                    <AddButton size="small" variant="outlined" type="submit" loading={loading} disabled={loading}>
                        Add
                    </AddButton>
                </Grid>
            </Grid>
        </>
    );
}
