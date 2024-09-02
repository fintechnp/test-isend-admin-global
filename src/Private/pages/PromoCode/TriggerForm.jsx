import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm, useFormContext } from "react-hook-form";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";

import { campaignEventTypes } from "./data/campaignEventTypesEnums";

import {
    triggerAttributeTypes,
    triggerAttributeTypesOptions,
    triggerAttributeTypesOptionsDisabled,
    triggerAttributeTypesOptionsCount,
} from "./data/triggerAttributeTypesEnums";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";
import referenceTypeId from "Private/config/referenceTypeId";

export default function TriggerForm({ index, mappedAttributeList, countryCurrency, allAttributeList }) {
    const { watch, setValue } = useFormContext();

    const { methods } = useForm();

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
            case campaignEventTypes.BENEFICIARY_COUNTRY:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.EQUALS_TO);
                break;
            case campaignEventTypes.BENEFICIARY_RELATION:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.EQUALS_TO);
                break;
            default:
                setValue(`trigger.${index}.criteria`, triggerAttributeTypes.GREATER_THAN);
        }
    }, [attributeFamilyTypeId]);

    const triggerFormOptions = (() => {
        switch (true) {
            case attributeFamilyTypeId === campaignEventTypes.BIRTH_DATE:
            case attributeFamilyTypeId === campaignEventTypes.DATE_RANGE:
            case attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY:
            case attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION:
                return triggerAttributeTypesOptions;
            case attributeFamilyTypeId === campaignEventTypes.COUNT:
                return triggerAttributeTypesOptionsCount;
            default:
                return triggerAttributeTypesOptionsDisabled;
        }
    })();

    return (
        <Grid container mb={1} spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
                <FormSelect placeholder="Attribute" name={`trigger.${index}.attribute`} options={mappedAttributeList} />
            </Grid>
            <Grid
                display={
                    attributeFamilyTypeId === campaignEventTypes.BIRTH_DATE ||
                    attributeFamilyTypeId === campaignEventTypes.DATE_RANGE ||
                    attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY ||
                    attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION
                        ? "none"
                        : "block"
                }
                item
                xs={12}
                md={6}
                lg={3}
            >
                <FormSelect
                    name={`trigger.${index}.criteria`}
                    options={triggerFormOptions}
                    disabled={
                        attributeFamilyTypeId === campaignEventTypes.BIRTH_DATE ||
                        attributeFamilyTypeId === campaignEventTypes.DATE_RANGE ||
                        attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY ||
                        attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION
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

            {attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormReferenceDataAutoComplete
                        name={`trigger.${index}.amount`}
                        label="Relation"
                        labelKey="name"
                        valueKey="value"
                        referenceTypeId={referenceTypeId.relations}
                    />
                </Grid>
            )}
        </Grid>
    );
}
