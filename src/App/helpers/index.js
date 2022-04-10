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
    if (id) {
        const ref = reference.find((ct) => ct.reference_type === id);
        if (ref) {
            const referenceValue = ref?.reference_data.find(
                (data) => data.value === value
            );
            return referenceValue?.name;
        } else {
            return "N/A";
        }
    } else {
        return "N/A";
    }
};
