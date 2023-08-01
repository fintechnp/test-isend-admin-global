import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import AddCreditLimitForm from "Private/components/CreditLimit/AddCreditLimitForm";

import { creditLimitActions } from "Private/pages/CreditLimit/store";

export default function AddCreditLimit({ title }) {
    const dispatch = useDispatch();
    const methods = useForm({
        // resolver: yupResolver(),
    });

    const { handleSubmit } = methods;

    const onSubmitData = (data) => {
        dispatch(creditLimitActions.add_credit_limit(data));

        // methods.reset();
    };
    return (
        <PageContent title={title} documentTitle="Add Credit Limit">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                <AddCreditLimitForm />
            </HookForm>
        </PageContent>
    );
}
