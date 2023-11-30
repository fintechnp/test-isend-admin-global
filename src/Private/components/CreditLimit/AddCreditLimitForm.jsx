import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import routePaths from "Private/config/routePaths";
import FormRadio from "App/core/hook-form/FormRadio";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import { relatedToEnum } from "../BusinessCharge/BusinessChargeForm";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";

import apiEndpoints from "Private/config/apiEndpoints";
import { MarketMakerActions } from "Private/pages/MarketMaker/store";

const relatedToOptions = [
    {
        label: "Business",
        value: "business",
    },
    {
        label: "Agent",
        value: "marketMaker",
    },
];

export default function AddCreditLimitForm({ isAddMode = true }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { watch, setValue } = useFormContext();

    const relatedTo = watch("relatedTo");
    const relatedIdName = watch("relatedName");

    const { loading, success } = useSelector((state) => state.add_credit_limit);
    const { loading: updating, success: updateSuccess } = useSelector((state) => state.update_credit_limit_data);

    useEffect(() => {
        if (success || updateSuccess) {
            navigate(routePaths.agent.creditLimit);
        }
    }, [success, updateSuccess]);

    useEffect(() => {
        dispatch(MarketMakerActions.get_all_market_maker());
    }, []);

    useEffect(() => {
        if (!isAddMode) return;
        setValue("relatedId", null);
    }, [relatedTo]);

    return (
        <Grid xs={12} container spacing={2}>
            <Grid item xs={12}>
                <FormRadio name="relatedTo" label="Choose" options={relatedToOptions ?? []} disabled={!isAddMode} />
            </Grid>

            <Grid item xs={12} md={6}>
                <FormTextField name="creditLimit" label="Credit Limit" type="number" />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormTextField name="remarks" label="Remarks" />
            </Grid>
            <Grid item xs={12} md={6}>
                <Box
                    sx={{
                        display: relatedTo === relatedToEnum.business ? "block" : "none",
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
                            isSelfRegistered: true,
                        }}
                        defaultValue={relatedTo === relatedToEnum.business ? relatedIdName : null}
                        isAddMode={isAddMode}
                    />
                </Box>
                <Box
                    sx={{
                        display: relatedTo === "marketMaker" ? "block" : "none",
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
                        isAddMode={isAddMode}
                        defaultValue={relatedTo === "marketMaker" ? relatedIdName : null}
                    />
                </Box>
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
                            navigate(-1);
                        }}
                    >
                        Cancel
                    </CancelButton>
                </Grid>
                <Grid item>
                    <AddButton size="small" variant="outlined" type="submit" loading={loading || updating}>
                        {isAddMode ? "Add" : "Update"}
                    </AddButton>
                </Grid>
            </Grid>
        </Grid>
    );
}
