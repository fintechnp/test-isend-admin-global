import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import routePaths from "Private/config/routePaths";
import FormRadio from "App/core/hook-form/FormRadio";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";

import { MarketMakerActions } from "Private/pages/MarketMaker/store";
import apiEndpoints from "Private/config/apiEndpoints";

const relatedToOptions = [
    {
        label: "Business",
        value: "business",
    },
    {
        label: "Market Maker",
        value: "marketMaker",
    },
];

export default function AddCreditLimitForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { watch, reset, setValue } = useFormContext();

    const relatedTo = watch("relatedTo");

    const { loading, success } = useSelector((state) => state.add_credit_limit);

    useEffect(() => {
        if (success) {
            navigate(routePaths.agent.creditLimit);
        }
    }, [success]);

    useEffect(() => {
        setValue("relatedTo", "business");
    }, []);

    useEffect(() => {
        dispatch(MarketMakerActions.get_all_market_maker());
    }, []);

    return (
        <Grid xs={12} container spacing={2}>
            <Grid item xs={12}>
                <FormRadio name="relatedTo" label="Related To" options={relatedToOptions ?? []} />
            </Grid>

            <Grid item xs={12} md={6}>
                <FormTextField name="creditLimit" label="Credit Limit" type="number" />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormTextField name="remarks" label="Remarks" />
            </Grid>
            <Grid item xs={12} md={6}>
                {(() => {
                    if (relatedTo === "business") {
                        return (
                            <Grid item xs={12} sm={6}>
                                <FormSearchAutoComplete
                                    name="relatedId"
                                    label="Business Id"
                                    apiEndpoint={apiEndpoints.business.getAll}
                                    paramkey="BusinessName"
                                    valueKey="businessId"
                                    labelKey="name"
                                />
                            </Grid>
                        );
                    } else if (relatedTo === "marketMaker") {
                        return (
                            <Grid item xs={12} sm={6}>
                                <FormSearchAutoComplete
                                    name="relatedId"
                                    label="Market Maker Id"
                                    apiEndpoint={apiEndpoints.marketMaker.getAll}
                                    paramkey="Name"
                                    valueKey="marketMakerId"
                                    labelKey="name"
                                />
                            </Grid>
                        );
                    }
                })()}
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
                    <AddButton size="small" variant="outlined" type="submit" loading={loading}>
                        Add
                    </AddButton>
                </Grid>
            </Grid>
        </Grid>
    );
}
