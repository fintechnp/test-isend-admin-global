import * as Yup from "yup";
import isEmpty from "lodash/isEmpty";
import { isAfter } from "date-fns";

/**
 * Formats a field name to a more readable format.
 * @param {string} fieldName - The field name to format.
 * @returns {string} The formatted field name.
 */
const formatFieldName = (fieldName) => {
    return fieldName
        .replace(/[_-]/g, " ") // Replace special characters with space
        .replace(/([A-Z])/g, " $1") // Add space before uppercase letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
};

/**
 * Generates a reusable validation schema for multiple date field pairs.
 * @param {Array<{fromField: string, toField: string}>} fieldPairs - Array of field name pairs for validation.
 * @returns {Yup.ObjectSchema} The Yup validation schema.
 */
const createMultiDateValidationSchema = (fieldPairs) => {
    const shape = fieldPairs.reduce((acc, { fromField, toField, fromFieldLabel, toFieldLabel }) => {
        const fromLabel = fromFieldLabel || formatFieldName(fromField);
        const toLabel = toFieldLabel || formatFieldName(toField);

        acc[fromField] = Yup.string()
            .nullable()
            .test({
                name: "from-to-pair",
                message: `${fromLabel} is required`,
                test: function (value) {
                    const { [toField]: toDate } = this.parent;
                    return !toDate || !!value;
                },
            });
        acc[toField] = Yup.string()
            .nullable()
            .test({
                name: "from-to-pair",
                message: `${toLabel} is required`,
                test: function (value) {
                    const { [fromField]: fromDate } = this.parent;
                    return !fromDate || !!value;
                },
            })
            .when(fromField, {
                is: (fromDate) => !isEmpty(fromDate),
                then: () =>
                    Yup.string()
                        .required(`${toLabel} is required`)
                        .test("is-after", `${toLabel} must be after ${fromLabel}`, (toDate, context) =>
                            isAfter(new Date(toDate), new Date(context.parent[fromField])),
                        ),
            });
        return acc;
    }, {});

    return Yup.object().shape(shape);
};

export default createMultiDateValidationSchema;
