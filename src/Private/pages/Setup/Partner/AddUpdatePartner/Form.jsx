import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Basic from "./Basic";
import Contact from "./Contact";
import Business from "./Business";
import actions from "./../store/actions";

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
}));

const steps = [
    "Basic Information",
    "Contact Person Details",
    "Business Information",
];

function PartnerForm({ update_data }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = React.useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_partner
    );

    React.useEffect(() => {
        if (add_success) {
            navigate(-1);
        }
    }, [add_success]);

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
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        // setActiveStep(0);
        // setCompleted({});
        dispatch(actions.add_partner(data));
    };

    const handleBasicForm = () => {
        handleComplete();
    };

    const handleContactForm = () => {
        handleComplete();
    };

    const handleBusinessForm = (data) => {
        setData(data);
        handleComplete();
    };

    return (
        <Box sx={{ width: "100%", pt: "16px" }}>
            <Stepper
                nonLinear
                activeStep={activeStep}
                alternativeLabel
                sx={{ width: "100%", padding: "16px 0px" }}
            >
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
                            All steps completed - Please submit to create
                            Partner.
                        </Typography>
                        <CheckCircleOutlineIcon
                            sx={{ fontSize: "64px", color: "success.main" }}
                        />
                        <LoadingButton
                            size="small"
                            variant="outlined"
                            loading={add_loading}
                            sx={{
                                mt: 2,
                                borderWidth: "2px",
                                minWidth: "120px",
                                "&:hover": {
                                    borderWidth: "2px",
                                },
                            }}
                            onClick={handleReset}
                        >
                            Submit
                        </LoadingButton>
                    </CompletedWrapper>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Box>
                        {activeStep === 0 && (
                            <Basic
                                destroyOnUnmount={false}
                                form={`add_partner_form`}
                                steps={steps}
                                buttonText="Complete"
                                completed={completed}
                                activeStep={activeStep}
                                handleNext={handleNext}
                                handleBack={handleBack}
                                totalSteps={totalSteps}
                                handleComplete={handleComplete}
                                completedSteps={completedSteps}
                                allStepsCompleted={allStepsCompleted}
                                onSubmit={handleBasicForm}
                            />
                        )}
                        {activeStep === 1 && (
                            <Contact
                                destroyOnUnmount={false}
                                form={`add_partner_form`}
                                steps={steps}
                                completed={completed}
                                buttonText="Complete"
                                activeStep={activeStep}
                                handleNext={handleNext}
                                handleBack={handleBack}
                                totalSteps={totalSteps}
                                handleComplete={handleComplete}
                                completedSteps={completedSteps}
                                allStepsCompleted={allStepsCompleted}
                                onSubmit={handleContactForm}
                            />
                        )}
                        {activeStep === 2 && (
                            <Business
                                destroyOnUnmount={false}
                                form={`add_partner_form`}
                                completed={completed}
                                steps={steps}
                                buttonText="Complete"
                                activeStep={activeStep}
                                handleNext={handleNext}
                                handleBack={handleBack}
                                totalSteps={totalSteps}
                                handleComplete={handleComplete}
                                completedSteps={completedSteps}
                                allStepsCompleted={allStepsCompleted}
                                onSubmit={handleBusinessForm}
                            />
                        )}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default PartnerForm;
