import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";

import ListCampaignReport from "./ListCampaignReport";
import ListCampaignReportDetails from "./ListCampaignReportDetails";
import ListCampaignIncentiveReport from "./IncentiveReport/ListCampaignIncentiveReport";

export default function ListCampaignReportTab() {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Campaign Report" value="1" />
                        <Tab label="Campaign report Details" value="2" />
                        <Tab label="Campaign Incentive Report" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ListCampaignReport />
                </TabPanel>
                <TabPanel value="2">
                    <ListCampaignReportDetails />
                </TabPanel>
                <TabPanel value="3">
                    <ListCampaignIncentiveReport />
                </TabPanel>
            </TabContext>
        </Box>
    );
}
