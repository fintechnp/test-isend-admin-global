import { format } from "date-fns";
import NumberFormat from "react-number-format";
import ucwords from "./ucwords";

export const CountryName = (iso3) => {
    const country = JSON.parse(localStorage.getItem("country"));
    if (iso3 && country) {
        const countryData = country?.filter((ct) => ct.iso3 === iso3);
        if (countryData.length >= 0) {
            return countryData[0]?.country;
        } else {
            return "N/A";
        }
    } else {
        return "N/A";
    }
};
export const CountryNameById = (id) => {
    const country = JSON.parse(localStorage.getItem("country"));
    if (id && country) {
        const countryData = country?.filter((ct) => ct.country_id === id);
        if (countryData.length >= 0) {
            return countryData[0]?.country;
        } else {
            return "N/A";
        }
    } else {
        return "N/A";
    }
};

export const CountryNameByIso2Code = (iso2) => {
    const country = JSON.parse(localStorage.getItem("country"));
    if (iso2 && country) {
        const countryData = country?.filter((ct) => ct.iso2?.toUpperCase() === iso2?.toUpperCase());
        if (countryData.length >= 0) {
            return ucwords(countryData[0]?.country);
        }
    }
    return iso2;
};

export const CurrencyName = (currency) => {
    const country = JSON.parse(localStorage.getItem("country"));
    if (currency && country) {
        const countryData = country?.filter((ct) => ct.currency === currency);
        if (countryData.length >= 0) {
            return countryData[0]?.currency_name;
        } else {
            return "N/A";
        }
    } else {
        return "N/A";
    }
};

export const ReferenceName = (id, value) => {
    const reference = JSON.parse(localStorage.getItem("reference"));
    if (!value) {
        return "N/A";
    }
    if (id) {
        const ref = reference?.find((ct) => ct.reference_type === id);
        if (ref) {
            const referenceValue = ref?.reference_data.find((data) => {
                if (value) {
                    return data.value === value || data.value === value.toUpperCase();
                }
            });
            return referenceValue?.name;
        } else {
            return "N/A";
        }
    } else {
        return "N/A";
    }
};

export const FormatDate = (date) => {
    if (date) {
        const newDate = new Date(date);
        return format(newDate, "MMM dd, yyyy");
    } else {
        return "N/A";
    }
};

export const FormatDateTime = (date) => {
    if (date) {
        const newDate = new Date(date);
        return format(newDate, "MMM dd yyyy, h: m a");
    } else {
        return "N/A";
    }
};

export const FormatNumber = (value) => {
    if (value) {
        return <NumberFormat value={value} displayType={"text"} thousandSeparator={true} />;
    } else {
        return "N/A";
    }
};

export const Mode = (mode) => {
    if (mode) {
        switch (mode) {
            case "F":
                return "Flat";
            case "P":
                return "Percentage";
            default:
                return "N/A";
        }
    }
};
