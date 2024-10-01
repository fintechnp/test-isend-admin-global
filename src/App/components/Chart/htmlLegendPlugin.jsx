import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import ReactDOM from "react-dom";

const LegendCheckBox = ({ checked, label, color, name }) => {
    return <FormControlLabel control={<Checkbox checked={checked} name={name} />} label={label} />;
};

const getOrCreateLegendList = (chart, id) => {
    const legendContainer = document.getElementById(id);
    if (!legendContainer) return null;

    let listContainer = legendContainer.querySelector("ul");

    if (!listContainer) {
        listContainer = document.createElement("ul");
        listContainer.style.display = "flex";
        listContainer.style.flexDirection = "row";
        listContainer.style.margin = "0";
        listContainer.style.padding = "0";

        legendContainer.appendChild(listContainer);
    }

    return listContainer;
};

const HtmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        if (!ul) return;

        // Remove old legend items
        while (ul.firstChild) {
            ul.firstChild.remove();
        }

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item) => {
            const li = document.createElement("li");
            li.style.alignItems = "center";
            li.style.cursor = "pointer";
            li.style.display = "flex";
            li.style.flexDirection = "row";
            li.style.marginLeft = "10px";

            li.onclick = () => {
                chart.setDatasetVisibility(item.datasetIndex, !chart.isDatasetVisible(item.datasetIndex));
                chart.update();
            };

            ReactDOM.render(
                <LegendCheckBox checked={!item.hidden} label={item.text} color={item.fillStyle} name={item.id} />,
                li,
            );
            ul.appendChild(li);
        });
    },
};

export default HtmlLegendPlugin;
