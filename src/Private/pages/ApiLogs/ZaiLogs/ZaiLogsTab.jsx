import React from "react";
import Box from "@mui/material/Box";

import Tabs from "App/components/Tab/Tabs";

import ListZaiWebhookLogs from "./ListZaiWebhookLogs";
import ListZaiRefundPaymentLogs from "./ListZaiRefundPaymentLogs";

const ZaiLogsTab = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <Tabs
                tabs={[
                    {
                        key: "Zai Webhook Logs",
                        tabName: "Zai Webhook Logs",
                        tabContent: <ListZaiWebhookLogs />,
                    },
                    {
                        key: "Zai Refund Logs",
                        tabName: "Zai refund Logs",
                        tabContent: <ListZaiRefundPaymentLogs />,
                    },
                ]}
            ></Tabs>
        </Box>
    );
};

export default ZaiLogsTab;
