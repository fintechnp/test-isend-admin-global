import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function BusinessTab({ tabsData }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="tabs">
                    {tabsData?.map((tabData) => (
                        <Tab
                            key={tabData.id}
                            label={tabData.label}
                            sx={{
                                fontSize: 16,

                                fontFamily: "'Roboto', sans-serif",
                            }}
                            {...a11yProps(tabData.id)}
                        />
                    ))}
                </Tabs>
            </Box>
            {tabsData?.map((item) => {
                return (
                    <CustomTabPanel key={item.id} value={value} index={item.id}>
                        {item.element}
                    </CustomTabPanel>
                );
            })}
        </Box>
    );
}
