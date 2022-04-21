import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiStepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { change, Field, Form, reduxForm } from "redux-form";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Basic from "./Basic";
import Contact from "./Contact";
import Business from "./Business";

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
}));

const steps = [
    "Basic Information",
    "Contact Person Details",
    "Business Information",
];

function PartnerForm({ handleSubmit }) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});

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
        setActiveStep(0);
        setCompleted({});
    };

    const handleBasicForm = () => {
        handleComplete();
    };

    const handleContactForm = () => {
        handleComplete();
    };

    const handleBusinessForm = () => {
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
            <Form onSubmit={handleSubmit}>
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
                            <Button
                                size="small"
                                variant="outlined"
                                // onClick={handleReset}
                                sx={{
                                    mt: 2,
                                    textTransform: "capitalize",
                                    minWidth: "120px",
                                }}
                                type="submit"
                            >
                                Submit
                            </Button>
                        </CompletedWrapper>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box>
                            {activeStep === 0 && (
                                <Basic
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
            </Form>
        </Box>
    );
}

export default reduxForm({ form: ["form"] })(PartnerForm);
