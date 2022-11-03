import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

import Chart, {
    stackedBarChartDefaultOption,
} from "./../../../App/components/Chart";
import NumberCard from "./components/NumberCard";
import TopCountry from "./components/TopCountry";

const Container = styled(Grid)(({ theme }) => ({
    width: "100%",
    display: "flex",
    paddingTop: "8px",
    justifyContent: "center",
    flexDirection: "column",
}));

const NumberContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
}));

const RowContainer = styled(Grid)(({ theme }) => ({
    display: "flex",
}));

const ChartWrapper = styled(Box)(({ theme }) => ({
    flexGrow: 1,
    borderRadius: "6px",
    padding: theme.spacing(1),
    border: "1px solid gray",
}));

const lineOptions = {
    ...stackedBarChartDefaultOption,
    barThickness: 24,
    title: {
        display: true,
        text: "Chart.js Bar Chart",
    },
};

const pieChartOptions = {
    plugins: {
        legend: {
            display: false,
        },
    },
};

function Dashboard(props) {
    const [today_data, setTodayData] = useState({
        labels: ["gg", "gf", "hjgfgku"],
        datasets: [
            {
                data: [3, 3, 3],
                backgroundColor: ["#F8B06D", "#887CAA", "#88C4D8"],
                borderWidth: 0,
            },
        ],
    });
    const [line_data, setLineData] = useState({
        labels: ["dsf", "dfs", "dsfas", "jan", "faeb"],
        datasets: [
            {
                label: "df",
                data: [44, 33, 33, 77, 44],
                backgroundColor: "#F8B06D",
            },
            {
                label: "dfsdf",
                data: [43, 55, 67, 35, 83],
                backgroundColor: "#8C7EB5",
            },
        ],
    });

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <Container container rowSpacing={2}>
                <Grid item xs={12}>
                    <NumberContainer container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <NumberCard topic="Last Year" number="300" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <NumberCard topic="Last Month" number="120" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <NumberCard topic="Today" number="12" />
                        </Grid>
                    </NumberContainer>
                </Grid>
                <Grid item xs={12}>
                    <RowContainer container columnSpacing={2}>
                        <Grid item xs={12} md={8} sx={{ display: "flex" }}>
                            <ChartWrapper>
                                <Chart
                                    customLegend={true}
                                    type="bar"
                                    data={line_data}
                                    options={lineOptions}
                                />
                            </ChartWrapper>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: "flex" }}>
                            <ChartWrapper>
                                <Chart
                                    type="pie"
                                    customLegend
                                    data={today_data}
                                    options={pieChartOptions}
                                    width={50}
                                    height={50}
                                />
                            </ChartWrapper>
                        </Grid>
                    </RowContainer>
                </Grid>
                <Grid item xs={12}>
                    <NumberContainer container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TopCountry name="Top Countries" number="120" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TopCountry name="Top Customer" number="120" />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TopCountry name="Top Countries" number="120" />
                        </Grid>
                    </NumberContainer>
                </Grid>
            </Container>
        </>
    );
}

export default Dashboard;
