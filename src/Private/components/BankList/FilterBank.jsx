import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import actions from "../../pages/Customers/AllBanks/store/action";
import { ButtonWrapper, ResetButton, SearchButton } from "../AllButtons/Buttons";

const orderByOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
];

const FilterBank = ({ sortByOptions }) => {
    const methods = useForm();
    const dispatch = useDispatch();

    const { reset, setValue, getValues } = methods;

    const handleSubmit = (data) => {
        dispatch(actions.get_all_bank_list(data));
        reset();
    };

    const handleReset = () => {
        reset();
    };
    return (
        <Grid item xs={12}>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="bank_id" label="Bank ID" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="customer_id" label="Customer ID" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="bank_name" label="Bank Name" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="search" label="Search" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="order_by" options={orderByOptions} label="Order By" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="sort_by" options={sortByOptions} label="Sort By" />
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
        </Grid>
    );
};

export default FilterBank;
