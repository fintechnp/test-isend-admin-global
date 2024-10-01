import React from "react";
import "chart.js/auto";
import { Bar, Line, Pie } from "react-chartjs-2";
import HtmlLegendPlugin from "./htmlLegendPlugin";

const Chart = ({ customLegend, plugins, type, ...props }) => {
    const renderChart = () => {
        switch (type) {
            case "line":
                return <Line {...props} type={type} plugins={customLegend ? [HtmlLegendPlugin] : plugins} />;

            case "bar":
                return (
                    <Bar
                        style={{ flex: 1 }}
                        {...props}
                        type={type}
                        plugins={customLegend ? [HtmlLegendPlugin] : plugins}
                    />
                );

            case "pie":
                return <Pie {...props} type={type} plugins={customLegend ? [HtmlLegendPlugin] : plugins} />;
            default:
                return null;
        }
    };

    return (
        <>
            {customLegend && <div id="legend-container"></div>}
            <div style={{ display: "flex" }}>{renderChart()}</div>
        </>
    );
};

export default Chart;
