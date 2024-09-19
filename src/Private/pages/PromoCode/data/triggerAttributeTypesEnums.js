export const triggerAttributeTypes = {
    ON_SAME_DAY: 0,
    GREATER_THAN: 1,
    GREATER_THAN_EQUAL_TO: 2,
    LESS_THAN_EQUAL_TO: 3,
    LESS_THAN: 4,
    BETWEEN: 5,
    EQUALS_TO: 6,
};

export const triggerAttributeDisabled = {
    GREATER_THAN: 1,
    GREATER_THAN_EQUAL_TO: 2,
    LESS_THAN_EQUAL_TO: 3,
    LESS_THAN: 4,
    BETWEEN: 5,
    EQUALS_TO: 6,
};

export const triggerAttributeTypesOptions = [
    { label: "On Same Day", value: triggerAttributeTypes.ON_SAME_DAY },
    { label: "Greater Than", value: triggerAttributeTypes.GREATER_THAN },
    { label: "Greater Than Equal To", value: triggerAttributeTypes.GREATER_THAN_EQUAL_TO },
    { label: "Less Than Equal To", value: triggerAttributeTypes.LESS_THAN_EQUAL_TO },
    { label: "Less Than", value: triggerAttributeTypes.LESS_THAN },
    { label: "Between", value: triggerAttributeTypes.BETWEEN },
    { label: "Equals To", value: triggerAttributeTypes.EQUALS_TO },
];

export const triggerAttributeTypesOptionsDisabled = [
    { label: "Greater Than", value: triggerAttributeTypes.GREATER_THAN },
    { label: "Greater Than Equal To", value: triggerAttributeTypes.GREATER_THAN_EQUAL_TO },
    { label: "Less Than Equal To", value: triggerAttributeTypes.LESS_THAN_EQUAL_TO },
    { label: "Less Than", value: triggerAttributeTypes.LESS_THAN },
    { label: "Between", value: triggerAttributeTypes.BETWEEN },
];

export const triggerAttributeTypesOptionsCount = [
    { label: "Greater Than", value: triggerAttributeTypes.GREATER_THAN },
    { label: "Greater Than Equal To", value: triggerAttributeTypes.GREATER_THAN_EQUAL_TO },
    { label: "Less Than Equal To", value: triggerAttributeTypes.LESS_THAN_EQUAL_TO },
    { label: "Less Than", value: triggerAttributeTypes.LESS_THAN },
];
