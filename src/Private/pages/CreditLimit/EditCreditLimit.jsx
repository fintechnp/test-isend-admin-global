import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import PageContent from "App/components/Container/PageContent";
import AddCreditLimitForm from "Private/components/CreditLimit/AddCreditLimitForm";

import { creditLimitActions } from "Private/pages/CreditLimit/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "App/components";

const AddCreditLimitFormValidation = yup.object().shape({
    relatedTo: yup.string().required("Related To is required"),
    creditLimit: yup.string().required("Credit Limit is required"),
    remarks: yup.string().required("Remarks is required"),
    relatedId: yup.string().required("Related Id is required"),
});

export default function EditCreditLimit() {
    const dispatch = useDispatch();
    const { creditLimitId } = useParams();

    const methods = useForm({
        resolver: yupResolver(AddCreditLimitFormValidation),
    });
    const { handleSubmit, setValue } = methods;

    const { response: creditLimitDetail, loading } = useSelector((state) => state.get_credit_limit_details);

    useEffect(() => {
        dispatch(creditLimitActions.get_credit_limit_details(creditLimitId));
    }, []);

    useEffect(() => {
        setValue("relatedTo", creditLimitDetail?.data?.relatedTo);
        setValue("creditLimit", creditLimitDetail?.data?.creditLimit);
        setValue("remarks", creditLimitDetail?.data?.remarks);
        setValue("relatedId", creditLimitDetail?.data?.relatedId);
    }, []);

    const onSubmitData = (data) => {
        const { creditLimit, remarks } = data;
        dispatch(creditLimitActions.update_credit_limit_data(creditLimitId, { creditLimit, remarks }));
    };

    return (
        <PageContent title="Edit Credit Limit">
            <HookForm onSubmit={handleSubmit(onSubmitData)} {...methods}>
                {loading ? <Loading loading={loading} /> : <AddCreditLimitForm isAddMode={false} />}
            </HookForm>
        </PageContent>
    );
}
