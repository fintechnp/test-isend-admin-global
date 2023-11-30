import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Divider from "@mui/material/Divider";

import sendingCountries from "Private/config/sendingCountries";

function a11yProps(index) {
    return {
        id: `sending-country-tab-${index}`,
        "aria-controls": `sending-country-tabpanel-${index}`,
    };
}

export default function SendingCountryTabs({ onChange, value, isLoading }) {
    const [activeIndex, setActiveIndex] = useState();

    const handleChange = (event, newValue) => {
        setActiveIndex(newValue);
        onChange(sendingCountries[newValue].value);
    };

    useEffect(() => {
        const index = sendingCountries.findIndex((sc) => sc.value === value);
        if (index >= -1) setActiveIndex(index);
    }, [value]);

    return (
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={activeIndex} onChange={handleChange} aria-label="sending countries tabs">
                {sendingCountries.map((sc, i) => (
                    <Tab
                        key={i}
                        label={sc.label}
                        {...a11yProps(i)}
                        sx={{
                            ...(i === activeIndex
                                ? {
                                      background: (theme) => alpha(theme.palette.primary.light, 0.4),
                                      borderRadius: "8px 8px 0 0",
                                  }
                                : {}),
                        }}
                        disabled={isLoading}
                    />
                ))}
            </Tabs>
            <Divider sx={{ borderColor: (theme) => theme.palette.primary.main }} />
        </Box>
    );
}

SendingCountryTabs.propTypes = {
    isLoading: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
};
