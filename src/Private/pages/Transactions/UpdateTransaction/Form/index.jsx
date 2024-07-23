import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import CustomerForm from "./CustomerForm";
import BeneficiaryForm from "./BeneficiaryForm";
import SendAmountForm from "./SendAmountForm";
import actions from "./../../store/actions";

const CompletedWrapper = styled(Box)(({ theme }) => ({
    marginTop: "16px",
    minHeight: "140px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "32px 0px",
    backgroundColor: theme.palette.background.light,
}));

const Stepper = styled(MuiStepper)(({ theme }) => ({
    "& .MuiSvgIcon-root.MuiStepIcon-root.Mui-completed": {
        color: theme.palette.success.main,
    },
    "& .MuiStepLabel-label": {
        fontSize: "18px",
    },
    "& .MuiStepLabel-label.Mui-completed": {
        color: theme.palette.success.main,
    },
}));

const Fetching = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: "16px",
    fontWeight: 400,
}));

const steps = ["Customer Information", "Beneficiary Information", "Sending Amount"];

function TransactionForm({ update_data, loading }) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const { success: add_success, loading: add_loading, error: add_error } = useSelector((state) => state.add_partner);
    const {
        success: update_success,
        loading: update_loading,
        error: update_error,
    } = useSelector((state) => state.update_partner);
    const { response: customer_list, loading: customer_loading } = useSelector((state) => state.get_customers);
    const { response: sending_partner, loading: sending_loading } = useSelector((state) => state.get_sending_partner);
    const { response: payout_partner, loading: payout_loading } = useSelector((state) => state.get_payout_partner);

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (update_error || add_error) {
            setActiveStep(0);
            let keys = Object.keys(completed);
            delete completed[keys[keys.length - 1]];
        }
    }, [update_error, add_error]);

    React.useEffect(() => {
        if (add_success || update_success) {
            navigate(-1);
            setCompleted({});
        }
    }, [add_success, update_success]);

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted() ? steps.findIndex((step, i) => !(i in completed)) : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleSubmitForm = (id) => {
        if (id) {
            dispatch(actions.update_partner(id, data));
        } else {
            dispatch(actions.add_partner(data));
        }
    };

    const handleCustomerForm = (data) => {
        handleComplete();
    };

    const handleBeneficiaryForm = () => {
        handleComplete();
    };

    const handleAmountForm = (data) => {
        setData(data);
        handleComplete();
    };

    if (loading) {
        return (
            <Box sx={{ width: "100%", pt: "16px" }}>
                <Stepper nonLinear activeStep={activeStep} alternativeLabel sx={{ width: "100%", padding: "16px 0px" }}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepLabel color="inherit">{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
                    <Fetching>Fetching...</Fetching>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ width: "100%", pt: "16px" }}>
            <Stepper nonLinear activeStep={activeStep} alternativeLabel sx={{ width: "100%", padding: "16px 0px" }}>
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepLabel color="inherit">{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {allStepsCompleted() ? (
                <React.Fragment>
                    <CompletedWrapper sx={{}}>
                        <Typography
                            sx={{
                                mt: 2,
                                mb: 1,
                                color: "border.dark",
                                fontSize: "18px",
                            }}
                        >
                            All steps completed - Please submit to create Customer.
                        </Typography>
                        <CheckCircleOutlineIcon sx={{ fontSize: "64px", color: "success.main" }} />
                        <LoadingButton
                            size="small"
                            variant="outlined"
                            loading={add_loading || update_loading}
                            sx={{
                                mt: 2,
                                borderWidth: "2px",
                                minWidth: "120px",
                                "&:hover": {
                                    borderWidth: "2px",
                                },
                                "& .MuiCircularProgress-root": {
                                    color: "primary.contrastText",
                                },
                            }}
                            onClick={() => handleSubmitForm(id)}
                        >
                            Submit
                        </LoadingButton>
                    </CompletedWrapper>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {id ? (
                        <Box>
                            {activeStep === 0 && (
                                <CustomerForm
                                    destroyOnUnmount={false}
                                    // enableReinitialize={true}
                                    shouldError={() => true}
                                    form={`update_transaction_form`}
                                    initialValues={
                                        memoizedData && {
                                            name: memoizedData?.name,
                                            short_code: memoizedData?.short_code,
                                            agent_type: memoizedData?.agent_type,
                                            phone_number: memoizedData?.phone_number,
                                            email: memoizedData?.email,
                                            country: memoizedData?.country,
                                            postcode: memoizedData?.postcode,
                                            unit: memoizedData?.unit,
                                            street: memoizedData?.street,
                                            city: memoizedData?.city,
                                            state: memoizedData?.state,
                                            address: memoizedData?.address,
                                            website: memoizedData?.website,
                                            contact_person_full_name: memoizedData?.contact_person_full_name,
                                            contact_person_post: memoizedData?.contact_person_post,
                                            contact_person_mobile: memoizedData?.contact_person_mobile,
                                            contact_person_email: memoizedData?.contact_person_email,
                                            business_license_number: memoizedData?.business_license_number,
                                            balance: memoizedData?.balance,
                                            credit_limit: memoizedData?.credit_limit,
                                            transaction_currency: memoizedData?.transaction_currency,
                                            settlement_currency: memoizedData?.settlement_currency,
                                            tax_type: memoizedData?.tax_type,
                                            time_zone: memoizedData?.time_zone,
                                            transaction_limit: memoizedData?.transaction_limit,
                                            commission_currency: memoizedData?.commission_currency,
                                            bank_charge_currency: memoizedData?.bank_charge_currency,
                                            is_prefunding: memoizedData?.is_prefunding,
                                        }
                                    }
                                    steps={steps}
                                    buttonText="Next"
                                    customer_list={customer_list?.data}
                                    sending_partner={sending_partner?.data}
                                    payout_partner={payout_partner?.data}
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleCustomerForm}
                                />
                            )}
                            {activeStep === 1 && (
                                <BeneficiaryForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`update_transaction_form`}
                                    steps={steps}
                                    buttonText="Update"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBeneficiaryForm}
                                />
                            )}
                            {activeStep === 2 && (
                                <SendAmountForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`update_transaction_form`}
                                    steps={steps}
                                    buttonText="Update All"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleAmountForm}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box>
                            {activeStep === 0 && (
                                <CustomerForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`create_transaction_form`}
                                    steps={steps}
                                    buttonText="Next"
                                    customer_list={customer_list?.data}
                                    sending_partner={sending_partner?.data}
                                    payout_partner={payout_partner?.data}
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleCustomerForm}
                                />
                            )}
                            {activeStep === 1 && (
                                <BeneficiaryForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`create_transaction_form`}
                                    steps={steps}
                                    buttonText="Next"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBeneficiaryForm}
                                />
                            )}
                            {activeStep === 2 && (
                                <SendAmountForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`create_transaction_form`}
                                    steps={steps}
                                    buttonText="Finish"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleAmountForm}
                                />
                            )}
                        </Box>
                    )}
                </React.Fragment>
            )}
        </Box>
    );
}

export default TransactionForm;
