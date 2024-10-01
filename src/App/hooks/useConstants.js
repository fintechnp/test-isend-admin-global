import { localStorageGet } from "App/helpers/localStorage";

const useConstants = () => {
    const countries = localStorageGet("country") ?? [];

    return { countries };
};

export default useConstants;
