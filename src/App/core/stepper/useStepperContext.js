import { useContext } from "react";
import { StepperContext } from "./StepperProvider";

export default function useStepperContext() {
    const store = useContext(StepperContext);

    if (!store) throw new Error("Missing StepperContext.Provider in the tree");

    return store;
}
