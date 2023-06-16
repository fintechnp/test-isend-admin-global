import { useState, memo, useEffect } from "react";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MuiTabs from "@mui/material/Tabs";
import styled from "@mui/material/styles/styled";
import { alpha, Typography } from "@mui/material";

import Spacer from "../Spacer/Spacer";
import useQueryParams from "App/hooks/useQueryParams";

const MuiStyledTabs = styled(MuiTabs)(({ theme }) => ({
    "& .Mui-selected": {
        backgroundColor: alpha(theme.palette.primary.main, 0.05),
    },
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
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

function Tabs({ tabs }) {
    const [activeTab, setActiveTab] = useState(0);

    const [query, updateQuery] = useQueryParams();

    const handleChange = (e, newValue) => {
        e.preventDefault();
        setActiveTab(newValue);
        updateQuery({ tab: tabs[newValue]?.key });
    };

    const queryTab = query?.tab;

    useEffect(() => {
        if (tabs?.length <= 0) return;
        let activeTabIndex = tabs?.findIndex((v) => v.key === queryTab);
        if (activeTabIndex < 0) {
            activeTabIndex = 0;
        }
        setActiveTab(activeTabIndex);
        updateQuery({ tab: tabs[activeTabIndex]?.key });
    }, [queryTab]);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                {activeTab !== undefined && (
                    <MuiStyledTabs value={activeTab} onChange={handleChange} aria-label="tabs">
                        {tabs.map((tab, i) => (
                            <Tab
                                key={i}
                                label={
                                    <Box display="flex" alignContent="center" justifyContent="center">
                                        <Typography sx={{ textTransform: "capitalize" }}>{tab.tabName}</Typography>
                                        {activeTab === i && tab.activeTabHeaderContent}
                                    </Box>
                                }
                                {...a11yProps(i)}
                            />
                        ))}
                    </MuiStyledTabs>
                )}
            </Box>
            <Spacer />
            {tabs.map((tab, i) => (
                <TabPanel key={i} value={activeTab} index={i}>
                    {tab.tabContent}
                </TabPanel>
            ))}
        </Box>
    );
}

export default memo(Tabs);

Tabs.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            tabName: PropTypes.string.isRequired,
            activeTabHeaderContent: PropTypes.node,
            tabContent: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
        }).isRequired,
    ),
};
