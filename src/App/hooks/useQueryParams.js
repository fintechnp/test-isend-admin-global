import { useEffect, useState } from "react";

import isEmpty from "app/helpers/isEmpty";
import { useSearchParams, createSearchParams } from "react-router-dom";

/**
 * mapping the query params to the state
 * or
 * mapping the state to the query params
 */
const useQueryParams = (ignoreKeys) => {
    const [searchParams, setSearchParams] = useSearchParams();

    if (
        ignoreKeys !== undefined &&
        ignoreKeys !== null &&
        (!Array.isArray(ignoreKeys) || typeof ignoreKeys === "string")
    )
        throw new Error(`${ignoreKeys} must be a string or an array`);

    const getQueryParams = () => {
        let queryParams = {};
        for (const [key, value] of searchParams.entries()) {
            queryParams[key] = value;
        }
        return queryParams;
    };

    const [queryParams, setQueryParams] = useState(getQueryParams());

    const updateQuery = (updatedParams) => {
        let updatedQueryParams = {};

        const toBeIgnoredKeys =
            typeof ignoreKeys === "string" ? [ignoreKeys] : typeof ignoreKeys === "object" ? [...ignoreKeys] : [];

        // remove blank attributes & ignored from object
        Object.keys(updatedParams).map((k) => {
            if (!isEmpty(updatedParams[k]) && !toBeIgnoredKeys.includes(k)) {
                updatedQueryParams = {
                    ...updatedQueryParams,
                    [k]: decodeURIComponent(updatedParams[k]),
                };
            }
        });

        setSearchParams(createSearchParams(updatedQueryParams));
    };

    useEffect(() => {
        setQueryParams(getQueryParams());
    }, []);

    return [queryParams, updateQuery];
};

export default useQueryParams;
