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
 * @property {null} phone_regex
 * @property {null} postcode_regex
 * @property {boolean} has_state
 * @property {number} id
 * @property {string} created_ts
 * @property {null} created_by
 * @property {string} updated_ts
 * @property {null} updated_by
 */

/**
 * @typedef {object} UseCountriesReturn
 * @property {Country[]} countries
 * @property {(countryId: number) => Country|null} getCountryById,
 * @property {(iso3: string) => Country|null} getCountryByIso3
 * @property {boolean} isLoading,
 * @property {(currency: string) => Country|null} getCurrencyName
*/

/**
 * @returns {UseCountriesReturn}
*/
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