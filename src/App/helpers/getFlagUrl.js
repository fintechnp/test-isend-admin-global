import isEmpty from "./isEmpty";
/**
 * get flag url from iso2 country code
 *
 * @param {string} countryIso2Code
 * @returns {string|null}
 */
const getFlagUrl = (countryIso2Code) => {
    if (isEmpty(countryIso2Code)) return null;
    return `http://purecatamphetamine.github.io/country-flag-icons/3x2/${countryIso2Code}.svg`;
};

export default getFlagUrl;
