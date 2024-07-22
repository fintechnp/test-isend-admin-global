import * as Yup from "yup";
import { dateOfDeathRequiredForReturnReasonCode } from "../data/returnReasonCode";

export const returnRdfiTransactionSchema = Yup.object().shape({
    returnReasonCode: Yup.string().required("Required"),
    dateOfDeath: Yup.string().when("returnReasonCode", {
        is: (value) => dateOfDeathRequiredForReturnReasonCode.includes(value),
        then: (schema) => schema.required("Required"),
        otherwise: (schema) => schema.nullable(),
    }),
});
