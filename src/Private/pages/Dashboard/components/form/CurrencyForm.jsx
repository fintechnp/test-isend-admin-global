import { Grid } from "@mui/material";
import FormSelect from "App/core/hook-form/FormSelect";
import useListFilterStore from "App/hooks/useListFilterStore";
import { ExchangeRateAction } from "Private/pages/Setup/ExchangeRate/store";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
    page_number: 1,
    page_size: 100,
};

const CurrencyForm = () => {
    const dispatch = useDispatch();

    const methods = useForm({});

    const { watch } = methods;

    const { response: exchangeRateResponse, loading: g_loading } = useSelector((state) => state.get_all_exchange_rate);

    const { filterSchema } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(ExchangeRateAction.get_all_exchange_rate(filterSchema));
    }, [dispatch, filterSchema]);

    const agentData = exchangeRateResponse?.data?.map((item) => ({
        label: item?.agent_name,
        value: item.sending_agent_id,
    }));

    const agentValue = watch("agent_name");

    console.log("The watched value is: " + agentValue);

    return (
        <FormProvider {...methods}>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item xs={12} md={6}>
                    <FormSelect name="agent_name" label="Agent Name" options={agentData} />
                </Grid>
            </Grid>
        </FormProvider>
    );
};

export default CurrencyForm;
