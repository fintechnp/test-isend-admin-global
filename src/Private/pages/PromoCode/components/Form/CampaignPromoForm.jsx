import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";
import React, { useCallback, useEffect } from "react";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import FormSelectCountry from "App/core/hook-form/FormSelectCountry";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

import {
    triggerAttributeTypes,
    triggerAttributeTypesOptions,
    triggerAttributeTypesOptionsCount,
    triggerAttributeTypesOptionsDisabled,
} from "../../data/triggerAttributeTypesEnums";
import referenceTypeId from "Private/config/referenceTypeId";
import { campaignEventTypes } from "../../data/campaignEventTypesEnums";

export default function CampaignPromoForm({
    triggerFields,
    mappedAttributeList,
    countryCurrency,
    allAttributeList,
    addTriggerFields,
    removeTriggerFields,
}) {
    const { watch, setValue, control } = useFormContext();

    const attributeConditions = watch("AttributeConditions");

    useEffect(() => {
        triggerFields.forEach((_, index) => {
            const attributeFamily = attributeConditions?.[index]?.attribute;
            const attributeFamilyTypeId = allAttributeList?.find(
                (item) => item?.attributeFamilyId === attributeFamily,
            )?.attributeTypeValue;

            if (!attributeFamilyTypeId) {
                return;
            }

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

            const currentCriteria = attributeConditions?.[index]?.criteria;

            if (currentCriteria !== criteria) {
                setValue(`AttributeConditions.${index}.criteria`, criteria);
            }
        });
    }, [attributeConditions, allAttributeList, triggerFields, setValue]);

    const handleTrigger = useCallback(
        (field) => {
            addTriggerFields({
                attribute: field.attribute,
                criteria: field.criteria,
                currency: field.currency,
                amount: field.amount,
            });
        },
        [addTriggerFields],
    );

    return (
        <Grid container>
            {triggerFields.map((field, index) => {
                const attributeFamily = attributeConditions?.[index]?.attribute;
                const attributeFamilyTypeId = allAttributeList?.find(
                    (item) => item?.attributeFamilyId === attributeFamily,
                )?.attributeTypeValue;

                const amountLabel = attributeFamilyTypeId === campaignEventTypes.AMOUNT ? "Amount" : "Count";

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

                const watchCountry = watch(`AttributeConditions.${index}.amount`);

                useEffect(() => {
                    if (attributeFamilyTypeId) {
                        if (attributeFamilyTypeId === campaignEventTypes.BIRTH_DATE) {
                            setValue(`AttributeConditions.${index}.criteria`, triggerAttributeTypes.ON_SAME_DAY);
                        } else if (attributeFamilyTypeId === campaignEventTypes.DATE_RANGE) {
                            setValue(`AttributeConditions.${index}.criteria`, triggerAttributeTypes.BETWEEN);
                        } else if (attributeFamilyTypeId === campaignEventTypes.AMOUNT) {
                            setValue(
                                `AttributeConditions.${index}.criteria`,
                                triggerAttributeTypesOptionsDisabled[0]?.value,
                            );
                            setValue(`AttributeConditions.${index}.amount`, 0);
                            setValue(`AttributeConditions.${index}.currency`, countryCurrency[0]?.value);
                        } else if (attributeFamilyTypeId === campaignEventTypes.COUNT) {
                            setValue(
                                `AttributeConditions.${index}.criteria`,
                                triggerAttributeTypesOptionsDisabled[0].value,
                            );
                            setValue(`AttributeConditions.${index}.amount`, 0);
                        } else if (attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY) {
                            setValue(`AttributeConditions.${index}.criteria`, triggerAttributeTypes.EQUALS_TO);
                        } else if (attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION) {
                            setValue(`AttributeConditions.${index}.criteria`, triggerAttributeTypes.EQUALS_TO);
                        }
                    }
                }, [attributeFamilyTypeId, campaignEventTypes]);

                return (
                    <Grid container mb={1} spacing={2} key={`${field.id}_field`}>
                        <Grid item xs={12} md={6} lg={3}>
                            <FormSelect
                                placeholder="Attribute"
                                name={`AttributeConditions.${index}.attribute`}
                                options={mappedAttributeList}
                                control={control}
                            />
                        </Grid>

                        {attributeFamilyTypeId && (
                            <>
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
                                            control={control}
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
                                            control={control}
                                        />
                                    </Grid>
                                )}

                                {(attributeFamilyTypeId === campaignEventTypes.AMOUNT ||
                                    attributeFamilyTypeId === campaignEventTypes.COUNT) && (
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormTextField
                                            label={amountLabel}
                                            type="number"
                                            name={`AttributeConditions.${index}.amount`}
                                            control={control}
                                        />
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
                                            control={control}
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
                                            control={control}
                                        />
                                    </Grid>
                                )}
                            </>
                        )}

                        <Grid item xs={12}>
                            <ButtonWrapper>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={() =>
                                        handleTrigger(
                                            {
                                                attribute: field.attribute,
                                                criteria: field.criteria,
                                                currency: field.currency,
                                                amount: field.amount,
                                            },
                                            index,
                                        )
                                    }
                                >
                                    Add
                                </Button>

                                {index > 0 ? (
                                    <Button
                                        onClick={() => removeTriggerFields(index)}
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                    >
                                        Remove
                                    </Button>
                                ) : (
                                    <Button variant="outlined" size="small" color="error" disabled>
                                        Remove
                                    </Button>
                                )}
                            </ButtonWrapper>
                        </Grid>
                    </Grid>
                );
            })}
        </Grid>
    );
}
