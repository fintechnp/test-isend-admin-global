import * as yup from "yup";

export const approveBusinessStakeholderSchema = yup.object().shape({
    status: yup.number().required("Status is required"),
    remarks: yup.string().required("Remarks is required"),
});
