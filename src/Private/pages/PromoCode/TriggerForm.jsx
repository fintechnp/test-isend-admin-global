import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";

import {
    triggerAttributeTypes,
    triggerAttributeTypesOptions,
    triggerAttributeTypesOptionsCount,
    triggerAttributeTypesOptionsDisabled,
} from "./data/triggerAttributeTypesEnums";
import referenceTypeId from "Private/config/referenceTypeId";
import { campaignEventTypes } from "./data/campaignEventTypesEnums";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

export default function TriggerForm({ index, mappedAttributeList, countryCurrency, allAttributeList }) {
    const { watch, setValue } = useFormContext();

    const attributeFamily = watch(`AttributeConditions.${index}.attribute`);

    const attributeFamilyTypeId = allAttributeList?.find(
        (item) => item?.attributeFamilyId === attributeFamily,
    )?.attributeTypeValue;

    const amountLabel = attributeFamilyTypeId === campaignEventTypes.AMOUNT ? "Amount" : "Count";

    useEffect(() => {
        let criteria = triggerAttributeTypes.GREATER_THAN;

        switch (attributeFamilyTypeId) {
            case campaignEventTypes.BIRTH_DATE:
                criteria = triggerAttributeTypes.ON_SAME_DAY;
                break;
            case campaignEventTypes.DATE_RANGE:
                criteria = triggerAttributeTypes.BETWEEN;
                break;
            case campaignEventTypes.AMOUNT:
            case campaignEventTypes.COUNT:
                criteria = triggerAttributeTypes.GREATER_THAN;
                break;
            case campaignEventTypes.BENEFICIARY_COUNTRY:
            case campaignEventTypes.BENEFICIARY_RELATION:
                criteria = triggerAttributeTypes.EQUALS_TO;
                break;
            default:
                criteria = triggerAttributeTypes.GREATER_THAN;
        }

        const currentCriteria = watch(`AttributeConditions.${index}.criteria`);
        if (currentCriteria !== criteria) {
            setValue(`AttributeConditions.${index}.criteria`, criteria);
        }
    }, [attributeFamilyTypeId, index, setValue, watch]);

    const triggerFormOptions = (() => {
        switch (attributeFamilyTypeId) {
            case campaignEventTypes.BIRTH_DATE:
            case campaignEventTypes.DATE_RANGE:
            case campaignEventTypes.BENEFICIARY_COUNTRY:
            case campaignEventTypes.BENEFICIARY_RELATION:
                return triggerAttributeTypesOptions;
            case campaignEventTypes.COUNT:
                return triggerAttributeTypesOptionsCount;
            default:
                return triggerAttributeTypesOptionsDisabled;
        }
    })();

    return (
        <Grid container mb={1} spacing={2}>
            <Grid item xs={12} md={6} lg={3}>
                <FormSelect
                    placeholder="Attribute"
                    name={`AttributeConditions.${index}.attribute`}
                    options={mappedAttributeList}
                />
            </Grid>

            {!(
                attributeFamilyTypeId === campaignEventTypes.BIRTH_DATE ||
                attributeFamilyTypeId === campaignEventTypes.DATE_RANGE ||
                attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY ||
                attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION
            ) && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormSelect
                        name={`AttributeConditions.${index}.criteria`}
                        options={triggerFormOptions}
                        disabled={
                            attributeFamilyTypeId === campaignEventTypes.BIRTH_DATE ||
                            attributeFamilyTypeId === campaignEventTypes.DATE_RANGE ||
                            attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY ||
                            attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION
                        }
                    />
                </Grid>
            )}

            {attributeFamilyTypeId === campaignEventTypes.AMOUNT && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormSelect
                        label="Currency"
                        placeholder="Currency"
                        options={countryCurrency}
                        name={`AttributeConditions.${index}.currency`}
                    />
                </Grid>
            )}

            {(attributeFamilyTypeId === campaignEventTypes.AMOUNT ||
                attributeFamilyTypeId === campaignEventTypes.COUNT) && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormTextField label={amountLabel} type="number" name={`AttributeConditions.${index}.amount`} />
                </Grid>
            )}

            {attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormReferenceDataAutoComplete
                        name={`AttributeConditions.${index}.amount`}
                        label="Relation"
                        labelKey="name"
                        valueKey="reference_id"
                        referenceTypeId={referenceTypeId.relations}
                    />
                </Grid>
            )}

            {attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY && (
                <Grid item xs={12} md={6} lg={3}>
                    <FormSelectCountry
                        name={`AttributeConditions.${index}.amount`}
                        labelKey="country"
                        valueKey="country_id"
                        helperText="Country"
                    />
                </Grid>
            )}
        </Grid>
    );
}
