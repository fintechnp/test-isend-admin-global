import * as Yup from "yup";

export const documentAcceptanceSchema = Yup.object().shape({
    country: Yup.string().required("Country Name is required"),
    document_for: Yup.string().required("Document For is required"),
    document_type: Yup.string().required("Document Type is required"),
    status: Yup.string().required("Status is required"),
    is_required: Yup.boolean(),
});
