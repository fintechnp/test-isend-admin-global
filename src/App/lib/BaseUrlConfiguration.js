import app from "App/config/app";
import Cookies from "js-cookie";
import AuthUtility from "App/utils/AuthUtility";
import sendingCountries from "Private/config/sendingCountries";

const SELECTED_COUNTRY_KEY = "iSendRemit.166e95bafdc0bb30c1daea3a47afc91b.csk";

export default class BaseUrlConfiguration {
    static saveCountry(countryISO3Code) {
        Cookies.set(SELECTED_COUNTRY_KEY, countryISO3Code);
        localStorage.setItem(SELECTED_COUNTRY_KEY, countryISO3Code);
    }

    static removeCountry() {
        Cookies.remove(SELECTED_COUNTRY_KEY);
    }

    static getDefaultSendingCountryIso3() {
        try {
            const selectedCountry = Cookies.get(SELECTED_COUNTRY_KEY);
            const country = sendingCountries.find((c) => c.value.toUpperCase() === selectedCountry);
            if (!country) throw new Error("Country not found");
            return country.value;
        } catch (e) {
            return sendingCountries[0].value;
        }
    }

    static getApiBaseUrl() {
        try {
            const selectedCountry = Cookies.get(SELECTED_COUNTRY_KEY);
            const country = sendingCountries.find((c) => c.value.toUpperCase() === selectedCountry);
            if (!country) throw new Error("Country not found");
            return app.apiBaseUrl.replace("{country}", selectedCountry?.toLowerCase() || "");
        } catch (e) {
            AuthUtility.logOut();
            window.location.href = "/login";
            return "";
        }
    }
}
