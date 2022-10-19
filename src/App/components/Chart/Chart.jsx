import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
// import HtmlLegendPlugin from "./htmlLegendPlugin";

const Chart = ({ customLegend, plugins, type, ...props }) => {
    const renderChart = () => {
        switch (type) {
            case "line":
                return (
                    <Line
                        {...props}
                        type={type}
                        // plugins={customLegend ? [HtmlLegendPlugin] : plugins}
                        plugins={plugins}
                    />
                );

            case "bar":
                return (
                    <Bar
                        {...props}
                        type={type}
                        // plugins={customLegend ? [HtmlLegendPlugin] : plugins}
                        plugins={plugins}
                    />
                );

            case "pie":
                return (
                    <Pie
                        {...props}
                        type={type}
                        // plugins={customLegend ? [HtmlLegendPlugin] : plugins}
                        plugins={plugins}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <>
            {/* {customLegend && <div id={LEGEND_CONTAINER_ID}></div>} */}
            <div>{renderChart()}</div>
        </>
    );
};

export default Chart;
