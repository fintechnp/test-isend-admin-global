import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { change, Field, Form, reduxForm } from "redux-form";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import Basic from "./Basic";

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

const steps = ["Basic Information", "Contact Details", "Business Information"];

function PartnerForm() {
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
                ? // It's the last step, but not all steps have been completed,
                  // find the first step that has been completed
                  steps.findIndex((step, i) => !(i in completed))
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

    return (
        <Box sx={{ width: "100%", pt: "8px" }}>
            <Stepper
                nonLinear
                activeStep={activeStep}
                alternativeLabel
                sx={{ width: "100%", pb: 1 }}
            >
                {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                        <StepLabel color="inherit">{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
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
                                onClick={handleReset}
                                sx={{ mt: 2, textTransform: "capitalize" }}
                            >
                                Submit
                            </Button>
                        </CompletedWrapper>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Box>
                            <Basic />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                pt: 2,
                            }}
                        >
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleNext} sx={{ mr: 1 }}>
                                Next
                            </Button>
                            {activeStep !== steps.length &&
                                (completed[activeStep] ? (
                                    <Typography
                                        variant="caption"
                                        sx={{ display: "inline-block" }}
                                    >
                                        Step {activeStep + 1} already completed
                                    </Typography>
                                ) : (
                                    <Button onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1
                                            ? "Finish"
                                            : "Complete Step"}
                                    </Button>
                                ))}
                        </Box>
                    </React.Fragment>
                )}
            </div>
        </Box>
    );
}

export default reduxForm({ form: ["form"] })(PartnerForm);
