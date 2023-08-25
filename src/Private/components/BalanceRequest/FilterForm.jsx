import { Grid } from "@mui/material";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import HookForm from "App/core/hook-form/HookForm";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";
import PageContent from "App/components/Container/PageContent";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormSelect from "App/core/hook-form/FormSelect";

import { BalanceRequestActions } from "Private/pages/BalanceRequest/store";
import FormTextField from "App/core/hook-form/FormTextField";

const orderByOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
];

const statusOptions = [
    {
        label: "Initial",
        value: 1,
    },
    {
        label: "Success",
        value: 2,
    },
    {
        label: "Pending",
        value: 3,
    },
    {
        label: "Approved",
        value: 4,
    },
    {
        label: "Rejected",
        value: 5,
    },
];

export default function FilterForm({ sortByOptions = [], setFilterSchema, loading }) {
    const methods = useForm();
    const dispatch = useDispatch();

    const { reset, setValue, getValues } = methods;

    const handleSubmit = (data) => {
        setFilterSchema((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };

    const handleReset = () => {
        reset();
    };
    return (
        <PageContent>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="Name" label="Name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="DepositedAmount" label="Deposited Amount" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="DateOfDeposit" label="Date Of Deposit" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="FromDate" label="From Date" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormDatePicker name="ToDate" label="To Date" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="Status" options={statusOptions} label="Status" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="OrderBy" options={orderByOptions} label="Order By" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="SortBy" options={sortByOptions} label="Sort By" disabled={loading} />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            columnSpacing={2}
                        >
                            <Grid item>
                                <ResetButton size="small" variant="outlined" onClick={handleReset}>
                                    Reset
                                </ResetButton>
                            </Grid>
                            <Grid item>
                                <SearchButton size="small" variant="outlined" type="submit">
                                    Search
                                </SearchButton>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </HookForm>
        </PageContent>
    );
}
