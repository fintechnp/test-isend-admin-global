import { Grid } from "@mui/material";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import HookForm from "App/core/hook-form/HookForm";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";
import PageContent from "App/components/Container/PageContent";
import FormSelect from "App/core/hook-form/FormSelect";

import FormTextField from "App/core/hook-form/FormTextField";
import ucwords from "App/helpers/ucwords";
import { localStorageGet } from "App/helpers/localStorage";
import { creditLimitStatusEnum } from "Private/pages/Agent/CreditLimit/constants/creditLimitStatus";

const orderByOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
];

const statusOptions = [
    {
        label: "Initial",
        value: creditLimitStatusEnum.INITIAL,
    },
    {
        label: "Success",
        value: creditLimitStatusEnum.SUCCESS,
    },
    {
        label: "Pending",
        value: creditLimitStatusEnum.PENDING,
    },
    {
        label: "Approved",
        value: creditLimitStatusEnum.APPROVED,
    },
    {
        label: "Rejected",
        value: creditLimitStatusEnum.REJECTED,
    },
];

export default function FilterForm({ sortByOptions, setFilterSchema }) {
    const methods = useForm();
    const dispatch = useDispatch();

    const countries = localStorageGet("country");

    const { reset, setValue, getValues } = methods;

    const currencyOptions = countries?.map((c) => {
        return {
            label: ucwords(c.currency_name),
            value: c.currency,
        };
    });
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
                        <FormTextField name="BusinessNameFilter" label="Business/Agent Name" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormSelect name="StatusFilter" options={statusOptions} label="Status" />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormSelect name="CurrencyFilter" options={currencyOptions} label="Currency" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="SortBy" options={sortByOptions} label="Sort By" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="OrderBy" options={orderByOptions} label="Order By" />
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
