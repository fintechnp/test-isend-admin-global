import { localStorageGet } from "App/helpers/localStorage";

export default function useReferenceData() {
    const reference = localStorageGet("reference");

    const getReferenceData = (referenceTypeId) => {
        return reference?.filter((ref_data) => ref_data.reference_type === referenceTypeId)[0] ?? [];
    };

    const getReferenceDataAsOptions = (
        referenceTypeId,
        options = {
            labelKey: "name",
            valueKey: "value",
        },
    ) => {
        const { labelKey = "name", valueKey = "value" } = options;

        const referenceData = reference?.filter((ref_data) => ref_data.reference_type === referenceTypeId)[0] ?? [];

        return (
            referenceData?.reference_data?.map((data) => {
                return { label: data[labelKey], value: data[valueKey] };
            }) ?? []
        );
    };

    return { getReferenceData, getReferenceDataAsOptions };
}
