import { localStorageGet } from "App/helpers/localStorage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

/**
 * @typedef {object} Country
 * @property {number} country_id
 * @property {number} tid
 * @property {string} country
 * @property {string} currency
 * @property {string} currency_name
 * @property {string} iso2
 * @property {string} iso3
 * @property {string} phone_code
 * @property {string|null} phone_regex
 * @property {string|null} postcode_regex
 * @property {boolean} has_state
 * @property {number} id
 * @property {string} created_ts
 * @property {string|null} created_by
 * @property {string} updated_ts
 * @property {string|null} updated_by
 */

class EmptyCountryListException extends Error {}

const useCountries = () => {
    const { response, loading: isLoading } = useSelector((state) => state.all_country);

    const countries = response?.data ?? localStorageGet("country") ?? [];

    const dispatch = useDispatch();

    /**
     * get country by id
     *
     * @param {int} countryId
     * @returns {Country|null}
     */
    const getCountryById = (countryId) => {
        return countries.find((c) => Number(c.country_id) === Number(countryId)) ?? null;
    };

    /**
     * get country by id
     *
     * @param {int} countryId
     * @returns {Country|null}
     */
    const getCountryByIso3 = (iso3) => {
        return countries.find((c) => c.iso3.toUpperCase() === countryId?.toUpperCase()) ?? null;
    };

    /**
     * get currency name
     *
     * @param {string} currency
     * @returns {Country|undefined}
     */
    const getCurrencyName = (currency) => {
        return countries.find((ct) => ct.currency.toUpperCase() === currency?.toUpperCase())?.currency_name ?? null;
    };

    useEffect(() => {
        if (countries.length <= 0) dispatch({ type: "GET_COUNTRIES" });
    }, []);

    return { countries, getCountryById, getCountryByIso3, isLoading, getCurrencyName };
};

export default useCountries;
