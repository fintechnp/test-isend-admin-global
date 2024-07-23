import React from "react";
import PropTypes from "prop-types";
import { ValidationError } from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FormProvider } from "react-hook-form";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import SubmitButton from "App/components/Button/SubmitButton";

import Stepper from "../stepper/Stepper";
import useStepper from "../stepper/useStepper";

function HookStepForm({ children, onSubmit, encType, stepForms, isAddMode = false, isSubmitting, ...rest }) {
    const { activeStep, isLastStep, nextStep, previousStep, isFirstStep } = useStepper(stepForms.length);

    const { getValues, setError } = rest;

    const steps = stepForms.map((s) => ({
        key: s.key,
        label: s.label,
    }));

    const handleNext = async () => {
        try {
            if (stepForms[activeStep]?.schema)
                await stepForms[activeStep].schema.validate(getValues(), { abortEarly: false });
            nextStep();
        } catch (error) {
            if (error instanceof ValidationError) {
                error.inner.forEach((e) => {
                    const path = e.path;
                    setError(path, { message: e.message });
                    console.log({ message: e.message });
                });
            }
        }
    };

    return (
        <Box
            sx={{
                border: (theme) => `1px solid ${theme.palette.stroke.base}`,
                borderRadius: "8px",
                padding: "16px",
            }}
        >
            <FormProvider {...rest}>
                <form onSubmit={rest.handleSubmit(onSubmit)} encType={encType}>
                    <Box display="flex" justifyContent="center" mb="24px">
                        <Stepper activeStep={activeStep} steps={steps} sx={{ minWidth: "600px" }} />
                    </Box>
                    {stepForms[activeStep].element
                        ? React.createElement(
                              stepForms[activeStep].element <
                                  {
                                      isAddMode,
                                  },
                          )
                        : React.cloneElement(stepForms[activeStep].component, {
                              isAddMode,
                          })}

                    <Box display="flex" justifyContent="flex-end" gap="16px" mt="16px">
                        {!isFirstStep && (
                            <Button
                                variant="secondary"
                                onClick={previousStep}
                                startIcon={<ArrowBackRoundedIcon />}
                                disabled={isSubmitting}
                            >
                                Previous
                            </Button>
                        )}
                        {isLastStep ? (
                            <SubmitButton isLoading={isSubmitting} isAddMode={isAddMode} />
                        ) : (
                            <Button
                                variant="contained"
                                onClick={handleNext}
                                endIcon={<ArrowForwardRoundedIcon />}
                                disabled={isSubmitting}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </form>
            </FormProvider>
        </Box>
    );
}

const elementOrComponentRequired = function (props, propName, componentName) {
    const element = props["element"];
    const component = props["component"];

    if (!element && !component) {
        return new Error(`One of 'element' or 'component' is required in '${componentName}'.`);
    }
    if (element && component) {
        return new Error(`Only one of 'element' or 'component' should be provided in '${componentName}', not both.`);
    }
    return null;
};

HookStepForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    encType: PropTypes.oneOf(["multipart/form-data", "application/x-www-form-urlencoded", "text/plain"]),
    children: PropTypes.node,
    stepForms: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            label: PropTypes.node.isRequired,
            element: elementOrComponentRequired,
            component: elementOrComponentRequired,
            schema: PropTypes.any,
        }),
    ).isRequired,
    isAddMode: PropTypes.bool.isRequired,
};

export default HookStepForm;
