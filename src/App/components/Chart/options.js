import { CUSTOM_CHART_JS_CLASS, LEGEND_CONTAINER_ID } from "../../global/constants";
import { configureTooltipPosition, createTooltipElement, toggleTooltip } from "./Tooltip";

export const stackedBarChartDefaultOption = {
    maxBarThickness: 40,
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false,
            },
        },
        y: {
            stacked: true,
            display: false,
        },
    },
    elements: {
        bar: {
            backgroundColor: "#fff",
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        htmlLegend: {
            containerID: LEGEND_CONTAINER_ID,
        },
    },
};

export const lineChartDefaultOptions = {
    elements: {
        point: {
            radius: 2,
            hitRadius: 10,
            hoverRadius: 4,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            display: false,
        },
    },
    plugins: {
        legend: {
            display: false,
        },
        htmlLegend: {
            // ID of the container to put the legend in
            containerID: LEGEND_CONTAINER_ID,
        },
        tooltip: {
            enabled: false,
            external: function (context) {
                const tooltipEl = createTooltipElement("tooltip-line");
                const tooltipModel = context.tooltip;
                toggleTooltip(tooltipModel, tooltipEl);

                // Set Tooltip Actual Content
                if (tooltipModel.body) {
                    const tooltipRoot = tooltipEl.querySelector(`.${CUSTOM_CHART_JS_CLASS}`);
                    const formattedNumber = tooltipModel.dataPoints[0].formattedValue;

                    tooltipRoot.innerHTML = `<div class="tooltip-title"><h6>${tooltipModel.dataPoints[0].dataset.label}</h6></div><div class="tooltip-body"><span class="value">${formattedNumber}</span><span class="label">for ${tooltipModel.dataPoints[0].label}, 2021</span></div>`;
                }

                configureTooltipPosition(context, tooltipEl);
            },
        },
    },
};
