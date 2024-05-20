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

import BasicForm from "./BasicForm";
import AddressForm from "./AddressForm";
import CollectionForm from "./CollectionForm";
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

const steps = ["Personal Information", "Contact Information", "Payout Information"];

function BeneficiaryForm({ update_data, loading }) {
    const { id, bene_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const {
        success: add_success,
        loading: add_loading,
        error: add_error,
    } = useSelector((state) => state.create_beneficiary);
    const {
        success: update_success,
        loading: update_loading,
        error: update_error,
    } = useSelector((state) => state.update_beneficiary);

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

    const handleSubmitForm = (bene_id) => {
        if (bene_id) {
            dispatch(actions.update_beneficiary(bene_id, data));
        } else {
            dispatch(actions.create_beneficiary(data));
        }
    };

    const handleBasicForm = (data) => {
        handleComplete();
    };

    const handleContactForm = () => {
        handleComplete();
    };

    const handleBusinessForm = (data) => {
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
                            All steps completed - Please submit to create Partner.
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
                                    color: "primary.main",
                                },
                            }}
                            onClick={() => handleSubmitForm(bene_id)}
                        >
                            Submit
                        </LoadingButton>
                    </CompletedWrapper>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {bene_id ? (
                        <Box>
                            {activeStep === 0 && (
                                <BasicForm
                                    destroyOnUnmount={false}
                                    enableReinitialize={true}
                                    shouldError={() => true}
                                    form={`update_beneficiary_form`}
                                    initialValues={
                                        memoizedData && {
                                            customer_id: id,
                                            first_name: memoizedData?.first_name,
                                            middle_name: memoizedData?.middle_name,
                                            last_name: memoizedData?.last_name,
                                            receiver_type: memoizedData?.receiver_type,
                                            title: memoizedData?.title,
                                            country: memoizedData?.country,
                                            currency: memoizedData?.currency,
                                            phone_country_code: memoizedData?.phone_country_code,
                                            mobile_number: memoizedData?.mobile_number,
                                            email: memoizedData?.email,
                                            postcode: memoizedData?.postcode,
                                            unit: memoizedData?.unit,
                                            street: memoizedData?.street,
                                            city: memoizedData?.city,
                                            state: memoizedData?.state,
                                            address: memoizedData?.address,
                                            relation: memoizedData?.relation,
                                            reason_for_remittance: memoizedData?.reason_for_remittance,
                                            source_of_income: memoizedData?.source_of_income,
                                            delivery_option_id: memoizedData?.delivery_option_id,
                                            payment_type: memoizedData?.payment_type,
                                            payout_location_id: memoizedData?.payout_location_id,
                                            account_number: memoizedData?.account_number,
                                            account_type: memoizedData?.account_type,
                                            branch_identifier_type: memoizedData?.branch_identifier_type,
                                            branch_identifier_value: memoizedData?.branch_identifier_value,
                                            is_active: memoizedData?.is_active,
                                        }
                                    }
                                    steps={steps}
                                    pcountry={memoizedData?.country}
                                    phone_code={memoizedData?.phone_country_code}
                                    buttonText="Next"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBasicForm}
                                />
                            )}
                            {activeStep === 1 && (
                                <AddressForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`update_beneficiary_form`}
                                    steps={steps}
                                    buttonText="Next"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleContactForm}
                                />
                            )}
                            {activeStep === 2 && (
                                <CollectionForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`update_beneficiary_form`}
                                    steps={steps}
                                    update={true}
                                    buttonText="Update"
                                    pcountry={memoizedData?.country}
                                    payment_type={memoizedData?.payment_type}
                                    delivery_option_id={memoizedData?.delivery_option_id}
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBusinessForm}
                                />
                            )}
                        </Box>
                    ) : (
                        <Box>
                            {activeStep === 0 && (
                                <BasicForm
                                    enableReinitialize
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    initialValues={{ customer_id: id }}
                                    form={`add_beneficiary_form`}
                                    steps={steps}
                                    buttonText="Next"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBasicForm}
                                />
                            )}
                            {activeStep === 1 && (
                                <AddressForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`add_beneficiary_form`}
                                    steps={steps}
                                    buttonText="Next"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleContactForm}
                                />
                            )}
                            {activeStep === 2 && (
                                <CollectionForm
                                    destroyOnUnmount={false}
                                    shouldError={() => true}
                                    form={`add_beneficiary_form`}
                                    steps={steps}
                                    buttonText="Finish"
                                    activeStep={activeStep}
                                    handleBack={handleBack}
                                    onSubmit={handleBusinessForm}
                                />
                            )}
                        </Box>
                    )}
                </React.Fragment>
            )}
        </Box>
    );
}

export default BeneficiaryForm;
