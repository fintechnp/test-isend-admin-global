import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";

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
    isLoading,
}) {
    const { watch, setValue, control } = useFormContext();

    const attributeConditions = watch("AttributeConditions");

    const getTriggerFormOptions = (attributeFamilyTypeId) => {
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
    };

    return (
        <Grid container gap={2}>
            {triggerFields.map((field, index) => {
                const attributeFamily = attributeConditions?.[index]?.attribute;
                const attributeFamilyTypeId = allAttributeList?.find(
                    (item) => item?.attributeFamilyId === attributeFamily,
                )?.attributeTypeValue;

                const amountLabel = attributeFamilyTypeId === campaignEventTypes.AMOUNT ? "Amount" : "Count";

                const triggerFormOptions = getTriggerFormOptions(attributeFamilyTypeId);

                const isDuplicate = triggerFields?.some((existingField, existingIndex) => {
                    if (existingIndex === index) return false;
                    const existingAttributeFamily = attributeConditions?.[existingIndex]?.attribute;
                    const existingAttributeFamilyTypeId = allAttributeList?.find(
                        (item) => item?.attributeFamilyId === existingAttributeFamily,
                    )?.attributeTypeValue;

                    const isSameCondition =
                        existingAttributeFamily === attributeFamily &&
                        existingAttributeFamilyTypeId === attributeFamilyTypeId &&
                        triggerFields[existingIndex].amount === field.amount &&
                        triggerFields[existingIndex].currency === field.currency;

                    return isSameCondition;
                });

                const foundIndex = triggerFields?.findIndex((existingField, existingIndex) => {
                    return existingIndex === index;
                });

                console.log("The mapped attribute list is", mappedAttributeList);

                const LoadingOption =
                    mappedAttributeList.length > 0
                        ? "Select an option"
                        : isLoading
                          ? "Loading option....."
                          : "Select an option";

                console.log("The mapped attribute list is", mappedAttributeList);

                return (
                    <Grid container mb={1} spacing={2} key={`${field.id}_field`}>
                        <Grid item xs={10}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormSelect
                                        required
                                        label="Select an Options"
                                        showChooseOption={true}
                                        chooseOptionLabel={LoadingOption}
                                        name={`AttributeConditions.${index}.attribute`}
                                        options={mappedAttributeList}
                                        disabledOptions={[1]}
                                        onChange={(e) => {
                                            const attributeFamilyTypeId = allAttributeList?.find(
                                                (item) => item?.attributeFamilyId === e.target.value,
                                            )?.attributeTypeValue;

                                            if (attributeFamilyTypeId === campaignEventTypes.BIRTH_DATE) {
                                                setValue(
                                                    `AttributeConditions.${index}.criteria`,
                                                    triggerAttributeTypes.ON_SAME_DAY,
                                                );
                                                setValue(
                                                    `AttributeConditions.${index}.attributeTypeValue`,
                                                    attributeFamilyTypeId,
                                                );
                                            } else if (attributeFamilyTypeId === campaignEventTypes.DATE_RANGE) {
                                                setValue(
                                                    `AttributeConditions.${index}.criteria`,
                                                    triggerAttributeTypes.EQUALS_TO,
                                                );
                                                setValue(
                                                    `AttributeConditions.${index}.attributeTypeValue`,
                                                    attributeFamilyTypeId,
                                                );
                                            } else if (attributeFamilyTypeId === campaignEventTypes.AMOUNT) {
                                                setValue(
                                                    `AttributeConditions.${index}.criteria`,
                                                    triggerAttributeTypesOptionsDisabled[0]?.value,
                                                );
                                                setValue(`AttributeConditions.${index}.amount`, 0);
                                                setValue(
                                                    `AttributeConditions.${index}.currency`,
                                                    countryCurrency[0]?.value,
                                                );
                                                setValue(
                                                    `AttributeConditions.${index}.attributeTypeValue`,
                                                    attributeFamilyTypeId,
                                                );
                                            } else if (attributeFamilyTypeId === campaignEventTypes.COUNT) {
                                                setValue(
                                                    `AttributeConditions.${index}.criteria`,
                                                    triggerAttributeTypesOptionsDisabled[0].value,
                                                );
                                                setValue(`AttributeConditions.${index}.amount`, 0);
                                                setValue(`AttributeConditions.${index}.currency`, null);
                                                setValue(
                                                    `AttributeConditions.${index}.attributeTypeValue`,
                                                    attributeFamilyTypeId,
                                                );
                                            } else if (
                                                attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_COUNTRY
                                            ) {
                                                setValue(
                                                    `AttributeConditions.${index}.criteria`,
                                                    triggerAttributeTypes.EQUALS_TO,
                                                );
                                                setValue(
                                                    `AttributeConditions.${index}.attributeTypeValue`,
                                                    attributeFamilyTypeId,
                                                );
                                            } else if (
                                                attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION
                                            ) {
                                                setValue(
                                                    `AttributeConditions.${index}.criteria`,
                                                    triggerAttributeTypes.EQUALS_TO,
                                                );
                                                setValue(
                                                    `AttributeConditions.${index}.attributeTypeValue`,
                                                    attributeFamilyTypeId,
                                                );
                                            }
                                        }}
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
                                                />
                                            </Grid>
                                        )}

                                        {attributeFamilyTypeId === campaignEventTypes.AMOUNT && (
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormSelect
                                                    required
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
                                                <FormTextField
                                                    required
                                                    label={amountLabel}
                                                    type="number"
                                                    name={`AttributeConditions.${index}.amount`}
                                                />
                                            </Grid>
                                        )}

                                        {attributeFamilyTypeId === campaignEventTypes.BENEFICIARY_RELATION && (
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormReferenceDataAutoComplete
                                                    name={`AttributeConditions.${index}.amount`}
                                                    label="Relation"
                                                    required={true}
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
                                    </>
                                )}
                            </Grid>
                        </Grid>
                        <Grid item xs={2} display="flex" alignItems="center" justifyContent="flex-end">
                            <ButtonWrapper>
                                {triggerFields?.length - 1 === index && !isDuplicate && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            addTriggerFields();
                                        }}
                                    >
                                        Add
                                    </Button>
                                )}

                                {isDuplicate && (
                                    <Button variant="contained" size="small" color="secondary" disabled>
                                        Duplicate Trigger
                                    </Button>
                                )}

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
