import { createContext } from "react";
import useStepper from "./useStepper";

// Create the context with a default value of null
export const StepperContext = createContext(null);

// Extract the provider from the context
const StepperProvider = StepperContext.Provider;

export default StepperProvider;
