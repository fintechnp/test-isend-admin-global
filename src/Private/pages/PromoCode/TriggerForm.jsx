import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";

import { campaignEventTypes } from "./data/campaignEventTypesEnums";

import {
    triggerAttributeTypes,
    triggerAttributeTypesOptions,
    triggerAttributeTypesOptionsDisabled,
} from "./data/triggerAttributeTypesEnums";

export default function TriggerForm({ index, mappedAttributeList, countryCurrency, allAttributeList }) {
    const { watch, setValue } = useFormContext();

    const attributeFamily = watch(`trigger.${index}.attribute`);

    const attributeFamilyTypeId = allAttributeList?.find(
        (item) => item?.attributeFamilyId === attributeFamily,
    )?.attributeTypeValue;

    const amountLabel = attributeFamilyTypeId === campaignEventTypes.AMOUNT ? "Amount" : "Count";

    useEffect(() => {
        switch (attributeFamilyTypeId) {
            case campaignEventTypes.DATE:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.ON_SAME_DAY);
                break;
            case campaignEventTypes.DATE_RANGE:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.BETWEEN);
                break;
            case campaignEventTypes.AMOUNT:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.GREATER_THAN);
                break;
            case campaignEventTypes.COUNT:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.GREATER_THAN);
                break;
            case campaignEventTypes.COUNTRY:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.EQUALS_TO);
                break;
            default:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.GREATER_THAN);
        }
    }, [attributeFamilyTypeId]);

    const triggerFormOptions = (() => {
        switch (true) {
            case attributeFamilyTypeId === campaignEventTypes.DATE:
            case attributeFamilyTypeId === campaignEventTypes.DATE_RANGE:
            case attributeFamilyTypeId === campaignEventTypes.COUNTRY:
                return triggerAttributeTypesOptions;
            default:
                return triggerAttributeTypesOptionsDisabled;
        }
    })();

    return (
        <Grid container mb={1} spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
                <FormSelect placeholder="Attribute" name={`trigger.${index}.attribute`} options={mappedAttributeList} />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
                <FormSelect
                    name={`trigger.${index}.criteria`}
                    options={triggerFormOptions}
                    disabled={
                        attributeFamilyTypeId === campaignEventTypes.DATE ||
                        attributeFamilyTypeId === campaignEventTypes.DATE_RANGE ||
                        attributeFamilyTypeId === campaignEventTypes.COUNTRY
                    }
                />
            </Grid>
            {attributeFamilyTypeId === campaignEventTypes.AMOUNT && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormSelect
                        label="Currency"
                        placeholder="Currency"
                        options={countryCurrency}
                        name={`trigger.${index}.currency`}
                    />
                </Grid>
            )}
            {(attributeFamilyTypeId === campaignEventTypes.AMOUNT ||
                attributeFamilyTypeId === campaignEventTypes.COUNT) && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormTextField label={amountLabel} type="number" name={`trigger.${index}.amount`} />
                </Grid>
            )}
        </Grid>
    );
}
