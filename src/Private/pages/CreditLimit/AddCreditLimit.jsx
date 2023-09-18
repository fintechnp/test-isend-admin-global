import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import AddCreditLimitForm from "Private/components/CreditLimit/AddCreditLimitForm";

import { creditLimitActions } from "Private/pages/CreditLimit/store";

const AddCreditLimitFormValidation = yup.object().shape({
    relatedTo: yup.string().required("Related To is required"),
    creditLimit: yup.string().required("Credit Limit is required"),
    remarks: yup.string().required("Remarks is required"),
    relatedId: yup.string().required("Related Id is required"),
});

export default function AddCreditLimit({ title }) {
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: yupResolver(AddCreditLimitFormValidation),
    });

    const { handleSubmit } = methods;

    const onSubmitData = (data) => {
        const { creditLimit, relatedId, ...rest } = data;

        const formattedData = {
            creditLimit: Number(creditLimit),
            relatedId: Number(relatedId),
            ...rest,
        };
        dispatch(creditLimitActions.add_credit_limit(formattedData));
    };
    return (
        <PageContent title={title} documentTitle="Add Credit Limit">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <AddCreditLimitForm />
            </HookForm>
        </PageContent>
    );
}
