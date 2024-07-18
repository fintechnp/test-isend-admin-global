import { useEffect, useState } from "react";

export default function useStepper(totalSteps) {
    const [activeStep, setActiveStep] = useState(0);

    const [isFirstStep, setIsFirstStep] = useState(true);

    const [isLastStep, setIsLastStep] = useState(false);

    const nextStep = () => {
        if (activeStep < totalSteps) setActiveStep(activeStep + 1);
    };

    const previousStep = () => {
        if (activeStep <= totalSteps) setActiveStep(activeStep - 1);
    };

    const gotoLastStep = () => {
        setActiveStep(activeStep + 1);
    };

    const gotoFirstStep = () => {
        setActiveStep(totalSteps - 1);
    };

    const changeStep = (value) => {
        if (value < totalSteps - 1) setActiveStep(value);
        else throw new Error("Value is out of range to total steps");
    };

    useEffect(() => {
        if (activeStep === 0) {
            setIsFirstStep(true);
            setIsLastStep(false);
        } else if (activeStep === totalSteps - 1) {
            setIsFirstStep(false);
            setIsLastStep(true);
        } else {
            setIsFirstStep(false);
            setIsLastStep(false);
        }
    }, [activeStep, totalSteps]);

    return {
        activeStep,
        isFirstStep,
        isLastStep,
        changeStep,
        nextStep,
        previousStep,
        gotoFirstStep,
        gotoLastStep,
    };
}
