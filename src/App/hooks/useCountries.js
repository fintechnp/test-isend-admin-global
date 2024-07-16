import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import isEmpty from "App/helpers/isEmpty";

const useCountries = () => {
    const dispatch = useDispatch();

    const { response, loading: isLoading } = useSelector((state) => state.all_country);

    const countries = response.data ?? [];

    const getCountryNameByISO3 = (iso3) => {
        if (isEmpty(iso3)) throw new Error("iso3 code is required");
        return countries.find((d) => d.iso3.toUpperCase() === iso3.toUpperCase())?.country ?? null;
    };

    const fetch = () => {
        dispatch({
            type: "GET_ALL_COUNTRY",
        });
    };

    useEffect(() => {
        if (countries.length <= 0) {
            fetch();
        }
    }, []);

    return { countries, fetch, getCountryNameByISO3, isLoading };
};

export default useCountries;
